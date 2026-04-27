import { useCallback, useEffect, useState } from "react";
import type { ITagEntity } from "@/modules/lookup/domain/entities/ITagEntity";
import { getTagsAction } from "@/modules/lookup/presentation/store/gettags.action";
import type { Failure } from "@/shared/domain/failures/failure";
import { useDebounce } from "@/shared/presentation/hooks/UseDebounce";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";

/**
 * Return type for the tags list hook.
 *
 * @interface IUseTagsList
 */
interface IUseTagsList {
    loading: boolean;
    reload: () => void;
    items: ITagEntity[];
    searchValue: string;
    error: Failure | null | undefined;
    onSearch: (value: string) => void;
    onSearchChange: (value: string) => void;
}

/**
 * Custom hook for managing the tags list.
 *
 * @description
 * Fetches all tags on mount. Supports server-side search with debounce.
 * Tags have no status filter since they do not carry an active/inactive state.
 * Exposes search controls and a reload callback.
 *
 * @returns Tags list data, loading/error state, search controls, and reload function
 */
export const useTagsList = (): IUseTagsList => {
    const dispatch = useAppDispatch();

    const { data: allItems, loading, error } = useAppSelector(({ lookup: { getTags } }) => getTags);

    const [searchValue, setSearchValue] = useState("");
    const debouncedSearch = useDebounce(searchValue);

    const fetchTags = useCallback(() => {
        dispatch(getTagsAction(debouncedSearch || undefined));
    }, [dispatch, debouncedSearch]);

    useEffect(() => {
        fetchTags();
    }, [fetchTags]);

    const onSearch = (value: string) => {
        setSearchValue(value);
    };

    const onSearchChange = (value: string) => {
        setSearchValue(value);
    };

    return {
        loading,
        error,
        items: (allItems as ITagEntity[]) ?? [],
        searchValue,
        onSearchChange,
        onSearch,
        reload: fetchTags
    };
};
