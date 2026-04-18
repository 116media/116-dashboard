import type { IPaginationParams } from "@/shared/domain/types/pagination";

/**
 * Query parameters for listing lyrics with pagination and optional search.
 *
 * @interface ILyricsQueryParams
 * @extends {IPaginationParams}
 */
export interface ILyricsQueryParams extends IPaginationParams {}
