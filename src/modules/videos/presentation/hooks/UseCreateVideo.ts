import type { FormInstance } from "antd";
import { Form } from "antd";
import { useState } from "react";
import type { ICreateVideoCredentials } from "@/modules/videos/presentation/model/ICreateVideoCredentials";
import { createVideoAction } from "@/modules/videos/presentation/store/createvideo.action";
import { VideosNotification } from "@/modules/videos/presentation/utils/notification/videos.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";
import { generateSlug } from "@/shared/presentation/utils/slug/slug.utils";

const { useForm } = Form;

/**
 * Return type for the create video hook.
 *
 * @interface IUseCreateVideo
 */
interface IUseCreateVideo {
    form: FormInstance<ICreateVideoCredentials>;
    loading: boolean;
    error: Failure | null | undefined;
    success: string | null;
    onSubmit: (values: ICreateVideoCredentials) => Promise<void>;
    resetCreate: () => void;
}

/**
 * Custom hook for the create video form logic.
 *
 * @description
 * Manages form state, submission, and success feedback for
 * creating a new video. On success, sets a success message
 * and shows a toast notification.
 *
 * @param onSuccess - Optional callback invoked after successful creation
 * @returns Form instance, loading/error state, success message, and submit handler
 */
export const useCreateVideo = (onSuccess?: () => void): IUseCreateVideo => {
    const dispatch = useAppDispatch();
    const [form] = useForm<ICreateVideoCredentials>();
    const [success, setSuccess] = useState<string | null>(null);

    const { loading, error } = useAppSelector(({ videos: { createVideo } }) => createVideo);

    const onSubmit = async (values: ICreateVideoCredentials): Promise<void> => {
        const result = await dispatch(
            createVideoAction({
                categoryId: values.categoryId,
                title: values.title,
                slug: generateSlug(values.title, { unique: true }),
                description: values.description,
                customerId: values.customerId,
                orderItemId: values.orderItemId,
                shootingScheduledAt: values.shootingScheduledAt
            })
        );

        if (createVideoAction.fulfilled.match(result)) {
            setSuccess(VideosNotification.createSuccess.description);
            showNotification(VideosNotification.createSuccess);
            form.resetFields();
            onSuccess?.();
        }
    };

    const resetCreate = () => {
        setSuccess(null);
    };

    return { form, loading, error, success, onSubmit, resetCreate };
};
