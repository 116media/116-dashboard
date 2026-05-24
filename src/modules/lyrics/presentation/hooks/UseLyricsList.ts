import { useCallback, useEffect, useState } from "react";
import type { ILyricsEntity } from "@/modules/lyrics/domain/entities/ILyricsEntity";
import { getLyricsAction } from "@/modules/lyrics/presentation/store/getalllyrics.action";
import type { Failure } from "@/shared/domain/failures/failure";
import type { IPaginatedResult } from "@/shared/domain/types/pagination";
import { useDebounce } from "@/shared/presentation/hooks/UseDebounce";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";

/**
 * Return type for the lyrics list hook.
 *
 * @interface IUseLyricsList
 */
interface IUseLyricsList {
    loading: boolean;
    searchValue: string;
    error: Failure | null | undefined;
    onSearch: (value: string) => void;
    lyrics: IPaginatedResult<ILyricsEntity>;
    onSearchChange: (value: string) => void;
    onPageChange: (page: number, pageSize: number) => void;
    reload: () => void;
}

/**
 * Custom hook for managing the lyrics paginated list.
 *
 * @description
 * Manages pagination and search state. Dispatches `getLyricsAction`
 * when parameters change. Converts between Ant Design's 1-based
 * pagination and the API's 0-based `pageIndex`.
 *
 * @returns Lyrics list data, loading/error state, search controls, and reload function
 */
export const useLyricsList = (): IUseLyricsList => {
    const dispatch = useAppDispatch();

    const {
        data: lyrics,
        loading,
        error
    } = useAppSelector(({ lyrics: { getLyrics } }) => getLyrics);

    const [searchValue, setSearchValue] = useState("");
    const debouncedSearch = useDebounce(searchValue);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const fetchLyrics = useCallback(() => {
        dispatch(
            getLyricsAction({
                pageIndex,
                pageSize,
                search: debouncedSearch || undefined
            })
        );
    }, [dispatch, pageIndex, pageSize, debouncedSearch]);

    useEffect(() => {
        fetchLyrics();
    }, [fetchLyrics]);

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
        lyrics: lyrics as IPaginatedResult<ILyricsEntity>,
        searchValue,
        onSearch,
        onSearchChange,
        onPageChange,
        reload: fetchLyrics
    };
};
