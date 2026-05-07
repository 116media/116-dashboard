import type { EnumOrderStatus } from "@/shared/infrastructure/api/generated/116.api";
import type { IPaginationParams } from "@/shared/domain/types/pagination";

/**
 * Query parameters for listing orders with pagination and optional filters.
 *
 * @interface IOrdersQueryParams
 * @extends {IPaginationParams}
 *
 * @property {EnumOrderStatus} [status] - Optional order status filter
 * @property {string} [customerId] - Optional customer filter
 */
export interface IOrdersQueryParams extends IPaginationParams {
    status?: EnumOrderStatus;
    customerId?: string;
}
