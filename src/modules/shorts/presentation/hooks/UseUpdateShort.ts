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
    error: Failure | null | undefined;
    success: string | null;
    videoFile: File | null;
    setVideoFile: (file: File | null) => void;
    onSubmit: () => Promise<void>;
    resetUpdate: () => void;
}

/**
 * Custom hook for the update short video form logic.
 *
 * @description
 * Fetches the short detail to prefill the form, manages form state,
 * optional video file replacement, submission, and success feedback.
 *
 * @param short - The short video entity to edit
 * @param onSuccess - Optional callback invoked after successful update
 * @returns Form instance, loading/error state, file state, and handlers
 */
export const useUpdateShort = (
    short: IShortVideoEntity | null,
    onSuccess?: () => void
): IUseUpdateShort => {
    const dispatch = useAppDispatch();
    const [form] = useForm<IUpdateShortCredentials>();
    const [success, setSuccess] = useState<string | null>(null);
    const [detailLoading, setDetailLoading] = useState(false);
    const [videoFile, setVideoFile] = useState<File | null>(null);

    const { loading, error } = useAppSelector(({ shorts: { updateShort } }) => updateShort);

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
                    videoId: values.videoId,
                    videoFile: videoFile ?? undefined
                }
            })
        );

        if (updateShortAction.fulfilled.match(result)) {
            setSuccess(ShortsNotification.updateSuccess.description);
            showNotification(ShortsNotification.updateSuccess);
            onSuccess?.();
        }
    };

    const resetUpdate = () => {
        setSuccess(null);
        form.resetFields();
        setVideoFile(null);
        dispatch(resetUpdateShortAction());
    };

    return {
        form,
        loading,
        detailLoading,
        error,
        success,
        videoFile,
        setVideoFile,
        onSubmit,
        resetUpdate
    };
};
