/**
 * Domain enum for supported payment methods.
 *
 * @description
 * Mirrors the backend EnumPaymentMethod but lives in the domain layer.
 * Presentation code must import from here — never from the generated API.
 * The infrastructure mapper is the only place that references the API enum.
 */
export enum PaymentMethod {
    BankTransfer = "BankTransfer",
    MobileMoney = "MobileMoney",
    Cash = "Cash"
}
