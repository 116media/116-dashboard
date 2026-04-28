import { useCallback, useEffect, useState } from "react";
import type { IPackageEntity } from "@/modules/catalog/domain/entities/IPackageEntity";
import type { PackageStatusFilter } from "@/modules/catalog/presentation/constants/catalog.packages.status";
import { getAllPackagesAction } from "@/modules/catalog/presentation/store/getallpackages.action";
import type { Failure } from "@/shared/domain/failures/failure";
import type { IPaginatedResult } from "@/shared/domain/types/pagination";
import { useDebounce } from "@/shared/presentation/hooks/UseDebounce";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";

/**
 * Return type for the packages list hook.
 *
 * @interface IUsePackagesList
 */
interface IUsePackagesList {
    loading: boolean;
    error: Failure | null | undefined;
    packages: IPaginatedResult<IPackageEntity>;
    statusFilter: PackageStatusFilter;
    searchValue: string;
    onSearch: (value: string) => void;
    onSearchChange: (value: string) => void;
    onStatusFilterChange: (value: PackageStatusFilter) => void;
    onPageChange: (page: number, pageSize: number) => void;
    reload: () => void;
}

/**
 * Custom hook for managing the packages paginated list.
 *
 * @description
 * Manages pagination, search, and status filter state.
 * Dispatches `getAllPackagesAction` when parameters change.
 * Converts between Ant Design's 1-based pagination and the API's
 * 0-based `pageIndex`.
 *
 * @returns Packages list data, loading/error state, filter controls, and reload function
 */
export const usePackagesList = (): IUsePackagesList => {
    const dispatch = useAppDispatch();

    const {
        data: packages,
        loading,
        error
    } = useAppSelector(({ catalog: { getAllPackages } }) => getAllPackages);

    const [searchValue, setSearchValue] = useState("");
    const debouncedSearch = useDebounce(searchValue);
    const [statusFilter, setStatusFilter] = useState<PackageStatusFilter>("all");
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const fetchPackages = useCallback(() => {
        const isActive =
            statusFilter === "active" ? true : statusFilter === "inactive" ? false : undefined;

        dispatch(
            getAllPackagesAction({
                pageIndex,
                pageSize,
                search: debouncedSearch || undefined,
                isActive
            })
        );
    }, [dispatch, pageIndex, pageSize, debouncedSearch, statusFilter]);

    useEffect(() => {
        fetchPackages();
    }, [fetchPackages]);

    const onSearch = (value: string) => {
        setSearchValue(value);
        setPageIndex(0);
    };

    const onSearchChange = (value: string) => {
        setSearchValue(value);
    };

    const onStatusFilterChange = (value: PackageStatusFilter) => {
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
        packages: packages as IPaginatedResult<IPackageEntity>,
        statusFilter,
        searchValue,
        onSearch,
        onSearchChange,
        onStatusFilterChange,
        onPageChange,
        reload: fetchPackages
    };
};
