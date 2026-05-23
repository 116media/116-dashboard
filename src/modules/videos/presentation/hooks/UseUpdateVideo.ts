import type { FormInstance } from "antd";
import { Form } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { usePaidOrderItems } from "@/modules/commerce/presentation/hooks/UsePaidOrderItems";
import type { IVideoEntity } from "@/modules/videos/domain/entities/IVideoEntity";
import type { IUpdateVideoCredentials } from "@/modules/videos/presentation/model/IUpdateVideoCredentials";
import {
    resetUpdateVideoAction,
    updateVideoAction
} from "@/modules/videos/presentation/store/updatevideo.action";
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
    orderItems: ReturnType<typeof usePaidOrderItems>;
    onSubmit: (values: IUpdateVideoCredentials) => Promise<void>;
    resetUpdate: () => void;
}

/**
 * Custom hook for the edit video form logic.
 *
 * @description
 * Manages form state, pre-population from the full video entity,
 * submission, and success feedback for updating a video.
 * When the video has a customerId, order items are fetched for
 * that customer so the orderItemId select can display the correct value.
 *
 * @param video - The full video entity to edit (used for pre-population and ID)
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
    const orderItems = usePaidOrderItems("video");

    const { loading, error } = useAppSelector(({ videos: { updateVideo } }) => updateVideo);

    useEffect(() => {
        if (!video) return;

        form.setFieldsValue({
            categoryId: video.categoryId,
            title: video.title,
            description: video.description,
            socialBoost: video.socialBoost,
            isFeatured: video.isFeatured,
            featuredUntil: video.featuredUntil ? dayjs(video.featuredUntil) : null,
            metaTitle: video.metaTitle,
            metaDescription: video.metaDescription
        });

        if (video.customerId) {
            form.setFieldValue("customerId", video.customerId);
            orderItems.fetchByCustomer(video.customerId);
        }
    }, [video, form, orderItems.fetchByCustomer]);

    useEffect(() => {
        if (!video?.orderItemId || orderItems.loading || orderItems.options.length === 0) return;
        form.setFieldValue("orderItemId", video.orderItemId);
    }, [video, orderItems.options, orderItems.loading, form]);

    const onSubmit = async (values: IUpdateVideoCredentials): Promise<void> => {
        if (!video) return;

        const { featuredUntil, ...rest } = values;
        const result = await dispatch(
            updateVideoAction({
                id: video.id,
                data: {
                    ...rest,
                    slug: generateSlug(values.title, { unique: true }),
                    featuredUntil: featuredUntil ? dayjs(featuredUntil).toISOString() : null
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
        dispatch(resetUpdateVideoAction());
        form.resetFields();
    };

    return { form, loading, error, success, orderItems, onSubmit, resetUpdate };
};
