import type { AsyncThunk } from "@reduxjs/toolkit";
import {
    deleteLyricsAction,
    resetDeleteLyricsAction
} from "@/modules/lyrics/presentation/store/deletelyrics.action";
import { LyricsNotification } from "@/modules/lyrics/presentation/utils/notification/lyrics.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

/**
 * Return type for the lyrics actions hook.
 *
 * @interface IUseLyricsActions
 */
interface IUseLyricsActions {
    loading: boolean;
    error: Failure | null | undefined;
    onDelete: (id: string) => Promise<void>;
    resetActionError: () => void;
}

/**
 * Custom hook for lyrics delete action.
 *
 * @description
 * Provides a handler for the delete action. Dispatches the
 * corresponding thunk and shows a success or error notification.
 *
 * @param reload - Callback to refresh the lyrics list after a successful action
 * @returns {IUseLyricsActions} Loading/error state and action handler
 */
export const useLyricsActions = (reload: () => void): IUseLyricsActions => {
    const dispatch = useAppDispatch();

    const deleteState = useAppSelector(({ lyrics: { deleteLyrics } }) => deleteLyrics);

    const loading = deleteState.loading;
    const error = deleteState.error;

    const dispatchAction = async <T>(
        thunk: AsyncThunk<T, string, { rejectValue: Failure }>,
        id: string,
        notification: typeof LyricsNotification.deleteSuccess
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

    const onDelete = (id: string) => {
        return dispatchAction(deleteLyricsAction, id, LyricsNotification.deleteSuccess);
    };

    const resetActionError = () => {
        dispatch(resetDeleteLyricsAction());
    };

    return { loading, error, onDelete, resetActionError };
};
