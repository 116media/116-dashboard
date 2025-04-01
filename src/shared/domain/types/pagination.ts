/**
 * Form context for create/edit modals.
 *
 * @description
 * Determines whether a modal is in create or edit mode,
 * controlling form pre-population and submit behavior.
 */
export type FormContext = "CREATE" | "EDIT";

/**
 * Generic status option for table filter dropdowns.
 *
 * @interface IStatusOption
 * @template T - The status value type (defined per module)
 *
 * @description
 * Each module defines its own status values and labels.
 * This shared interface provides the generic shape that
 * `TableStatusFilter` and `TableToolbar` accept.
 *
 * @property {T} value - The status value sent to the filter handler
 * @property {string} label - French display label
 *
 * @example
 * ```ts
 * const ROLE_STATUS_OPTIONS: IStatusOption<RoleStatusFilter>[] = [
 *     { value: "all", label: "Tous" },
 *     { value: "active", label: "Actifs" },
 * ];
 * ```
 */
export interface IStatusOption<T extends string = string> {
    value: T;
    label: string;
}

/**
 * Pagination parameters sent to the API.
 *
 * @interface IPaginationParams
 *
 * @description
 * Maps directly to the backend's paginated query parameters.
 * `pageIndex` is 0-based (the API convention). Ant Design Table
 * uses 1-based `current` — hooks must convert: `current = pageIndex + 1`.
 *
 * @property {number} pageIndex - Zero-based page index
 * @property {number} pageSize - Number of items per page
 * @property {string} [search] - Full-text search query
 */
export interface IPaginationParams {
    pageIndex: number;
    pageSize: number;
    search?: string;
}

/**
 * Paginated result shape returned by the API.
 *
 * @interface IPaginatedResult
 * @template T - The type of items in the result
 *
 * @property {T[]} items - The page of results
 * @property {number} pageIndex - Current zero-based page index
 * @property {number} pageSize - Items per page
 * @property {number} count - Total number of records across all pages
 */
export interface IPaginatedResult<T> {
    items: T[];
    pageIndex: number;
    pageSize: number;
    count: number;
}
