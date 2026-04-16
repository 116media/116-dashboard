import type {
    EnumPaymentMethod,
    EnumPaymentStatus
} from "@/shared/infrastructure/api/generated/116.api";
import type { IPaginationParams } from "@/shared/domain/types/pagination";

/**
 * Query parameters for listing payments with pagination and optional filters.
 *
 * @interface IPaymentsQueryParams
 * @extends {IPaginationParams}
 *
 * @property {EnumPaymentStatus} [status] - Optional payment status filter
 * @property {EnumPaymentMethod} [method] - Optional payment method filter
 */
export interface IPaymentsQueryParams extends IPaginationParams {
    status?: EnumPaymentStatus;
    method?: EnumPaymentMethod;
}
