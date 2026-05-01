/**
 * Payment method options for the payment proof form.
 *
 * @description
 * Static select options with French labels for the payment
 * method dropdown. Used in the PaymentProofForm component.
 */
export const PAYMENT_METHOD_OPTIONS = [
    { value: "BankTransfer", label: "Virement bancaire" },
    { value: "MobileMoney", label: "Mobile Money" },
    { value: "Cash", label: "Espèces" }
] as const;
