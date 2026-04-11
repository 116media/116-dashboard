import { useCallback, useEffect, useState } from "react";
import type { IOrderSummaryEntity } from "@/modules/commerce/domain/entities/IOrderSummaryEntity";
import type { OrderStatusFilter } from "@/modules/commerce/presentation/constants/commerce.orders.status";
import { listOrdersAction } from "@/modules/commerce/presentation/store/listorders.action";
import type { Failure } from "@/shared/domain/failures/failure";
import type { IPaginatedResult } from "@/shared/domain/types/pagination";
import { useDebounce } from "@/shared/presentation/hooks/UseDebounce";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";

/**
 * Return type for the orders list hook.
 *
 * @interface IUseOrdersList
 */
interface IUseOrdersList {
    loading: boolean;
    error: Failure | null | undefined;
    orders: IPaginatedResult<IOrderSummaryEntity>;
    statusFilter: OrderStatusFilter;
    searchValue: string;
    onSearch: (value: string) => void;
    onSearchChange: (value: string) => void;
    onStatusFilterChange: (value: OrderStatusFilter) => void;
    onPageChange: (page: number, pageSize: number) => void;
    reload: () => void;
}

/**
 * Custom hook for managing the orders paginated list.
 *
 * @description
 * Manages pagination, search, and status filter state.
 * Dispatches `listOrdersAction` when parameters change.
 * Converts between Ant Design's 1-based pagination and the API's
 * 0-based `pageIndex`.
 *
 * @returns {IUseOrdersList} Paginated orders, loading/error state, filter values, and control callbacks
 */
export const useOrdersList = (): IUseOrdersList => {
    const dispatch = useAppDispatch();

    const {
        data: orders,
        loading,
        error
    } = useAppSelector(({ commerce: { listOrders } }) => listOrders);

    const [searchValue, setSearchValue] = useState("");
    const debouncedSearch = useDebounce(searchValue);
    const [statusFilter, setStatusFilter] = useState<OrderStatusFilter>("all");
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const fetchOrders = useCallback(() => {
        const status = statusFilter === "all" ? undefined : statusFilter;

        dispatch(
            listOrdersAction({
                pageIndex,
                pageSize,
                status,
                search: debouncedSearch || undefined
            })
        );
    }, [dispatch, pageIndex, pageSize, debouncedSearch, statusFilter]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const onSearch = (value: string) => {
        setSearchValue(value);
        setPageIndex(0);
    };

    const onSearchChange = (value: string) => {
        setSearchValue(value);
    };

    const onStatusFilterChange = (value: OrderStatusFilter) => {
        setStatusFilter(value);
        setPageIndex(0);
    };

    const onPageChange = (page: number, size: number) => {
        setPageIndex(page - 1);
        setPageSize(size);
    };

    return {
        loading,
        error,
        orders: orders as IPaginatedResult<IOrderSummaryEntity>,
        statusFilter,
        searchValue,
        onSearch,
        onSearchChange,
        onStatusFilterChange,
        onPageChange,
        reload: fetchOrders
    };
};
