import { useCallback, useEffect, useState } from "react";
import type { IVideoSummaryEntity } from "@/modules/videos/domain/entities/IVideoSummaryEntity";
import type { VideoStatusFilter } from "@/modules/videos/presentation/constants/videos.status";
import { getVideosAction } from "@/modules/videos/presentation/store/getvideos.action";
import type { Failure } from "@/shared/domain/failures/failure";
import type { IPaginatedResult } from "@/shared/domain/types/pagination";
import type { EnumContentStatus } from "@/shared/infrastructure/api/generated/116.api";
import { useDebounce } from "@/shared/presentation/hooks/UseDebounce";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";

/**
 * Return type for the videos list hook.
 *
 * @interface IUseVideosList
 */
interface IUseVideosList {
    loading: boolean;
    error: Failure | null | undefined;
    videos: IPaginatedResult<IVideoSummaryEntity>;
    statusFilter: VideoStatusFilter;
    searchValue: string;
    onSearch: (value: string) => void;
    onSearchChange: (value: string) => void;
    onStatusFilterChange: (value: VideoStatusFilter) => void;
    onPageChange: (page: number, pageSize: number) => void;
    reload: () => void;
}

/**
 * Custom hook for managing the videos paginated list.
 *
 * @description
 * Manages pagination, search, and status filter state.
 * Dispatches `getVideosAction` when parameters change.
 * Converts between Ant Design's 1-based pagination and the API's
 * 0-based `pageIndex`.
 *
 * @returns Videos list data, loading/error state, filter controls, and reload function
 */
export const useVideosList = (): IUseVideosList => {
    const dispatch = useAppDispatch();

    const {
        data: videos,
        loading,
        error
    } = useAppSelector(({ videos: { getVideos } }) => getVideos);

    const [searchValue, setSearchValue] = useState("");
    const debouncedSearch = useDebounce(searchValue);
    const [statusFilter, setStatusFilter] = useState<VideoStatusFilter>("all");
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const fetchVideos = useCallback(() => {
        const status: EnumContentStatus | undefined =
            statusFilter === "all" ? undefined : statusFilter;

        dispatch(
            getVideosAction({
                pageIndex,
                pageSize,
                search: debouncedSearch || undefined,
                status
            })
        );
    }, [dispatch, pageIndex, pageSize, debouncedSearch, statusFilter]);

    useEffect(() => {
        fetchVideos();
    }, [fetchVideos]);

    const onSearch = (value: string) => {
        setSearchValue(value);
        setPageIndex(0);
    };

    const onSearchChange = (value: string) => {
        setSearchValue(value);
    };

    const onStatusFilterChange = (value: VideoStatusFilter) => {
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
        videos: videos as IPaginatedResult<IVideoSummaryEntity>,
        statusFilter,
        searchValue,
        onSearch,
        onSearchChange,
        onStatusFilterChange,
        onPageChange,
        reload: fetchVideos
    };
};
