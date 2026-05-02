import type { IVideoSummaryEntity } from "@/modules/videos/domain/entities/IVideoSummaryEntity";
import { ContentStatus } from "@/shared/domain/enums/content-status.enum";

/**
 * Available action types for a video record.
 */
export type VideoAction =
    | "edit"
    | "seo"
    | "tags"
    | "thumbnail"
    | "youtube"
    | "shoot"
    | "submit"
    | "approve"
    | "publish"
    | "reject"
    | "archive"
    | "delete";

interface IVideoDropdownItem {
    key: VideoAction;
    label: string;
    danger?: boolean;
    hidden: (
        record: IVideoSummaryEntity,
        isSuperAdmin: boolean,
        isAdminOrSuperAdmin: boolean
    ) => boolean;
}

/**
 * Dropdown menu items for the videos table actions column.
 *
 * @description
 * Static configuration for each action's label, danger state,
 * and visibility logic. The `onClick` handler is wired at
 * render time in the columns definition.
 *
 * @remarks
 * - "edit", "seo", and "tags" are restricted to Admin and SuperAdmin.
 * - "thumbnail" and "shoot" are restricted to SuperAdmin only.
 * - "youtube" is restricted to Admin and SuperAdmin.
 * - Workflow transitions (submit, approve, publish, reject, archive) are SuperAdmin only
 *   and depend on the video's current status.
 * - "delete" is restricted to SuperAdmin only.
 */
export const VIDEO_DROPDOWN_ITEMS: IVideoDropdownItem[] = [
    { key: "edit", label: "Modifier", hidden: (_, __, isAdmin) => !isAdmin },
    { key: "seo", label: "Modifier le SEO", hidden: (_, __, isAdmin) => !isAdmin },
    { key: "tags", label: "Modifier les tags", hidden: (_, __, isAdmin) => !isAdmin },
    {
        key: "thumbnail",
        label: "Importer une miniature",
        hidden: (_, isSuperAdmin) => !isSuperAdmin
    },
    { key: "shoot", label: "Planifier un tournage", hidden: (_, isSuperAdmin) => !isSuperAdmin },
    { key: "youtube", label: "Associer YouTube", hidden: (_, __, isAdmin) => !isAdmin },
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
        hidden: (r, isSuperAdmin) =>
            !isSuperAdmin || r.status !== ContentStatus.Approved || !r.youtubeVideoUrl
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
        danger: true,
        key: "delete",
        label: "Supprimer",
        hidden: (r, isSuperAdmin) => !isSuperAdmin || !r.canDelete
    }
];
