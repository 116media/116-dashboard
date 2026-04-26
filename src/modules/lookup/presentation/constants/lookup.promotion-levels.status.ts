import type { IStatusOption } from "@/shared/domain/types/pagination";

/**
 * Status filter values for the promotion levels list.
 */
export type PromotionLevelStatusFilter = "all" | "active" | "inactive";

/**
 * Status filter options for the promotion levels table toolbar.
 *
 * @description
 * Module-specific options with French labels. Passed to the
 * generic `TableStatusFilter` / `TableToolbar` components.
 */
export const PROMOTION_LEVEL_STATUS_OPTIONS: IStatusOption<PromotionLevelStatusFilter>[] = [
    { value: "all", label: "Tous" },
    { value: "active", label: "Actifs" },
    { value: "inactive", label: "Inactifs" }
];
