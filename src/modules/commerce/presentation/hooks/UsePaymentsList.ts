import { useCallback, useEffect, useState } from "react";
import type { IPaymentSummaryEntity } from "@/modules/commerce/domain/entities/IPaymentSummaryEntity";
import type { PaymentStatusFilter } from "@/modules/commerce/presentation/constants/commerce.payment.status";
import { listPaymentsAction } from "@/modules/commerce/presentation/store/listpayments.action";
import type { Failure } from "@/shared/domain/failures/failure";
import type { IPaginatedResult } from "@/shared/domain/types/pagination";
import {
    type EnumPaymentMethod,
    EnumPaymentStatus
} from "@/shared/infrastructure/api/generated/116.api";
import { useDebounce } from "@/shared/presentation/hooks/UseDebounce";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";

/**
 * Payment method filter type including "all" option.
 */
export type PaymentMethodFilter = "all" | EnumPaymentMethod;

/**
 * Return type for the payments list hook.
 *
 * @interface IUsePaymentsList
 */
interface IUsePaymentsList {
    loading: boolean;
    error: Failure | null | undefined;
    payments: IPaginatedResult<IPaymentSummaryEntity>;
    statusFilter: PaymentStatusFilter;
    methodFilter: PaymentMethodFilter;
    searchValue: string;
    onSearch: (value: string) => void;
    onSearchChange: (value: string) => void;
    onStatusFilterChange: (value: PaymentStatusFilter) => void;
    onMethodFilterChange: (value: PaymentMethodFilter) => void;
    onPageChange: (page: number, pageSize: number) => void;
    reload: () => void;
}

/**
 * Custom hook for managing the payments list.
 *
 * @description
 * Fetches payment records from the dedicated payments endpoint
 * with status and method filters. Status defaults to Pending.
 * Supports debounced search by customer info and server-side pagination.
 *
 * @returns {IUsePaymentsList} Paginated payments, loading/error state, filter controls, and reload callback
 */
export const usePaymentsList = (): IUsePaymentsList => {
    const dispatch = useAppDispatch();

    const {
        data: payments,
        loading,
        error
    } = useAppSelector(({ commerce: { listPayments } }) => listPayments);

    const [searchValue, setSearchValue] = useState("");
    const debouncedSearch = useDebounce(searchValue);
    const [statusFilter, setStatusFilter] = useState<PaymentStatusFilter>(
        EnumPaymentStatus.Pending
    );
    const [methodFilter, setMethodFilter] = useState<PaymentMethodFilter>("all");
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const fetchPayments = useCallback(() => {
        const status = statusFilter === "all" ? undefined : (statusFilter as EnumPaymentStatus);
        const method = methodFilter === "all" ? undefined : (methodFilter as EnumPaymentMethod);

        dispatch(
            listPaymentsAction({
                pageIndex,
                pageSize,
                status,
                method,
                search: debouncedSearch || undefined
            })
        );
    }, [dispatch, pageIndex, pageSize, debouncedSearch, statusFilter, methodFilter]);

    useEffect(() => {
        fetchPayments();
    }, [fetchPayments]);

    const onSearch = (value: string) => {
        setSearchValue(value);
        setPageIndex(0);
    };

    const onSearchChange = (value: string) => {
        setSearchValue(value);
    };

    const onStatusFilterChange = (value: PaymentStatusFilter) => {
        setStatusFilter(value);
        setPageIndex(0);
    };

    const onMethodFilterChange = (value: PaymentMethodFilter) => {
        setMethodFilter(value);
        setPageIndex(0);
    };

    const onPageChange = (page: number, size: number) => {
        setPageIndex(page - 1);
        setPageSize(size);
    };

    return {
        loading,
        error,
        payments: payments as IPaginatedResult<IPaymentSummaryEntity>,
        statusFilter,
        methodFilter,
        searchValue,
        onSearch,
        onSearchChange,
        onStatusFilterChange,
        onMethodFilterChange,
        onPageChange,
        reload: fetchPayments
    };
};
