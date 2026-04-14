import type {
    EnumOrderStatus,
    EnumPaymentMethod,
    EnumPaymentStatus
} from "@/shared/infrastructure/api/generated/116.api";

/**
 * Domain entity for a payment record summary in list views.
 *
 * @interface IPaymentSummaryEntity
 *
 * @property {string} id - Unique payment identifier (UUID)
 * @property {string} orderId - Linked order UUID
 * @property {string} customerName - Full name of the B2B customer
 * @property {number} amountUsd - Payment amount in USD
 * @property {EnumPaymentMethod | null} paymentMethod - Payment method used, or null
 * @property {EnumPaymentStatus} status - Payment verification status
 * @property {EnumOrderStatus} orderStatus - Lifecycle status of the linked order
 * @property {string | null} verifiedBy - UUID of the verifying admin
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
    paymentMethod?: EnumPaymentMethod | null;
    status: EnumPaymentStatus;
    orderStatus: EnumOrderStatus;
    verifiedBy?: string | null;
    verifiedAt?: string | null;
    createdAt?: string | null;
    createdBy?: string | null;
    updatedAt?: string | null;
    updatedBy?: string | null;
}
