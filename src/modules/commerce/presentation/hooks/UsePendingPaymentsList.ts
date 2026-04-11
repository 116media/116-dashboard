import { useCallback, useEffect, useState } from "react";
import type { IOrderSummaryEntity } from "@/modules/commerce/domain/entities/IOrderSummaryEntity";
import { listPendingPaymentOrdersAction } from "@/modules/commerce/presentation/store/listpendingpaymentorders.action";
import type { Failure } from "@/shared/domain/failures/failure";
import type { IPaginatedResult } from "@/shared/domain/types/pagination";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";

/**
 * Return type for the pending payments list hook.
 *
 * @interface IUsePendingPaymentsList
 */
interface IUsePendingPaymentsList {
    loading: boolean;
    error: Failure | null | undefined;
    orders: IPaginatedResult<IOrderSummaryEntity>;
    onPageChange: (page: number, pageSize: number) => void;
    reload: () => void;
}

/**
 * Custom hook for managing the pending-payment orders list.
 *
 * @description
 * Fetches orders in PendingPayment status with server-side pagination.
 * Used by the Payments tab to show orders awaiting payment verification.
 *
 * @returns {IUsePendingPaymentsList} Paginated orders, loading/error state, page change handler, and reload callback
 */
export const usePendingPaymentsList = (): IUsePendingPaymentsList => {
    const dispatch = useAppDispatch();

    const {
        data: orders,
        loading,
        error
    } = useAppSelector(({ commerce: { listPendingPaymentOrders } }) => listPendingPaymentOrders);

    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const fetchOrders = useCallback(() => {
        dispatch(listPendingPaymentOrdersAction({ pageIndex, pageSize }));
    }, [dispatch, pageIndex, pageSize]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const onPageChange = (page: number, size: number) => {
        setPageIndex(page - 1);
        setPageSize(size);
    };

    return {
        loading,
        error,
        orders: orders as IPaginatedResult<IOrderSummaryEntity>,
        onPageChange,
        reload: fetchOrders
    };
};
