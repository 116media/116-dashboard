/**
 * Form model for verifying an order payment.
 *
 * @interface IVerifyPaymentCredentials
 * @property {string} receiptUrl - Receipt URL to record for audit purposes
 */
export interface IVerifyPaymentCredentials {
    receiptUrl: string;
}
