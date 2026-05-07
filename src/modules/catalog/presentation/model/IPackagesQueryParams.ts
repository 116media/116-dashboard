import type { IPaginationParams } from "@/shared/domain/types/pagination";

/**
 * Query parameters for listing packages with pagination and optional filters.
 *
 * @interface IPackagesQueryParams
 * @extends {IPaginationParams}
 *
 * @property {boolean} [isActive] - Optional active status filter
 */
export interface IPackagesQueryParams extends IPaginationParams {
    isActive?: boolean;
}
