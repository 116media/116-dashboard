import type { PaymentMethod } from "@/shared/domain/enums/payment-method.enum";
import type { PaymentStatus } from "@/shared/domain/enums/payment-status.enum";
import type { IPaginationParams } from "@/shared/domain/types/pagination";

/**
 * Query parameters for listing payments with pagination and optional filters.
 *
 * @interface IPaymentsQueryParams
 * @extends {IPaginationParams}
 *
 * @property {PaymentStatus} [status] - Optional payment status filter
 * @property {PaymentMethod} [method] - Optional payment method filter
 */
export interface IPaymentsQueryParams extends IPaginationParams {
    status?: PaymentStatus;
    method?: PaymentMethod;
}
