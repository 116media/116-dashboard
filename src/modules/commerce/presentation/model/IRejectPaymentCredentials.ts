/**
 * Form model for rejecting an order payment.
 *
 * @interface IRejectPaymentCredentials
 * @property {string | null} [notes] - Optional rejection notes explaining the reason
 */
export interface IRejectPaymentCredentials {
    notes?: string | null;
}
