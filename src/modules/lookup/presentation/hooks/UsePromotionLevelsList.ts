import { useCallback, useEffect, useMemo, useState } from "react";
import type { IPromotionLevelEntity } from "@/modules/lookup/domain/entities/IPromotionLevelEntity";
import type { PromotionLevelStatusFilter } from "@/modules/lookup/presentation/constants/lookup.promotion-levels.status";
import { getPromotionLevelsAction } from "@/modules/lookup/presentation/store/getpromotionlevels.action";
import type { Failure } from "@/shared/domain/failures/failure";
import { useDebounce } from "@/shared/presentation/hooks/UseDebounce";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";

/**
 * Return type for the promotion levels list hook.
 *
 * @interface IUsePromotionLevelsList
 */
interface IUsePromotionLevelsList {
    loading: boolean;
    error: Failure | null | undefined;
    items: IPromotionLevelEntity[];
    statusFilter: PromotionLevelStatusFilter;
    searchValue: string;
    onSearchChange: (value: string) => void;
    onSearch: (value: string) => void;
    onStatusFilterChange: (value: PromotionLevelStatusFilter) => void;
    reload: () => void;
}

/**
 * Custom hook for managing the promotion levels list.
 *
 * @description
 * Fetches all promotion levels on mount and applies client-side
 * status filtering. Supports server-side search with debounce.
 * Exposes a status filter, search controls, and reload callback.
 *
 * @returns Promotion levels list data, loading/error state, filter controls, and reload function
 */
export const usePromotionLevelsList = (): IUsePromotionLevelsList => {
    const dispatch = useAppDispatch();

    const {
        data: allItems,
        loading,
        error
    } = useAppSelector(({ lookup: { getPromotionLevels } }) => getPromotionLevels);

    const [searchValue, setSearchValue] = useState("");
    const debouncedSearch = useDebounce(searchValue);
    const [statusFilter, setStatusFilter] = useState<PromotionLevelStatusFilter>("all");

    const fetchPromotionLevels = useCallback(() => {
        dispatch(getPromotionLevelsAction(debouncedSearch || undefined));
    }, [dispatch, debouncedSearch]);

    useEffect(() => {
        fetchPromotionLevels();
    }, [fetchPromotionLevels]);

    const items = useMemo(() => {
        const list = (allItems as IPromotionLevelEntity[]) ?? [];
        if (statusFilter === "active") return list.filter((item) => item.isActive);
        if (statusFilter === "inactive") return list.filter((item) => !item.isActive);
        return list;
    }, [allItems, statusFilter]);

    const onStatusFilterChange = (value: PromotionLevelStatusFilter) => {
        setStatusFilter(value);
    };

    const onSearch = (value: string) => {
        setSearchValue(value);
    };

    const onSearchChange = (value: string) => {
        setSearchValue(value);
    };

    return {
        loading,
        error,
        items,
        statusFilter,
        searchValue,
        onSearchChange,
        onSearch,
        onStatusFilterChange,
        reload: fetchPromotionLevels
    };
};
