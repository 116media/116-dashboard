import { ContentStatus } from "@/shared/domain/enums/content-status.enum";
import type { IStatusOption } from "@/shared/domain/types/pagination";

/**
 * Status filter values for the videos list.
 */
export type VideoStatusFilter = "all" | ContentStatus;

/**
 * Status filter options for the videos table toolbar.
 *
 * @description
 * Module-specific options with French labels. Passed to the
 * generic `TableStatusFilter` / `TableToolbar` components.
 */
export const VIDEO_STATUS_OPTIONS: IStatusOption<VideoStatusFilter>[] = [
    { value: "all", label: "Tous" },
    { value: ContentStatus.Draft, label: "Brouillon" },
    { value: ContentStatus.PendingPayment, label: "Paiement en cours" },
    { value: ContentStatus.PendingReview, label: "En attente de revue" },
    { value: ContentStatus.Approved, label: "Approuvé" },
    { value: ContentStatus.Published, label: "Publié" },
    { value: ContentStatus.Rejected, label: "Rejeté" },
    { value: ContentStatus.Archived, label: "Archivé" }
];
