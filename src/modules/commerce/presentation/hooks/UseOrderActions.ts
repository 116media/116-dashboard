import type { AsyncThunk } from "@reduxjs/toolkit";
import {
    cancelOrderAction,
    resetCancelOrderAction
} from "@/modules/commerce/presentation/store/cancelorder.action";
import {
    resetSubmitOrderAction,
    submitOrderAction
} from "@/modules/commerce/presentation/store/submitorder.action";
import { OrdersNotification } from "@/modules/commerce/presentation/utils/notification/commerce.orders.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

/**
 * Return type for the order actions hook.
 *
 * @interface IUseOrderActions
 */
interface IUseOrderActions {
    loading: boolean;
    error: Failure | null | undefined;
    onSubmit: (id: string) => Promise<void>;
    onCancel: (id: string) => Promise<void>;
    resetActionError: () => void;
}

/**
 * Custom hook for order submit and cancel actions.
 *
 * @param reload - Callback to refresh the orders list after a successful action
 * @returns {IUseOrderActions} Loading/error state and submit/cancel action handlers
 */
export const useOrderActions = (reload: () => void): IUseOrderActions => {
    const dispatch = useAppDispatch();

    const submitState = useAppSelector(({ commerce: { submitOrder } }) => submitOrder);
    const cancelState = useAppSelector(({ commerce: { cancelOrder } }) => cancelOrder);

    const loading = submitState.loading || cancelState.loading;
    const error = submitState.error || cancelState.error;

    const dispatchAction = async <T>(
        thunk: AsyncThunk<T, string, { rejectValue: Failure }>,
        id: string,
        notification: typeof OrdersNotification.submitSuccess
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
        return dispatchAction(submitOrderAction, id, OrdersNotification.submitSuccess);
    };

    const onCancel = (id: string) => {
        return dispatchAction(cancelOrderAction, id, OrdersNotification.cancelSuccess);
    };

    const resetActionError = () => {
        dispatch(resetSubmitOrderAction());
        dispatch(resetCancelOrderAction());
    };

    return { loading, error, onSubmit, onCancel, resetActionError };
};
