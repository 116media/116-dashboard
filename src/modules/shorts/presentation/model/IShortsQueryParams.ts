import type { IPaginationParams } from "@/shared/domain/types/pagination";

/**
 * Query parameters for listing short videos with pagination and optional filters.
 *
 * @interface IShortsQueryParams
 * @extends {IPaginationParams}
 *
 * @property {boolean} [isActive] - Optional active status filter
 */
export interface IShortsQueryParams extends IPaginationParams {
    isActive?: boolean;
}
