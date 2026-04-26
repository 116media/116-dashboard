import { useCallback, useEffect } from "react";
import type { ITagEntity } from "@/modules/lookup/domain/entities/ITagEntity";
import { getTagsAction } from "@/modules/lookup/presentation/store/gettags.action";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";

/**
 * Return type for the tags list hook.
 *
 * @interface IUseTagsList
 */
interface IUseTagsList {
    loading: boolean;
    error: Failure | null | undefined;
    items: ITagEntity[];
    reload: () => void;
}

/**
 * Custom hook for managing the tags list.
 *
 * @description
 * Fetches all tags on mount. Tags have no status filter since
 * they do not carry an active/inactive state. Exposes a reload
 * callback for refreshing after mutations.
 *
 * @returns Tags list data, loading/error state, and reload function
 */
export const useTagsList = (): IUseTagsList => {
    const dispatch = useAppDispatch();

    const { data: allItems, loading, error } = useAppSelector(({ lookup: { getTags } }) => getTags);

    const fetchTags = useCallback(() => {
        dispatch(getTagsAction());
    }, [dispatch]);

    useEffect(() => {
        fetchTags();
    }, [fetchTags]);

    return {
        loading,
        error,
        items: (allItems as ITagEntity[]) ?? [],
        reload: fetchTags
    };
};
