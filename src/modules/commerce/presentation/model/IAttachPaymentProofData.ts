import type { EnumPaymentMethod } from "@/shared/infrastructure/api/generated/116.api";

/**
 * Form model for attaching a payment proof file to an order.
 *
 * @interface IAttachPaymentProofData
 * @property {File} file - Payment proof file to upload
 * @property {EnumPaymentMethod} paymentMethod - Selected payment method
 */
export interface IAttachPaymentProofData {
    file: File;
    paymentMethod: EnumPaymentMethod;
}
