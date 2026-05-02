import type { ContentStatus } from "@/shared/domain/enums/content-status.enum";
import type { IPaginationParams } from "@/shared/domain/types/pagination";

/**
 * Query parameters for listing videos with pagination and optional filters.
 *
 * @interface IVideosQueryParams
 * @extends {IPaginationParams}
 *
 * @property {ContentStatus} [status] - Optional content status filter
 * @property {string} [categoryId] - Optional category filter
 */
export interface IVideosQueryParams extends IPaginationParams {
    status?: ContentStatus;
    categoryId?: string;
}
