import type { IPaginationParams } from "@/shared/domain/types/pagination";

/**
 * Basic pagination query parameters for list endpoints.
 *
 * @interface IPaginationQueryParams
 * @extends {IPaginationParams}
 */
export interface IPaginationQueryParams extends IPaginationParams {}
