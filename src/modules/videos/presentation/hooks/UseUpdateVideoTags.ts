import { useEffect, useState } from "react";
import type { IVideoEntity } from "@/modules/videos/domain/entities/IVideoEntity";
import type { IVideoSummaryEntity } from "@/modules/videos/domain/entities/IVideoSummaryEntity";
import { getVideoByIdAction } from "@/modules/videos/presentation/store/getvideobyid.action";
import {
    resetUpdateVideoTagsAction,
    updateVideoTagsAction
} from "@/modules/videos/presentation/store/updatevideotags.action";
import { VideosNotification } from "@/modules/videos/presentation/utils/notification/videos.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

/**
 * Return type for the update video tags hook.
 *
 * @interface IUseUpdateVideoTags
 */
interface IUseUpdateVideoTags {
    tagNames: string[];
    onTagsChange: (names: string[]) => void;
    loading: boolean;
    error: Failure | null | undefined;
    success: string | null;
    onSubmit: () => Promise<void>;
    resetTags: () => void;
}

/**
 * Custom hook for managing video tag assignments.
 *
 * @description
 * Manages a local `tagNames` state array, pre-populated from
 * the video's current tags. Provides a submit handler that
 * dispatches `updateVideoTagsAction` and shows a notification
 * on success.
 *
 * @param video - The video whose tags to edit (used for pre-population and ID)
 * @param onSuccess - Optional callback invoked after successful update
 * @returns Tag IDs, change handler, loading/error state, success message, and submit handler
 */
export const useUpdateVideoTags = (
    video: IVideoSummaryEntity | null,
    onSuccess?: () => void
): IUseUpdateVideoTags => {
    const dispatch = useAppDispatch();
    const [tagNames, setTagNames] = useState<string[]>([]);
    const [success, setSuccess] = useState<string | null>(null);

    const { loading, error } = useAppSelector(({ videos: { updateVideoTags } }) => updateVideoTags);

    useEffect(() => {
        if (!video?.id) return;

        const fetchDetail = async () => {
            const result = await dispatch(getVideoByIdAction(video.id));
            if (getVideoByIdAction.fulfilled.match(result)) {
                const detail = result.payload as IVideoEntity;
                setTagNames((detail.tags ?? []).map((t) => t.name));
            }
        };

        fetchDetail();
    }, [video, dispatch]);

    const onTagsChange = (names: string[]) => {
        setTagNames(names);
    };

    const onSubmit = async (): Promise<void> => {
        if (!video) return;

        const result = await dispatch(
            updateVideoTagsAction({
                id: video.id,
                data: { tagNames }
            })
        );

        if (updateVideoTagsAction.fulfilled.match(result)) {
            setSuccess(VideosNotification.updateTagsSuccess.description);
            showNotification(VideosNotification.updateTagsSuccess);
            onSuccess?.();
        }
    };

    const resetTags = () => {
        setSuccess(null);
        dispatch(resetUpdateVideoTagsAction());
        setTagNames([]);
    };

    return { tagNames, onTagsChange, loading, error, success, onSubmit, resetTags };
};
