import type { AsyncThunk } from "@reduxjs/toolkit";
import { activatePromotionLevelAction } from "@/modules/lookup/presentation/store/activatepromotionlevel.action";
import { deactivatePromotionLevelAction } from "@/modules/lookup/presentation/store/deactivatepromotionlevel.action";
import { PromotionLevelsNotification } from "@/modules/lookup/presentation/utils/notification/lookup.promotion-levels.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

/**
 * Return type for the promotion level actions hook.
 *
 * @interface IUsePromotionLevelActions
 */
interface IUsePromotionLevelActions {
    loading: boolean;
    error: Failure | null | undefined;
    onActivate: (id: string) => Promise<void>;
    onDeactivate: (id: string) => Promise<void>;
}

/**
 * Custom hook for promotion level activate and deactivate actions.
 *
 * @description
 * Provides handlers for activate and deactivate operations.
 * Shows a success notification on fulfilled and a backend error
 * toast on rejection. Calls `reload` after each successful
 * action to refresh the table.
 *
 * @param reload - Callback to refresh the promotion levels list after a successful action
 * @returns Action handlers, aggregate loading, and error state
 */
export const usePromotionLevelActions = (reload: () => void): IUsePromotionLevelActions => {
    const dispatch = useAppDispatch();

    const activateState = useAppSelector(
        ({ lookup: { activatePromotionLevel } }) => activatePromotionLevel
    );
    const deactivateState = useAppSelector(
        ({ lookup: { deactivatePromotionLevel } }) => deactivatePromotionLevel
    );

    const loading = activateState.loading || deactivateState.loading;
    const error = activateState.error || deactivateState.error;

    const dispatchAction = async <T>(
        thunk: AsyncThunk<T, string, { rejectValue: Failure }>,
        id: string,
        notification: typeof PromotionLevelsNotification.activateSuccess
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
        return dispatchAction(
            activatePromotionLevelAction,
            id,
            PromotionLevelsNotification.activateSuccess
        );
    };

    const onDeactivate = (id: string) => {
        return dispatchAction(
            deactivatePromotionLevelAction,
            id,
            PromotionLevelsNotification.deactivateSuccess
        );
    };

    return { loading, error, onActivate, onDeactivate };
};
