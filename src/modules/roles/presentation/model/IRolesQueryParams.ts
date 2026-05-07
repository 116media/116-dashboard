import type { IPaginationParams } from "@/shared/domain/types/pagination";

/**
 * Query parameters for the paginated roles list.
 *
 * @interface IRolesQueryParams
 * @extends {IPaginationParams}
 *
 * @property {boolean} [isActive] - Filter by active status
 * @property {boolean} [isDeleted] - Filter by deleted status
 */
export interface IRolesQueryParams extends IPaginationParams {
    isActive?: boolean;
    isDeleted?: boolean;
}
