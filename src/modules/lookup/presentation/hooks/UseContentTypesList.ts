import { useCallback, useEffect, useMemo, useState } from "react";
import type { IContentTypeEntity } from "@/modules/lookup/domain/entities/IContentTypeEntity";
import type { ContentTypeStatusFilter } from "@/modules/lookup/presentation/constants/lookup.content-types.status";
import { getContentTypesAction } from "@/modules/lookup/presentation/store/getcontenttypes.action";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";

/**
 * Return type for the content types list hook.
 *
 * @interface IUseContentTypesList
 */
interface IUseContentTypesList {
    loading: boolean;
    error: Failure | null | undefined;
    items: IContentTypeEntity[];
    statusFilter: ContentTypeStatusFilter;
    onStatusFilterChange: (value: ContentTypeStatusFilter) => void;
    reload: () => void;
}

/**
 * Custom hook for managing the content types list.
 *
 * @description
 * Fetches all content types on mount and applies client-side
 * status filtering. No pagination is needed since lookup lists
 * are small. Exposes a status filter and reload callback.
 *
 * @returns Content types list data, loading/error state, filter controls, and reload function
 */
export const useContentTypesList = (): IUseContentTypesList => {
    const dispatch = useAppDispatch();

    const {
        data: allItems,
        loading,
        error
    } = useAppSelector(({ lookup: { getContentTypes } }) => getContentTypes);

    const [statusFilter, setStatusFilter] = useState<ContentTypeStatusFilter>("all");

    const fetchContentTypes = useCallback(() => {
        dispatch(getContentTypesAction());
    }, [dispatch]);

    useEffect(() => {
        fetchContentTypes();
    }, [fetchContentTypes]);

    const items = useMemo(() => {
        const list = (allItems as IContentTypeEntity[]) ?? [];
        if (statusFilter === "active") return list.filter((item) => item.isActive);
        if (statusFilter === "inactive") return list.filter((item) => !item.isActive);
        return list;
    }, [allItems, statusFilter]);

    const onStatusFilterChange = (value: ContentTypeStatusFilter) => {
        setStatusFilter(value);
    };

    return {
        loading,
        error,
        items,
        statusFilter,
        onStatusFilterChange,
        reload: fetchContentTypes
    };
};
