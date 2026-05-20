/**
 * Domain enum for payment verification status.
 *
 * @description
 * Mirrors the backend EnumPaymentStatus but lives in the domain layer.
 * Presentation code must import from here — never from the generated API.
 * The infrastructure mapper is the only place that references the API enum.
 */
export enum PaymentStatus {
    Pending = "Pending",
    Verified = "Verified",
    Rejected = "Rejected"
}
