/**
 * Query parameters for the paginated permissions list.
 *
 * @interface IPermissionsQueryParams
 * @property {number} pageIndex - Zero-based page index
 * @property {number} pageSize - Items per page
 * @property {string} [search] - Full-text search on resource, action, and description
 * @property {boolean} [isActive] - Filter by active status
 * @property {boolean} [isDeleted] - Filter by deleted status
 */
export interface IPermissionsQueryParams {
    pageIndex: number;
    pageSize: number;
    search?: string;
    isActive?: boolean;
    isDeleted?: boolean;
}
