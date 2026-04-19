/**
 * Query parameters for the paginated roles list.
 *
 * @interface IRolesQueryParams
 * @property {number} pageIndex - Zero-based page index
 * @property {number} pageSize - Items per page
 * @property {string} [search] - Full-text search on name and description
 * @property {boolean} [isActive] - Filter by active status
 * @property {boolean} [isDeleted] - Filter by deleted status
 */
export interface IRolesQueryParams {
    pageIndex: number;
    pageSize: number;
    search?: string;
    isActive?: boolean;
    isDeleted?: boolean;
}
