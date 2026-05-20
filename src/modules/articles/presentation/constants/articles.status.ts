import { ContentStatus } from "@/shared/domain/enums/content-status.enum";
import type { IStatusOption } from "@/shared/domain/types/pagination";

/**
 * Status filter values for the articles list.
 */
export type ArticleStatusFilter = "all" | ContentStatus;

/**
 * Status filter options for the articles table toolbar.
 *
 * @description
 * Module-specific options with French labels. Passed to the
 * generic `TableStatusFilter` / `TableToolbar` components.
 */
export const ARTICLE_STATUS_OPTIONS: IStatusOption<ArticleStatusFilter>[] = [
    { value: "all", label: "Tous" },
    { value: ContentStatus.Draft, label: "Brouillon" },
    { value: ContentStatus.PendingPayment, label: "Paiement en cours" },
    { value: ContentStatus.PendingReview, label: "En attente de revue" },
    { value: ContentStatus.Approved, label: "Approuvé" },
    { value: ContentStatus.Published, label: "Publié" },
    { value: ContentStatus.Rejected, label: "Rejeté" },
    { value: ContentStatus.Archived, label: "Archivé" }
];
