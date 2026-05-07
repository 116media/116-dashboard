import type { IPaginationParams } from "@/shared/domain/types/pagination";

/**
 * Query parameters for listing customers with pagination and optional search.
 *
 * @interface ICustomersQueryParams
 * @extends {IPaginationParams}
 */
export interface ICustomersQueryParams extends IPaginationParams {}
