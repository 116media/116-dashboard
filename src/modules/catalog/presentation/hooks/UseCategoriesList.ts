import { useCallback, useEffect, useState } from "react";
import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";
import type { CategoryStatusFilter } from "@/modules/catalog/presentation/constants/catalog.categories.status";
import { getAllCategoriesAction } from "@/modules/catalog/presentation/store/getallcategories.action";
import type { Failure } from "@/shared/domain/failures/failure";
import type { IPaginatedResult } from "@/shared/domain/types/pagination";
import { useDebounce } from "@/shared/presentation/hooks/UseDebounce";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";

/**
 * Return type for the categories list hook.
 *
 * @interface IUseCategoriesList
 */
interface IUseCategoriesList {
    loading: boolean;
    error: Failure | null | undefined;
    categories: IPaginatedResult<ICategoryEntity>;
    statusFilter: CategoryStatusFilter;
    searchValue: string;
    onSearch: (value: string) => void;
    onSearchChange: (value: string) => void;
    onStatusFilterChange: (value: CategoryStatusFilter) => void;
    onPageChange: (page: number, pageSize: number) => void;
    reload: () => void;
}

/**
 * Custom hook for managing the categories paginated list.
 *
 * @description
 * Manages pagination, search, and status filter state.
 * Dispatches `getAllCategoriesAction` when parameters change.
 * Converts between Ant Design's 1-based pagination and the API's
 * 0-based `pageIndex`.
 *
 * @returns Categories list data, loading/error state, filter controls, and reload function
 */
export const useCategoriesList = (): IUseCategoriesList => {
    const dispatch = useAppDispatch();

    const {
        data: categories,
        loading,
        error
    } = useAppSelector(({ catalog: { getAllCategories } }) => getAllCategories);

    const [searchValue, setSearchValue] = useState("");
    const debouncedSearch = useDebounce(searchValue);
    const [statusFilter, setStatusFilter] = useState<CategoryStatusFilter>("all");
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const fetchCategories = useCallback(() => {
        const isActive =
            statusFilter === "active" ? true : statusFilter === "inactive" ? false : undefined;

        dispatch(
            getAllCategoriesAction({
                pageIndex,
                pageSize,
                search: debouncedSearch || undefined,
                isActive
            })
        );
    }, [dispatch, pageIndex, pageSize, debouncedSearch, statusFilter]);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const onSearch = (value: string) => {
        setSearchValue(value);
        setPageIndex(0);
    };

    const onSearchChange = (value: string) => {
        setSearchValue(value);
    };

    const onStatusFilterChange = (value: CategoryStatusFilter) => {
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
        categories: categories as IPaginatedResult<ICategoryEntity>,
        statusFilter,
        searchValue,
        onSearch,
        onSearchChange,
        onStatusFilterChange,
        onPageChange,
        reload: fetchCategories
    };
};
