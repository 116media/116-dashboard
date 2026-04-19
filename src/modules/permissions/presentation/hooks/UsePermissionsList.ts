import { useCallback, useEffect, useState } from "react";
import type { IPermissionPaginatedResult } from "@/modules/permissions/domain/entities/IPermissionPaginatedResult";
import type { PermissionStatusFilter } from "@/modules/permissions/presentation/constants/permissions.status";
import { getAllPermissionsAction } from "@/modules/permissions/presentation/store/getall.action";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";

/**
 * Return type for the permissions list hook.
 *
 * @interface IUsePermissionsList
 */
interface IUsePermissionsList {
    loading: boolean;
    error: Failure | null | undefined;
    permissions: IPermissionPaginatedResult;
    statusFilter: PermissionStatusFilter;
    searchValue: string;
    onSearch: (value: string) => void;
    onSearchChange: (value: string) => void;
    onStatusFilterChange: (value: PermissionStatusFilter) => void;
    onPageChange: (page: number, pageSize: number) => void;
    reload: () => void;
}

/**
 * Custom hook for managing the permissions paginated list.
 *
 * @description
 * Manages pagination, search, and status filter state.
 * Dispatches `getAllPermissionsAction` when parameters change.
 * Converts between Ant Design's 1-based pagination and the API's
 * 0-based `pageIndex`.
 *
 * @returns Permissions list data, loading/error state, filter controls, and reload function
 */
export const usePermissionsList = (): IUsePermissionsList => {
    const dispatch = useAppDispatch();

    const {
        data: permissions,
        loading,
        error
    } = useAppSelector(({ permissions: { getAll } }) => getAll);

    const [searchValue, setSearchValue] = useState("");
    const [statusFilter, setStatusFilter] = useState<PermissionStatusFilter>("all");
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const fetchPermissions = useCallback(() => {
        const isActive =
            statusFilter === "active" ? true : statusFilter === "inactive" ? false : undefined;
        const isDeleted = statusFilter === "deleted";

        dispatch(
            getAllPermissionsAction({
                pageIndex,
                pageSize,
                search: searchValue || undefined,
                isActive,
                isDeleted
            })
        );
    }, [dispatch, pageIndex, pageSize, searchValue, statusFilter]);

    useEffect(() => {
        fetchPermissions();
    }, [fetchPermissions]);

    const onSearch = (value: string) => {
        setSearchValue(value);
        setPageIndex(0);
    };

    const onSearchChange = (value: string) => {
        setSearchValue(value);
    };

    const onStatusFilterChange = (value: PermissionStatusFilter) => {
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
        permissions: permissions as IPermissionPaginatedResult,
        statusFilter,
        searchValue,
        onSearch,
        onSearchChange,
        onStatusFilterChange,
        onPageChange,
        reload: fetchPermissions
    };
};
