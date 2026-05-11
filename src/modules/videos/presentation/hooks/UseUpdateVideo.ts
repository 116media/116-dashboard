import type { FormInstance } from "antd";
import { Form } from "antd";
import { useEffect, useState } from "react";
import type { IVideoEntity } from "@/modules/videos/domain/entities/IVideoEntity";
import type { IUpdateVideoCredentials } from "@/modules/videos/presentation/model/IUpdateVideoCredentials";
import { updateVideoAction } from "@/modules/videos/presentation/store/updatevideo.action";
import { VideosNotification } from "@/modules/videos/presentation/utils/notification/videos.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";
import { generateSlug } from "@/shared/presentation/utils/slug/slug.utils";

const { useForm } = Form;

/**
 * Return type for the update video hook.
 *
 * @interface IUseUpdateVideo
 */
interface IUseUpdateVideo {
    form: FormInstance<IUpdateVideoCredentials>;
    loading: boolean;
    error: Failure | null | undefined;
    success: string | null;
    onSubmit: (values: IUpdateVideoCredentials) => Promise<void>;
    resetUpdate: () => void;
}

/**
 * Custom hook for the edit video form logic.
 *
 * @description
 * Manages form state, pre-population from initial values,
 * submission, and success feedback for updating a video.
 *
 * @param video - The video to edit (used for pre-population and ID)
 * @param onSuccess - Optional callback invoked after successful update
 * @returns Form instance, loading/error state, success message, and submit handler
 */
export const useUpdateVideo = (
    video: IVideoEntity | null,
    onSuccess?: () => void
): IUseUpdateVideo => {
    const dispatch = useAppDispatch();
    const [form] = useForm<IUpdateVideoCredentials>();
    const [success, setSuccess] = useState<string | null>(null);

    const { loading, error } = useAppSelector(({ videos: { updateVideo } }) => updateVideo);

    useEffect(() => {
        if (video) {
            form.setFieldsValue({
                categoryId: video.categoryId,
                title: video.title,
                description: video.description,
                customerId: undefined,
                orderItemId: undefined,
                socialBoost: false,
                isFeatured: video.isFeatured,
                featuredUntil: video.featuredUntil,
                metaTitle: video.metaTitle,
                metaDescription: video.metaDescription
            });
        }
    }, [video, form]);

    const onSubmit = async (values: IUpdateVideoCredentials): Promise<void> => {
        if (!video) return;

        const result = await dispatch(
            updateVideoAction({
                id: video.id,
                data: {
                    ...values,
                    slug: generateSlug(values.title, { unique: true })
                }
            })
        );

        if (updateVideoAction.fulfilled.match(result)) {
            setSuccess(VideosNotification.updateSuccess.description);
            showNotification(VideosNotification.updateSuccess);
            onSuccess?.();
        }
    };

    const resetUpdate = () => {
        setSuccess(null);
        form.resetFields();
    };

    return { form, loading, error, success, onSubmit, resetUpdate };
};
