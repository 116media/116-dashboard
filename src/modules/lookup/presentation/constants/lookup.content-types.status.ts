import type { IStatusOption } from "@/shared/domain/types/pagination";

/**
 * Status filter values for the content types list.
 */
export type ContentTypeStatusFilter = "all" | "active" | "inactive";

/**
 * Status filter options for the content types table toolbar.
 *
 * @description
 * Module-specific options with French labels. Passed to the
 * generic `TableStatusFilter` / `TableToolbar` components.
 */
export const CONTENT_TYPE_STATUS_OPTIONS: IStatusOption<ContentTypeStatusFilter>[] = [
    { value: "all", label: "Tous" },
    { value: "active", label: "Actifs" },
    { value: "inactive", label: "Inactifs" }
];
