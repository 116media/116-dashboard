import type { AsyncThunk } from "@reduxjs/toolkit";
import { activateShortAction } from "@/modules/shorts/presentation/store/activateshort.action";
import { deactivateShortAction } from "@/modules/shorts/presentation/store/deactivateshort.action";
import { deleteShortAction } from "@/modules/shorts/presentation/store/deleteshort.action";
import { ShortsNotification } from "@/modules/shorts/presentation/utils/notification/shorts.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

/**
 * Return type for the short actions hook.
 *
 * @interface IUseShortActions
 */
interface IUseShortActions {
    loading: boolean;
    error: Failure | null | undefined;
    onActivate: (id: string) => Promise<void>;
    onDeactivate: (id: string) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
}

/**
 * Custom hook for short video status and delete actions.
 *
 * @description
 * Provides handlers for activate, deactivate, and delete actions.
 * Each action dispatches the corresponding thunk and shows
 * a success or error notification.
 *
 * @param reload - Callback to refresh the shorts list after a successful action
 * @returns {IUseShortActions} Loading/error state and action handlers
 */
export const useShortActions = (reload: () => void): IUseShortActions => {
    const dispatch = useAppDispatch();

    const activateState = useAppSelector(({ shorts: { activateShort } }) => activateShort);
    const deactivateState = useAppSelector(({ shorts: { deactivateShort } }) => deactivateShort);
    const deleteState = useAppSelector(({ shorts: { deleteShort } }) => deleteShort);

    const loading = activateState.loading || deactivateState.loading || deleteState.loading;

    const error = activateState.error || deactivateState.error || deleteState.error;

    const dispatchAction = async <T>(
        thunk: AsyncThunk<T, string, { rejectValue: Failure }>,
        id: string,
        notification: typeof ShortsNotification.activateSuccess
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

    const onActivate = (id: string) => {
        return dispatchAction(activateShortAction, id, ShortsNotification.activateSuccess);
    };

    const onDeactivate = (id: string) => {
        return dispatchAction(deactivateShortAction, id, ShortsNotification.deactivateSuccess);
    };

    const onDelete = (id: string) => {
        return dispatchAction(deleteShortAction, id, ShortsNotification.deleteSuccess);
    };

    return { loading, error, onActivate, onDeactivate, onDelete };
};
