import type { EnumContentStatus } from "@/shared/infrastructure/api/generated/116.api";
import type { IPaginationParams } from "@/shared/domain/types/pagination";

/**
 * Query parameters for listing articles with pagination and optional filters.
 *
 * @interface IArticlesQueryParams
 * @extends {IPaginationParams}
 *
 * @property {EnumContentStatus} [status] - Optional content status filter
 * @property {string} [categoryId] - Optional category filter
 */
export interface IArticlesQueryParams extends IPaginationParams {
    status?: EnumContentStatus;
    categoryId?: string;
}
