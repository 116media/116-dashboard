import type { ILyricsEntity } from "@/modules/lyrics/domain/entities/ILyricsEntity";

/**
 * Available action types for a lyrics record.
 */
export type LyricsAction = "edit" | "seo" | "viewVideo" | "delete";

interface ILyricsDropdownItem {
    label: string;
    danger?: boolean;
    key: LyricsAction;
    hidden: (record: ILyricsEntity, isSuperAdmin: boolean, isAdminOrSuperAdmin: boolean) => boolean;
}

/**
 * Dropdown menu items for the lyrics table actions column.
 *
 * @description
 * Static configuration for each action's label, danger state,
 * and visibility logic. The `onClick` handler is wired at
 * render time in the columns definition.
 *
 * @remarks
 * - "edit" and "seo" are restricted to Admin and SuperAdmin.
 * - "viewVideo" is visible to all when a video is linked.
 */
export const LYRICS_DROPDOWN_ITEMS: ILyricsDropdownItem[] = [
    { key: "viewVideo", label: "Voir la vidéo", hidden: (r) => !r.videoId },
    { key: "edit", label: "Modifier", hidden: (_, __, isAdmin) => !isAdmin },
    { key: "seo", label: "Modifier le SEO", hidden: (_, __, isAdmin) => !isAdmin },
    { key: "delete", label: "Supprimer", danger: true, hidden: (_, isSuperAdmin) => !isSuperAdmin }
];
