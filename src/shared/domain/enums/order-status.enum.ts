/**
 * Domain enum for order lifecycle status.
 *
 * @description
 * Mirrors the backend EnumOrderStatus but lives in the domain layer.
 * Presentation code must import from here — never from the generated API.
 * The infrastructure mapper is the only place that references the API enum.
 */
export enum OrderStatus {
    Draft = "Draft",
    PendingPayment = "PendingPayment",
    Paid = "Paid",
    Cancelled = "Cancelled"
}
