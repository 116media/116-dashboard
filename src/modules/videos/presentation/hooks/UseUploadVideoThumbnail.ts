import { uploadVideoThumbnailAction } from "@/modules/videos/presentation/store/uploadvideothumbnail.action";
import { VideosNotification } from "@/modules/videos/presentation/utils/notification/videos.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

/**
 * Return type for the upload video thumbnail hook.
 *
 * @interface IUseUploadVideoThumbnail
 */
interface IUseUploadVideoThumbnail {
    loading: boolean;
    error: Failure | null | undefined;
    onUpload: (id: string, file: File) => Promise<void>;
}

/**
 * Custom hook for uploading a video thumbnail.
 *
 * @description
 * Dispatches `uploadVideoThumbnailAction` with the video ID
 * and file. Shows a success or error notification after the
 * upload completes.
 *
 * @returns Loading/error state and upload handler
 */
export const useUploadVideoThumbnail = (): IUseUploadVideoThumbnail => {
    const dispatch = useAppDispatch();

    const { loading, error } = useAppSelector(
        ({ videos: { uploadVideoThumbnail } }) => uploadVideoThumbnail
    );

    const onUpload = async (id: string, file: File): Promise<void> => {
        const result = await dispatch(uploadVideoThumbnailAction({ id, data: { file } }));

        if (uploadVideoThumbnailAction.fulfilled.match(result)) {
            showNotification(VideosNotification.uploadThumbnailSuccess);
        } else if (uploadVideoThumbnailAction.rejected.match(result) && result.payload) {
            showNotification({
                type: "error",
                title: result.payload.title,
                description: result.payload.detail
            });
        }
    };

    return { loading, error, onUpload };
};
