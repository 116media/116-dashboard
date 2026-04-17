import type { EnumContentStatus } from "@/shared/infrastructure/api/generated/116.api";
import type { IPaginationParams } from "@/shared/domain/types/pagination";

/**
 * Query parameters for listing videos with pagination and optional filters.
 *
 * @interface IVideosQueryParams
 * @extends {IPaginationParams}
 *
 * @property {EnumContentStatus} [status] - Optional content status filter
 * @property {string} [categoryId] - Optional category filter
 */
export interface IVideosQueryParams extends IPaginationParams {
    status?: EnumContentStatus;
    categoryId?: string;
}
