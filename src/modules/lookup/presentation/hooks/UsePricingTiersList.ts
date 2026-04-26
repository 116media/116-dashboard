import { useCallback, useEffect, useMemo, useState } from "react";
import type { IPricingTierEntity } from "@/modules/lookup/domain/entities/IPricingTierEntity";
import type { PricingTierStatusFilter } from "@/modules/lookup/presentation/constants/lookup.pricing-tiers.status";
import { getPricingTiersAction } from "@/modules/lookup/presentation/store/getpricingtiers.action";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";

/**
 * Return type for the pricing tiers list hook.
 *
 * @interface IUsePricingTiersList
 */
interface IUsePricingTiersList {
    loading: boolean;
    error: Failure | null | undefined;
    items: IPricingTierEntity[];
    statusFilter: PricingTierStatusFilter;
    onStatusFilterChange: (value: PricingTierStatusFilter) => void;
    reload: () => void;
}

/**
 * Custom hook for managing the pricing tiers list.
 *
 * @description
 * Fetches all pricing tiers on mount and applies client-side
 * status filtering. No pagination is needed since lookup lists
 * are small. Exposes a status filter and reload callback.
 *
 * @returns Pricing tiers list data, loading/error state, filter controls, and reload function
 */
export const usePricingTiersList = (): IUsePricingTiersList => {
    const dispatch = useAppDispatch();

    const {
        data: allItems,
        loading,
        error
    } = useAppSelector(({ lookup: { getPricingTiers } }) => getPricingTiers);

    const [statusFilter, setStatusFilter] = useState<PricingTierStatusFilter>("all");

    const fetchPricingTiers = useCallback(() => {
        dispatch(getPricingTiersAction());
    }, [dispatch]);

    useEffect(() => {
        fetchPricingTiers();
    }, [fetchPricingTiers]);

    const items = useMemo(() => {
        const list = (allItems as IPricingTierEntity[]) ?? [];
        if (statusFilter === "active") return list.filter((item) => item.isActive);
        if (statusFilter === "inactive") return list.filter((item) => !item.isActive);
        return list;
    }, [allItems, statusFilter]);

    const onStatusFilterChange = (value: PricingTierStatusFilter) => {
        setStatusFilter(value);
    };

    return {
        loading,
        error,
        items,
        statusFilter,
        onStatusFilterChange,
        reload: fetchPricingTiers
    };
};
