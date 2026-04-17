import type { IStatusOption } from "@/shared/domain/types/pagination";
import { EnumContentStatus } from "@/shared/infrastructure/api/generated/116.api";

/**
 * Status filter values for the articles list.
 */
export type ArticleStatusFilter = "all" | EnumContentStatus;

/**
 * Status filter options for the articles table toolbar.
 *
 * @description
 * Module-specific options with French labels. Passed to the
 * generic `TableStatusFilter` / `TableToolbar` components.
 */
export const ARTICLE_STATUS_OPTIONS: IStatusOption<ArticleStatusFilter>[] = [
    { value: "all", label: "Tous" },
    { value: EnumContentStatus.Draft, label: "Brouillon" },
    { value: EnumContentStatus.PendingPayment, label: "Paiement en cours" },
    { value: EnumContentStatus.PendingReview, label: "En attente de revue" },
    { value: EnumContentStatus.Approved, label: "Approuvé" },
    { value: EnumContentStatus.Published, label: "Publié" },
    { value: EnumContentStatus.Rejected, label: "Rejeté" },
    { value: EnumContentStatus.Archived, label: "Archivé" }
];
