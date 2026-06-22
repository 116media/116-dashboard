import type { AsyncThunk } from "@reduxjs/toolkit";
import {
    activatePricingTierAction,
    resetActivatePricingTierAction
} from "@/modules/lookup/presentation/store/activatepricingtier.action";
import {
    deactivatePricingTierAction,
    resetDeactivatePricingTierAction
} from "@/modules/lookup/presentation/store/deactivatepricingtier.action";
import { PricingTiersNotification } from "@/modules/lookup/presentation/utils/notification/lookup.pricing-tiers.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

/**
 * Return type for the pricing tier actions hook.
 *
 * @interface IUsePricingTierActions
 */
interface IUsePricingTierActions {
    loading: boolean;
    error: Failure | null | undefined;
    onActivate: (id: string) => Promise<void>;
    onDeactivate: (id: string) => Promise<void>;
    resetActionError: () => void;
}

/**
 * Custom hook for pricing tier activate and deactivate actions.
 *
 * @description
 * Provides handlers for activate and deactivate operations.
 * Shows a success notification on fulfilled and a backend error
 * toast on rejection. Calls `reload` after each successful
 * action to refresh the table.
 *
 * @param reload - Callback to refresh the pricing tiers list after a successful action
 * @returns Action handlers, aggregate loading, and error state
 */
export const usePricingTierActions = (reload: () => void): IUsePricingTierActions => {
    const dispatch = useAppDispatch();

    const activateState = useAppSelector(
        ({ lookup: { activatePricingTier } }) => activatePricingTier
    );
    const deactivateState = useAppSelector(
        ({ lookup: { deactivatePricingTier } }) => deactivatePricingTier
    );

    const loading = activateState.loading || deactivateState.loading;
    const error = activateState.error || deactivateState.error;

    const dispatchAction = async <T>(
        thunk: AsyncThunk<T, string, { rejectValue: Failure }>,
        id: string,
        notification: typeof PricingTiersNotification.activateSuccess
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
            activatePricingTierAction,
            id,
            PricingTiersNotification.activateSuccess
        );
    };

    const onDeactivate = (id: string) => {
        return dispatchAction(
            deactivatePricingTierAction,
            id,
            PricingTiersNotification.deactivateSuccess
        );
    };

    const resetActionError = () => {
        dispatch(resetActivatePricingTierAction());
        dispatch(resetDeactivatePricingTierAction());
    };

    return { loading, error, onActivate, onDeactivate, resetActionError };
};
