import type { IStatusOption } from "@/shared/domain/types/pagination";

/**
 * Status filter values for the pricing tiers list.
 */
export type PricingTierStatusFilter = "all" | "active" | "inactive";

/**
 * Status filter options for the pricing tiers table toolbar.
 *
 * @description
 * Module-specific options with French labels. Passed to the
 * generic `TableStatusFilter` / `TableToolbar` components.
 */
export const PRICING_TIER_STATUS_OPTIONS: IStatusOption<PricingTierStatusFilter>[] = [
    { value: "all", label: "Tous" },
    { value: "active", label: "Actifs" },
    { value: "inactive", label: "Inactifs" }
];
