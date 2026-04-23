import type { AsyncThunk } from "@reduxjs/toolkit";
import type { IRejectVideoCredentials } from "@/modules/videos/presentation/model/IRejectVideoCredentials";
import { approveVideoAction } from "@/modules/videos/presentation/store/approvevideo.action";
import { archiveVideoAction } from "@/modules/videos/presentation/store/archivevideo.action";
import { deleteVideoAction } from "@/modules/videos/presentation/store/deletevideo.action";
import { publishVideoAction } from "@/modules/videos/presentation/store/publishvideo.action";
import { rejectVideoAction } from "@/modules/videos/presentation/store/rejectvideo.action";
import { submitVideoAction } from "@/modules/videos/presentation/store/submitvideo.action";
import { VideosNotification } from "@/modules/videos/presentation/utils/notification/videos.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

/**
 * Return type for the video workflow hook.
 *
 * @interface IUseVideoWorkflow
 */
interface IUseVideoWorkflow {
    loading: boolean;
    error: Failure | null | undefined;
    onSubmit: (id: string) => Promise<void>;
    onApprove: (id: string) => Promise<void>;
    onPublish: (id: string) => Promise<void>;
    onReject: (params: { id: string; data: IRejectVideoCredentials }) => Promise<boolean>;
    onArchive: (id: string) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
}

/**
 * Custom hook for video workflow actions.
 *
 * @description
 * Provides handlers for all editorial workflow transitions:
 * submit, approve, publish, reject, archive, and delete.
 * Each action dispatches the corresponding thunk and shows
 * a success or error notification.
 *
 * @param reload - Callback to refresh the videos list after a successful action
 * @returns {IUseVideoWorkflow} Loading/error state and workflow action handlers
 */
export const useVideoWorkflow = (reload: () => void): IUseVideoWorkflow => {
    const dispatch = useAppDispatch();

    const submitState = useAppSelector(({ videos: { submitVideo } }) => submitVideo);
    const approveState = useAppSelector(({ videos: { approveVideo } }) => approveVideo);
    const publishState = useAppSelector(({ videos: { publishVideo } }) => publishVideo);
    const rejectState = useAppSelector(({ videos: { rejectVideo } }) => rejectVideo);
    const archiveState = useAppSelector(({ videos: { archiveVideo } }) => archiveVideo);
    const deleteState = useAppSelector(({ videos: { deleteVideo } }) => deleteVideo);

    const loading =
        submitState.loading ||
        approveState.loading ||
        publishState.loading ||
        rejectState.loading ||
        archiveState.loading ||
        deleteState.loading;

    const error =
        submitState.error ||
        approveState.error ||
        publishState.error ||
        rejectState.error ||
        archiveState.error ||
        deleteState.error;

    const dispatchAction = async <T>(
        thunk: AsyncThunk<T, string, { rejectValue: Failure }>,
        id: string,
        notification: typeof VideosNotification.submitSuccess
    ) => {
        const result = await dispatch(thunk(id));

        if (thunk.fulfilled.match(result)) {
            showNotification(notification);
            reload();
        } else if (thunk.rejected.match(result) && result.payload) {
            showNotification({
                type: "error",
                title: result.payload.title,
                description: result.payload.detail
            });
        }
    };

    const onSubmit = (id: string) => {
        return dispatchAction(submitVideoAction, id, VideosNotification.submitSuccess);
    };

    const onApprove = (id: string) => {
        return dispatchAction(approveVideoAction, id, VideosNotification.approveSuccess);
    };

    const onPublish = (id: string) => {
        return dispatchAction(publishVideoAction, id, VideosNotification.publishSuccess);
    };

    const onReject = async (params: {
        id: string;
        data: IRejectVideoCredentials;
    }): Promise<boolean> => {
        const result = await dispatch(rejectVideoAction(params));

        if (rejectVideoAction.fulfilled.match(result)) {
            showNotification(VideosNotification.rejectSuccess);
            reload();
            return true;
        }

        if (rejectVideoAction.rejected.match(result) && result.payload) {
            showNotification({
                type: "error",
                title: result.payload.title,
                description: result.payload.detail
            });
        }

        return false;
    };

    const onArchive = (id: string) => {
        return dispatchAction(archiveVideoAction, id, VideosNotification.archiveSuccess);
    };

    const onDelete = (id: string) => {
        return dispatchAction(deleteVideoAction, id, VideosNotification.deleteSuccess);
    };

    return { loading, error, onSubmit, onApprove, onPublish, onReject, onArchive, onDelete };
};
