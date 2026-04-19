import type { IStatusOption } from "@/shared/domain/types/pagination";

/**
 * Status filter values for the roles list.
 */
export type RoleStatusFilter = "all" | "active" | "inactive" | "deleted";

/**
 * Status filter options for the roles table toolbar.
 *
 * @description
 * Module-specific options with French labels. Passed to the
 * generic `TableStatusFilter` / `TableToolbar` components.
 */
export const ROLE_STATUS_OPTIONS: IStatusOption<RoleStatusFilter>[] = [
    { value: "all", label: "Tous" },
    { value: "active", label: "Actifs" },
    { value: "inactive", label: "Inactifs" },
    { value: "deleted", label: "Supprimés" }
];
