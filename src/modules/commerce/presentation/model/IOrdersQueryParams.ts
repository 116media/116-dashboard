import type { OrderStatus } from "@/shared/domain/enums/order-status.enum";
import type { IPaginationParams } from "@/shared/domain/types/pagination";

/**
 * Query parameters for listing orders with pagination and optional filters.
 *
 * @interface IOrdersQueryParams
 * @extends {IPaginationParams}
 *
 * @property {OrderStatus} [status] - Optional order status filter
 * @property {string} [customerId] - Optional customer filter
 */
export interface IOrdersQueryParams extends IPaginationParams {
    status?: OrderStatus;
    customerId?: string;
}
