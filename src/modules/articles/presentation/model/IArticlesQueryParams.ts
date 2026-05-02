import type { ContentStatus } from "@/shared/domain/enums/content-status.enum";
import type { IPaginationParams } from "@/shared/domain/types/pagination";

/**
 * Query parameters for listing articles with pagination and optional filters.
 *
 * @interface IArticlesQueryParams
 * @extends {IPaginationParams}
 *
 * @property {ContentStatus} [status] - Optional content status filter
 * @property {string} [categoryId] - Optional category filter
 */
export interface IArticlesQueryParams extends IPaginationParams {
    status?: ContentStatus;
    categoryId?: string;
}
