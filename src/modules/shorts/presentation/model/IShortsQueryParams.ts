import type { IPaginationParams } from "@/shared/domain/types/pagination";

/**
 * Query parameters for listing short videos with pagination and optional search.
 *
 * @interface IShortsQueryParams
 * @extends {IPaginationParams}
 */
export interface IShortsQueryParams extends IPaginationParams {}
