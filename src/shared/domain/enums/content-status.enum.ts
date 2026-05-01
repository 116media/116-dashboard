/**
 * Domain enum for editorial content workflow status.
 *
 * @description
 * Mirrors the backend EnumContentStatus but lives in the domain layer.
 * Presentation code must import from here — never from the generated API.
 * The infrastructure mapper is the only place that references the API enum.
 */
export enum ContentStatus {
    Draft = "Draft",
    PendingPayment = "PendingPayment",
    PendingReview = "PendingReview",
    Approved = "Approved",
    Published = "Published",
    Rejected = "Rejected",
    Archived = "Archived"
}
