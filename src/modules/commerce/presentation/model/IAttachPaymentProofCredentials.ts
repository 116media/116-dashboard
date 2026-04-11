import type { UploadFile } from "antd";
import type { EnumPaymentMethod } from "@/shared/infrastructure/api/generated/116.api";

/**
 * Form model for attaching a payment proof to an order.
 *
 * @interface IAttachPaymentProofCredentials
 * @property {EnumPaymentMethod} paymentMethod - Selected payment method
 * @property {UploadFile[]} file - Uploaded proof file (Ant Design Upload)
 */
export interface IAttachPaymentProofCredentials {
    paymentMethod: EnumPaymentMethod;
    file: UploadFile[];
}
