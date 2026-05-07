import type { IStatusOption } from "@/shared/domain/types/pagination";

/**
 * Status filter values for the shorts list.
 */
export type ShortStatusFilter = "all" | "active" | "inactive";

/**
 * Status filter options for the shorts table toolbar.
 *
 * @description
 * Module-specific options with French labels. Passed to the
 * generic `TableStatusFilter` / `TableToolbar` components.
 */
export const SHORT_STATUS_OPTIONS: IStatusOption<ShortStatusFilter>[] = [
    { value: "all", label: "Tous" },
    { value: "active", label: "Actif" },
    { value: "inactive", label: "Inactif" }
];
