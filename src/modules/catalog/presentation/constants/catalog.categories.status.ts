import type { IStatusOption } from "@/shared/domain/types/pagination";

/**
 * Status filter values for the categories list.
 */
export type CategoryStatusFilter = "all" | "active" | "inactive";

/**
 * Status filter options for the categories table toolbar.
 *
 * @description
 * Module-specific options with French labels. Passed to the
 * generic `TableStatusFilter` / `TableToolbar` components.
 */
export const CATEGORY_STATUS_OPTIONS: IStatusOption<CategoryStatusFilter>[] = [
    { value: "all", label: "Toutes" },
    { value: "active", label: "Actives" },
    { value: "inactive", label: "Inactives" }
];
