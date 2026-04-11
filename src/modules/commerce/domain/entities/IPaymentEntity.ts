import type {
    EnumPaymentMethod,
    EnumPaymentStatus
} from "@/shared/infrastructure/api/generated/116.api";

/**
 * Domain entity for a payment record attached to an order.
 *
 * @interface IPaymentEntity
 *
 * @property {string} id - Unique identifier (UUID)
 * @property {number} amountUsd - Payment amount in USD
 * @property {EnumPaymentMethod | null} paymentMethod - Selected payment method
 * @property {{ id: string; fileName: string; storageUrl: string } | null} paymentProof - Uploaded proof file
 * @property {EnumPaymentStatus} status - Current payment status
 * @property {string | null} verifiedBy - UUID of the admin who verified
 * @property {string | null} verifiedAt - ISO timestamp of verification
 * @property {string | null} receiptUrl - URL to the payment receipt
 */
export interface IPaymentEntity {
    id: string;
    amountUsd: number;
    paymentMethod?: EnumPaymentMethod | null;
    paymentProof?: {
        id: string;
        fileName: string;
        storageUrl: string;
    } | null;
    status: EnumPaymentStatus;
    verifiedBy?: string | null;
    verifiedAt?: string | null;
    receiptUrl?: string | null;
}
