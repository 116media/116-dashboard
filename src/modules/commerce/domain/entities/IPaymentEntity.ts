import type { PaymentMethod } from "@/shared/domain/enums/payment-method.enum";
import type { PaymentStatus } from "@/shared/domain/enums/payment-status.enum";

/**
 * Domain entity for a payment record attached to an order.
 *
 * @interface IPaymentEntity
 *
 * @property {string} id - Unique identifier (UUID)
 * @property {number} amountUsd - Payment amount in USD
 * @property {PaymentMethod | null} paymentMethod - Selected payment method
 * @property {{ id: string; fileName: string; storageUrl: string } | null} paymentProof - Uploaded proof file
 * @property {PaymentStatus} status - Current payment status
 * @property {string | null} verifiedBy - UUID of the admin who verified
 * @property {string | null} verifiedByUserName - Display name of the admin who verified
 * @property {string | null} verifiedAt - ISO timestamp of verification
 * @property {string | null} receiptUrl - URL to the payment receipt
 */
export interface IPaymentEntity {
    id: string;
    amountUsd: number;
    paymentMethod?: PaymentMethod | null;
    paymentProof?: {
        id: string;
        fileName: string;
        storageUrl: string;
    } | null;
    status: PaymentStatus;
    verifiedBy?: string | null;
    verifiedByUserName?: string | null;
    verifiedAt?: string | null;
    receiptUrl?: string | null;
}
