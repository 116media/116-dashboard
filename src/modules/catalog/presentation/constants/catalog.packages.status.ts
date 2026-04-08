import type { IStatusOption } from "@/shared/domain/types/pagination";

/**
 * Status filter values for the packages list.
 */
export type PackageStatusFilter = "all" | "active" | "inactive";

/**
 * Status filter options for the packages table toolbar.
 *
 * @description
 * Module-specific options with French labels. Passed to the
 * generic `TableStatusFilter` / `TableToolbar` components.
 */
export const PACKAGE_STATUS_OPTIONS: IStatusOption<PackageStatusFilter>[] = [
    { value: "all", label: "Tous" },
    { value: "active", label: "Actifs" },
    { value: "inactive", label: "Inactifs" }
];
