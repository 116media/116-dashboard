import type { FormInstance } from "antd";
import { Form } from "antd";
import { useEffect, useState } from "react";
import type { IShortVideoEntity } from "@/modules/shorts/domain/entities/IShortVideoEntity";
import type { IUpdateShortCredentials } from "@/modules/shorts/presentation/model/IUpdateShortCredentials";
import { getShortByIdAction } from "@/modules/shorts/presentation/store/getshortbyid.action";
import {
    resetUpdateShortAction,
    updateShortAction
} from "@/modules/shorts/presentation/store/updateshort.action";
import {
    resetUploadShortVideoAction,
    uploadShortVideoAction
} from "@/modules/shorts/presentation/store/uploadshortvideo.action";
import { ShortsNotification } from "@/modules/shorts/presentation/utils/notification/shorts.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

const { useForm } = Form;

/**
 * Return type for the update short hook.
 *
 * @interface IUseUpdateShort
 */
interface IUseUpdateShort {
    form: FormInstance<IUpdateShortCredentials>;
    loading: boolean;
    detailLoading: boolean;
    uploadingVideo: boolean;
    error: Failure | null | undefined;
    success: string | null;
    videoUrl: string | null | undefined;
    onVideoUpload: (file: File) => Promise<void>;
    onSubmit: () => Promise<void>;
    resetUpdate: () => void;
}

/**
 * Custom hook for the update short video form logic.
 *
 * @description
 * Fetches the short detail to prefill the form and manages the JSON metadata update
 * (title, videoId). The video file is replaced via a dedicated, decoupled upload handler
 * (`onVideoUpload`) — mirroring how the article cover image is uploaded separately from the
 * content update — never bundled into the metadata submission.
 *
 * @param short - The short video entity to edit
 * @param onSuccess - Optional callback invoked after successful update
 * @returns Form instance, loading/error state, current video URL, and handlers
 */
export const useUpdateShort = (
    short: IShortVideoEntity | null,
    onSuccess?: () => void
): IUseUpdateShort => {
    const dispatch = useAppDispatch();
    const [form] = useForm<IUpdateShortCredentials>();
    const [success, setSuccess] = useState<string | null>(null);
    const [detailLoading, setDetailLoading] = useState(false);
    const [videoUrl, setVideoUrl] = useState<string | null | undefined>(undefined);

    const { loading, error } = useAppSelector(({ shorts: { updateShort } }) => updateShort);
    const { loading: uploadingVideo, error: uploadError } = useAppSelector(
        ({ shorts: { uploadShortVideo } }) => uploadShortVideo
    );

    useEffect(() => {
        if (!short?.id) return;

        const fetchDetail = async () => {
            setDetailLoading(true);
            const result = await dispatch(getShortByIdAction(short.id));
            if (getShortByIdAction.fulfilled.match(result)) {
                const detail = result.payload as IShortVideoEntity;
                form.setFieldsValue({
                    title: detail.title,
                    videoId: detail.videoId ?? undefined
                });
                setVideoUrl(detail.videoUrl);
            }
            setDetailLoading(false);
        };

        fetchDetail();
    }, [short, dispatch, form]);

    const onSubmit = async (): Promise<void> => {
        if (!short) return;

        const values = await form.validateFields();
        const result = await dispatch(
            updateShortAction({
                id: short.id,
                data: {
                    title: values.title,
                    videoId: values.videoId
                }
            })
        );

        if (updateShortAction.fulfilled.match(result)) {
            setSuccess(ShortsNotification.updateSuccess.description);
            showNotification(ShortsNotification.updateSuccess);
            onSuccess?.();
        }
    };

    const onVideoUpload = async (file: File): Promise<void> => {
        if (!short) return;

        const result = await dispatch(uploadShortVideoAction({ id: short.id, data: { file } }));

        if (uploadShortVideoAction.fulfilled.match(result)) {
            showNotification(ShortsNotification.uploadVideoSuccess);
            setVideoUrl(result.payload.videoUrl);
            onSuccess?.();
        } else if (uploadShortVideoAction.rejected.match(result) && result.payload) {
            showNotification({
                type: "error",
                title: result.payload.title,
                description: result.payload.detail
            });
        }
    };

    const resetUpdate = () => {
        setSuccess(null);
        setVideoUrl(undefined);
        form.resetFields();
        dispatch(resetUpdateShortAction());
        dispatch(resetUploadShortVideoAction());
    };

    return {
        form,
        loading,
        detailLoading,
        uploadingVideo,
        error: error ?? uploadError,
        success,
        videoUrl,
        onVideoUpload,
        onSubmit,
        resetUpdate
    };
};
