import { useCallback, useEffect, useState } from "react";
import type { IArticleSummaryEntity } from "@/modules/articles/domain/entities/IArticleSummaryEntity";
import type { ArticleStatusFilter } from "@/modules/articles/presentation/constants/articles.status";
import { getArticlesAction } from "@/modules/articles/presentation/store/getarticles.action";
import type { Failure } from "@/shared/domain/failures/failure";
import type { IPaginatedResult } from "@/shared/domain/types/pagination";
import type { EnumContentStatus } from "@/shared/infrastructure/api/generated/116.api";
import { useDebounce } from "@/shared/presentation/hooks/UseDebounce";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";

/**
 * Return type for the articles list hook.
 *
 * @interface IUseArticlesList
 */
interface IUseArticlesList {
    loading: boolean;
    error: Failure | null | undefined;
    articles: IPaginatedResult<IArticleSummaryEntity>;
    statusFilter: ArticleStatusFilter;
    searchValue: string;
    onSearch: (value: string) => void;
    onSearchChange: (value: string) => void;
    onStatusFilterChange: (value: ArticleStatusFilter) => void;
    onPageChange: (page: number, pageSize: number) => void;
    reload: () => void;
}

/**
 * Custom hook for managing the articles paginated list.
 *
 * @description
 * Manages pagination, search, and status filter state.
 * Dispatches `getArticlesAction` when parameters change.
 * Converts between Ant Design's 1-based pagination and the API's
 * 0-based `pageIndex`.
 *
 * @returns Articles list data, loading/error state, filter controls, and reload function
 */
export const useArticlesList = (): IUseArticlesList => {
    const dispatch = useAppDispatch();

    const {
        data: articles,
        loading,
        error
    } = useAppSelector(({ articles: { getArticles } }) => getArticles);

    const [searchValue, setSearchValue] = useState("");
    const debouncedSearch = useDebounce(searchValue);
    const [statusFilter, setStatusFilter] = useState<ArticleStatusFilter>("all");
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const fetchArticles = useCallback(() => {
        const status: EnumContentStatus | undefined =
            statusFilter === "all" ? undefined : statusFilter;

        dispatch(
            getArticlesAction({
                pageIndex,
                pageSize,
                search: debouncedSearch || undefined,
                status
            })
        );
    }, [dispatch, pageIndex, pageSize, debouncedSearch, statusFilter]);

    useEffect(() => {
        fetchArticles();
    }, [fetchArticles]);

    const onSearch = (value: string) => {
        setSearchValue(value);
        setPageIndex(0);
    };

    const onSearchChange = (value: string) => {
        setSearchValue(value);
    };

    const onStatusFilterChange = (value: ArticleStatusFilter) => {
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
        articles: articles as IPaginatedResult<IArticleSummaryEntity>,
        statusFilter,
        searchValue,
        onSearch,
        onSearchChange,
        onStatusFilterChange,
        onPageChange,
        reload: fetchArticles
    };
};
