import { useCallback, useEffect, useState } from "react";
import type { IRolePaginatedResult } from "@/modules/roles/domain/entities/IRolePaginatedResult";
import type { RoleStatusFilter } from "@/modules/roles/presentation/constants/roles.status";
import { getAllRolesAction } from "@/modules/roles/presentation/store/getall.action";
import type { Failure } from "@/shared/domain/failures/failure";
import { useDebounce } from "@/shared/presentation/hooks/UseDebounce";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";

/**
 * Return type for the roles list hook.
 *
 * @interface IUseRolesList
 */
interface IUseRolesList {
    loading: boolean;
    error: Failure | null | undefined;
    roles: IRolePaginatedResult;
    statusFilter: RoleStatusFilter;
    searchValue: string;
    onSearch: (value: string) => void;
    onSearchChange: (value: string) => void;
    onStatusFilterChange: (value: RoleStatusFilter) => void;
    onPageChange: (page: number, pageSize: number) => void;
    reload: () => void;
}

/**
 * Custom hook for managing the roles paginated list.
 *
 * @description
 * Manages pagination, search, and status filter state.
 * Dispatches `getAllRolesAction` when parameters change.
 * Converts between Ant Design's 1-based pagination and the API's
 * 0-based `pageIndex`.
 *
 * @returns Roles list data, loading/error state, filter controls, and reload function
 */
export const useRolesList = (): IUseRolesList => {
    const dispatch = useAppDispatch();

    const { data: roles, loading, error } = useAppSelector(({ roles: { getAll } }) => getAll);

    const [searchValue, setSearchValue] = useState("");
    const debouncedSearch = useDebounce(searchValue);
    const [statusFilter, setStatusFilter] = useState<RoleStatusFilter>("all");
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const fetchRoles = useCallback(() => {
        const isActive =
            statusFilter === "active" ? true : statusFilter === "inactive" ? false : undefined;
        const isDeleted = statusFilter === "deleted";

        dispatch(
            getAllRolesAction({
                pageIndex,
                pageSize,
                search: debouncedSearch || undefined,
                isActive,
                isDeleted
            })
        );
    }, [dispatch, pageIndex, pageSize, debouncedSearch, statusFilter]);

    useEffect(() => {
        fetchRoles();
    }, [fetchRoles]);

    const onSearch = (value: string) => {
        setSearchValue(value);
        setPageIndex(0);
    };

    const onSearchChange = (value: string) => {
        setSearchValue(value);
    };

    const onStatusFilterChange = (value: RoleStatusFilter) => {
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
        roles: roles as IRolePaginatedResult,
        statusFilter,
        searchValue,
        onSearch,
        onSearchChange,
        onStatusFilterChange,
        onPageChange,
        reload: fetchRoles
    };
};
