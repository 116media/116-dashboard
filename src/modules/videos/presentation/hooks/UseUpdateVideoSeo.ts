import type { FormInstance } from "antd";
import { Form } from "antd";
import { useEffect, useState } from "react";
import type { IVideoEntity } from "@/modules/videos/domain/entities/IVideoEntity";
import type { IVideoSummaryEntity } from "@/modules/videos/domain/entities/IVideoSummaryEntity";
import type { IUpdateVideoSeoCredentials } from "@/modules/videos/presentation/model/IUpdateVideoSeoCredentials";
import { getVideoByIdAction } from "@/modules/videos/presentation/store/getvideobyid.action";
import {
    resetUpdateVideoSeoAction,
    updateVideoSeoAction
} from "@/modules/videos/presentation/store/updatevideoseo.action";
import { VideosNotification } from "@/modules/videos/presentation/utils/notification/videos.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

const { useForm } = Form;

/**
 * Return type for the update video SEO hook.
 *
 * @interface IUseUpdateVideoSeo
 */
interface IUseUpdateVideoSeo {
    form: FormInstance<IUpdateVideoSeoCredentials>;
    loading: boolean;
    error: Failure | null | undefined;
    success: string | null;
    onSubmit: (values: IUpdateVideoSeoCredentials) => Promise<void>;
    resetSeo: () => void;
}

/**
 * Custom hook for the video SEO metadata form logic.
 *
 * @description
 * Manages form state, pre-population of metaTitle and metaDescription
 * from the video entity, submission, and success feedback for
 * updating a video's SEO metadata.
 *
 * @param video - The video whose SEO to edit (used for pre-population and ID)
 * @param onSuccess - Optional callback invoked after successful update
 * @returns Form instance, loading/error state, success message, and submit handler
 */
export const useUpdateVideoSeo = (
    video: IVideoSummaryEntity | null,
    onSuccess?: () => void
): IUseUpdateVideoSeo => {
    const dispatch = useAppDispatch();
    const [form] = useForm<IUpdateVideoSeoCredentials>();
    const [success, setSuccess] = useState<string | null>(null);

    const { loading, error } = useAppSelector(({ videos: { updateVideoSeo } }) => updateVideoSeo);

    useEffect(() => {
        if (!video?.id) return;

        const fetchDetail = async () => {
            const result = await dispatch(getVideoByIdAction(video.id));
            if (getVideoByIdAction.fulfilled.match(result)) {
                const detail = result.payload as IVideoEntity;
                form.setFieldsValue({
                    metaTitle: detail.metaTitle ?? "",
                    metaDescription: detail.metaDescription ?? ""
                });
            }
        };

        fetchDetail();
    }, [video, dispatch, form]);

    const onSubmit = async (values: IUpdateVideoSeoCredentials): Promise<void> => {
        if (!video) return;

        const result = await dispatch(
            updateVideoSeoAction({
                id: video.id,
                data: values
            })
        );

        if (updateVideoSeoAction.fulfilled.match(result)) {
            setSuccess(VideosNotification.updateSeoSuccess.description);
            showNotification(VideosNotification.updateSeoSuccess);
            onSuccess?.();
        }
    };

    const resetSeo = () => {
        setSuccess(null);
        form.resetFields();
        dispatch(resetUpdateVideoSeoAction());
        form.resetFields();
    };

    return { form, loading, error, success, onSubmit, resetSeo };
};
