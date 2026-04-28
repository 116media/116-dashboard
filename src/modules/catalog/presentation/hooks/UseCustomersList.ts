import { useCallback, useEffect, useState } from "react";
import type { ICustomerEntity } from "@/modules/catalog/domain/entities/ICustomerEntity";
import { getAllCustomersAction } from "@/modules/catalog/presentation/store/getallcustomers.action";
import type { Failure } from "@/shared/domain/failures/failure";
import type { IPaginatedResult } from "@/shared/domain/types/pagination";
import { useDebounce } from "@/shared/presentation/hooks/UseDebounce";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";

/**
 * Return type for the customers list hook.
 *
 * @interface IUseCustomersList
 */
interface IUseCustomersList {
    loading: boolean;
    error: Failure | null | undefined;
    customers: IPaginatedResult<ICustomerEntity>;
    searchValue: string;
    onSearch: (value: string) => void;
    onSearchChange: (value: string) => void;
    onPageChange: (page: number, pageSize: number) => void;
    reload: () => void;
}

/**
 * Custom hook for managing the customers paginated list.
 *
 * @description
 * Manages pagination and search state.
 * Dispatches `getAllCustomersAction` when parameters change.
 * Converts between Ant Design's 1-based pagination and the API's
 * 0-based `pageIndex`.
 *
 * @returns Customers list data, loading/error state, search controls, and reload function
 */
export const useCustomersList = (): IUseCustomersList => {
    const dispatch = useAppDispatch();

    const {
        data: customers,
        loading,
        error
    } = useAppSelector(({ catalog: { getAllCustomers } }) => getAllCustomers);

    const [searchValue, setSearchValue] = useState("");
    const debouncedSearch = useDebounce(searchValue);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const fetchCustomers = useCallback(() => {
        dispatch(
            getAllCustomersAction({
                pageIndex,
                pageSize,
                search: debouncedSearch || undefined
            })
        );
    }, [dispatch, pageIndex, pageSize, debouncedSearch]);

    useEffect(() => {
        fetchCustomers();
    }, [fetchCustomers]);

    const onSearch = (value: string) => {
        setSearchValue(value);
        setPageIndex(0);
    };

    const onSearchChange = (value: string) => {
        setSearchValue(value);
    };

    const onPageChange = (page: number, size: number) => {
        setPageIndex(page - 1);
        setPageSize(size);
    };

    return {
        loading,
        error,
        customers: customers as IPaginatedResult<ICustomerEntity>,
        searchValue,
        onSearch,
        onSearchChange,
        onPageChange,
        reload: fetchCustomers
    };
};
