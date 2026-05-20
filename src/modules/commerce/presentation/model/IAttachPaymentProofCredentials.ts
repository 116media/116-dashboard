import type { UploadFile } from "antd";
import type { PaymentMethod } from "@/shared/domain/enums/payment-method.enum";

/**
 * Form model for attaching a payment proof to an order.
 *
 * @interface IAttachPaymentProofCredentials
 * @property {PaymentMethod} paymentMethod - Selected payment method
 * @property {UploadFile[]} file - Uploaded proof file (Ant Design Upload)
 */
export interface IAttachPaymentProofCredentials {
    paymentMethod: PaymentMethod;
    file: UploadFile[];
}
