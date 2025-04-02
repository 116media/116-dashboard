import type { IStatusOption } from "@/shared/domain/types/pagination";

/**
 * Status filter values for the permissions list.
 */
export type PermissionStatusFilter = "all" | "active" | "inactive" | "deleted";

/**
 * Status filter options for the permissions table toolbar.
 *
 * @description
 * Module-specific options with French labels. Passed to the
 * generic `TableStatusFilter` / `TableToolbar` components.
 */
export const PERMISSION_STATUS_OPTIONS: IStatusOption<PermissionStatusFilter>[] = [
    { value: "all", label: "Tous" },
    { value: "active", label: "Actifs" },
    { value: "inactive", label: "Inactifs" },
    { value: "deleted", label: "Supprimés" }
];
