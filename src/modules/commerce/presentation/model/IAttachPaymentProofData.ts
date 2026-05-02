import type { PaymentMethod } from "@/shared/domain/enums/payment-method.enum";

/**
 * Form model for attaching a payment proof file to an order.
 *
 * @interface IAttachPaymentProofData
 * @property {File} file - Payment proof file to upload
 * @property {PaymentMethod} paymentMethod - Selected payment method
 */
export interface IAttachPaymentProofData {
    file: File;
    paymentMethod: PaymentMethod;
}
