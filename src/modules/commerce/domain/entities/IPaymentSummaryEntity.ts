import type { OrderStatus } from "@/shared/domain/enums/order-status.enum";
import type { PaymentMethod } from "@/shared/domain/enums/payment-method.enum";
import type { PaymentStatus } from "@/shared/domain/enums/payment-status.enum";

/**
 * Domain entity for a payment record summary in list views.
 *
 * @interface IPaymentSummaryEntity
 *
 * @property {string} id - Unique payment identifier (UUID)
 * @property {string} orderId - Linked order UUID
 * @property {string} customerName - Full name of the B2B customer
 * @property {number} amountUsd - Payment amount in USD
 * @property {PaymentMethod | null} paymentMethod - Payment method used, or null
 * @property {PaymentStatus} status - Payment verification status
 * @property {OrderStatus} orderStatus - Lifecycle status of the linked order
 * @property {string | null} verifiedBy - UUID of the verifying admin
 * @property {string | null} verifiedByUserName - Display name of the verifying admin
 * @property {string | null} verifiedAt - ISO timestamp of verification
 * @property {string | null} createdAt - ISO creation timestamp
 * @property {string | null} createdBy - UUID of the creating admin
 * @property {string | null} updatedAt - ISO last-update timestamp
 * @property {string | null} updatedBy - UUID of the last-updating admin
 */
export interface IPaymentSummaryEntity {
    id: string;
    orderId: string;
    customerName: string;
    amountUsd: number;
    paymentMethod?: PaymentMethod | null;
    status: PaymentStatus;
    orderStatus: OrderStatus;
    verifiedBy?: string | null;
    verifiedByUserName?: string | null;
    verifiedAt?: string | null;
    createdAt?: string | null;
    createdBy?: string | null;
    updatedAt?: string | null;
    updatedBy?: string | null;
}
