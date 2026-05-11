import type { IArticleSummaryEntity } from "@/modules/articles/domain/entities/IArticleSummaryEntity";
import { EnumContentStatus } from "@/shared/infrastructure/api/generated/116.api";

/**
 * Available action types for an article record.
 */
export type ArticleAction =
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
    key: ArticleAction;
    label: string;
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
    { key: "edit", label: "Modifier", hidden: (_, __, isAdmin) => !isAdmin },
    { key: "seo", label: "Modifier le SEO", hidden: (_, __, isAdmin) => !isAdmin },
    { key: "tags", label: "Modifier les tags", hidden: (_, __, isAdmin) => !isAdmin },
    {
        key: "submit",
        label: "Soumettre",
        hidden: (r, isSuperAdmin) => !isSuperAdmin || r.status !== EnumContentStatus.Draft
    },
    {
        key: "approve",
        label: "Approuver",
        hidden: (r, isSuperAdmin) => !isSuperAdmin || r.status !== EnumContentStatus.PendingReview
    },
    {
        key: "publish",
        label: "Publier",
        hidden: (r, isSuperAdmin) => !isSuperAdmin || r.status !== EnumContentStatus.Approved
    },
    {
        key: "reject",
        label: "Rejeter",
        danger: true,
        hidden: (r, isSuperAdmin) =>
            !isSuperAdmin ||
            ![EnumContentStatus.PendingReview, EnumContentStatus.Approved].includes(r.status)
    },
    {
        key: "archive",
        label: "Archiver",
        hidden: (r, isSuperAdmin) =>
            !isSuperAdmin ||
            ![EnumContentStatus.Published, EnumContentStatus.Rejected].includes(r.status)
    },
    { key: "delete", label: "Supprimer", danger: true, hidden: (_, isSuperAdmin) => !isSuperAdmin }
];
