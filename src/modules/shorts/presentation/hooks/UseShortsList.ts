import { useCallback, useEffect, useMemo, useState } from "react";
import type { IShortVideoEntity } from "@/modules/shorts/domain/entities/IShortVideoEntity";
import type { ShortStatusFilter } from "@/modules/shorts/presentation/constants/shorts.status";
import { getShortsAction } from "@/modules/shorts/presentation/store/getallshorts.action";
import type { Failure } from "@/shared/domain/failures/failure";
import type { IPaginatedResult } from "@/shared/domain/types/pagination";
import { useDebounce } from "@/shared/presentation/hooks/UseDebounce";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";

/**
 * Return type for the shorts list hook.
 *
 * @interface IUseShortsList
 */
interface IUseShortsList {
    loading: boolean;
    error: Failure | null | undefined;
    shorts: IPaginatedResult<IShortVideoEntity>;
    statusFilter: ShortStatusFilter;
    searchValue: string;
    onSearch: (value: string) => void;
    onSearchChange: (value: string) => void;
    onStatusFilterChange: (value: ShortStatusFilter) => void;
    onPageChange: (page: number, pageSize: number) => void;
    reload: () => void;
}

/**
 * Custom hook for managing the shorts paginated list.
 *
 * @description
 * Manages pagination, search, and status filter state.
 * Dispatches `getShortsAction` when parameters change.
 * Converts between Ant Design's 1-based pagination and the API's
 * 0-based `pageIndex`. Filters by active/inactive status client-side
 * since the API does not have a status query parameter.
 *
 * @returns Shorts list data, loading/error state, filter controls, and reload function
 */
export const useShortsList = (): IUseShortsList => {
    const dispatch = useAppDispatch();

    const {
        data: shorts,
        loading,
        error
    } = useAppSelector(({ shorts: { getShorts } }) => getShorts);

    const [searchValue, setSearchValue] = useState("");
    const debouncedSearch = useDebounce(searchValue);
    const [statusFilter, setStatusFilter] = useState<ShortStatusFilter>("all");
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const fetchShorts = useCallback(() => {
        dispatch(
            getShortsAction({
                pageIndex,
                pageSize,
                search: debouncedSearch || undefined
            })
        );
    }, [dispatch, pageIndex, pageSize, debouncedSearch]);

    useEffect(() => {
        fetchShorts();
    }, [fetchShorts]);

    const filteredShorts = useMemo(() => {
        const data = shorts as IPaginatedResult<IShortVideoEntity>;
        if (!data || statusFilter === "all") return data;

        const isActive = statusFilter === "active";
        const filtered = data.items.filter((item) => item.isActive === isActive);
        return { ...data, items: filtered, count: filtered.length };
    }, [shorts, statusFilter]);

    const onSearch = (value: string) => {
        setSearchValue(value);
        setPageIndex(0);
    };

    const onSearchChange = (value: string) => {
        setSearchValue(value);
    };

    const onStatusFilterChange = (value: ShortStatusFilter) => {
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
        shorts: filteredShorts as IPaginatedResult<IShortVideoEntity>,
        statusFilter,
        searchValue,
        onSearch,
        onSearchChange,
        onStatusFilterChange,
        onPageChange,
        reload: fetchShorts
    };
};
