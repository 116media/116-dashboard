import type { IArticleSummaryEntity } from "@/modules/articles/domain/entities/IArticleSummaryEntity";
import { ContentStatus } from "@/shared/domain/enums/content-status.enum";

/**
 * Available action types for an article record.
 */
export type ArticleAction =
    | "view"
    | "edit"
    | "seo"
    | "tags"
    | "submit"
    | "approve"
    | "publish"
    | "reject"
    | "archive"
    | "delete";

interface IArticleDropdownItem {
    label: string;
    key: ArticleAction;
    danger?: boolean;
    hidden: (
        record: IArticleSummaryEntity,
        isSuperAdmin: boolean,
        isAdminOrSuperAdmin: boolean
    ) => boolean;
}

/**
 * Dropdown menu items for the articles table actions column.
 *
 * @description
 * Static configuration for each action's label, danger state,
 * and visibility logic. The `onClick` handler is wired at
 * render time in the columns definition.
 *
 * @remarks
 * - "edit", "seo", and "tags" are restricted to Admin and SuperAdmin.
 * - Workflow transitions (submit, approve, publish, reject, archive) are SuperAdmin only
 *   and depend on the article's current status.
 * - "delete" is restricted to SuperAdmin only.
 */
export const ARTICLE_DROPDOWN_ITEMS: IArticleDropdownItem[] = [
    { key: "view", label: "Voir", hidden: () => false },
    { key: "edit", label: "Modifier", hidden: (_, __, isAdmin) => !isAdmin },
    { key: "seo", label: "Modifier le SEO", hidden: (_, __, isAdmin) => !isAdmin },
    { key: "tags", label: "Modifier les tags", hidden: (_, __, isAdmin) => !isAdmin },
    {
        key: "submit",
        label: "Soumettre",
        hidden: (r, isSuperAdmin) =>
            !isSuperAdmin || ![ContentStatus.Draft, ContentStatus.Rejected].includes(r.status)
    },
    {
        key: "approve",
        label: "Approuver",
        hidden: (r, isSuperAdmin) => !isSuperAdmin || r.status !== ContentStatus.PendingReview
    },
    {
        key: "publish",
        label: "Publier",
        hidden: (r, isSuperAdmin) => !isSuperAdmin || r.status !== ContentStatus.Approved
    },
    {
        key: "reject",
        label: "Rejeter",
        danger: true,
        hidden: (r, isSuperAdmin) =>
            !isSuperAdmin ||
            ![ContentStatus.PendingReview, ContentStatus.Approved].includes(r.status)
    },
    {
        key: "archive",
        label: "Archiver",
        hidden: (r, isSuperAdmin) =>
            !isSuperAdmin || ![ContentStatus.Published, ContentStatus.Rejected].includes(r.status)
    },
    {
        key: "delete",
        label: "Supprimer",
        danger: true,
        hidden: (r, isSuperAdmin) => !isSuperAdmin || !r.canDelete
    }
];
