import type { IPaginationParams } from "@/shared/domain/types/pagination";

/**
 * Query parameters for listing categories with pagination and optional filters.
 *
 * @interface ICategoriesQueryParams
 * @extends {IPaginationParams}
 *
 * @property {boolean} [isActive] - Optional active status filter
 * @property {boolean} [isFree] - Optional free tier filter
 */
export interface ICategoriesQueryParams extends IPaginationParams {
    isActive?: boolean;
    isFree?: boolean;
}
