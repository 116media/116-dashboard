import { useCallback, useEffect } from "react";
import type { IOrderDetailEntity } from "@/modules/commerce/domain/entities/IOrderDetailEntity";
import type { IPaymentEntity } from "@/modules/commerce/domain/entities/IPaymentEntity";
import { commerceSlice } from "@/modules/commerce/presentation/store";
import { getOrderByIdAction } from "@/modules/commerce/presentation/store/getorderbyid.action";
import { getOrderPaymentAction } from "@/modules/commerce/presentation/store/getorderpayment.action";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";

/**
 * Return type for the order detail hook.
 *
 * @interface IUseOrderDetail
 */
interface IUseOrderDetail {
    order: IOrderDetailEntity | null;
    payment: IPaymentEntity | null;
    loadingOrder: boolean;
    loadingPayment: boolean;
    error: Failure | null | undefined;
    reload: () => void;
}

/**
 * Custom hook for loading order and payment details by ID.
 *
 * @param orderId - The order UUID to load
 * @returns {IUseOrderDetail} Order and payment data, loading states, error, and reload callback
 */
export const useOrderDetail = (orderId: string): IUseOrderDetail => {
    const dispatch = useAppDispatch();

    const {
        data: order,
        loading: loadingOrder,
        error: orderError
    } = useAppSelector(({ commerce: { getOrderById } }) => getOrderById);

    const {
        data: payment,
        loading: loadingPayment,
        error: paymentError
    } = useAppSelector(({ commerce: { getOrderPayment } }) => getOrderPayment);

    const reload = useCallback(() => {
        if (orderId) {
            dispatch(getOrderByIdAction(orderId));
        }
    }, [dispatch, orderId]);

    useEffect(() => {
        reload();
        return () => {
            dispatch(commerceSlice.actions.purge(["getOrderById", "getOrderPayment"]));
        };
    }, [reload, dispatch]);

    useEffect(() => {
        const currentOrder = order as IOrderDetailEntity | null;
        if (orderId && currentOrder?.hasPayment) dispatch(getOrderPaymentAction(orderId));
    }, [dispatch, orderId, order]);

    return {
        order: (order as IOrderDetailEntity) ?? null,
        payment: (payment as IPaymentEntity) ?? null,
        loadingOrder,
        loadingPayment,
        error: orderError || paymentError,
        reload
    };
};
