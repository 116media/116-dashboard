import type { IPaginationParams } from "@/shared/domain/types/pagination";

/**
 * Query parameters for the paginated permissions list.
 *
 * @interface IPermissionsQueryParams
 * @extends {IPaginationParams}
 *
 * @property {boolean} [isActive] - Filter by active status
 * @property {boolean} [isDeleted] - Filter by deleted status
 */
export interface IPermissionsQueryParams extends IPaginationParams {
    isActive?: boolean;
    isDeleted?: boolean;
}
