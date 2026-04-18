import type { ILyricsEntity } from "@/modules/lyrics/domain/entities/ILyricsEntity";

/**
 * Available action types for a lyrics record.
 */
export type LyricsAction = "edit" | "seo";

interface ILyricsDropdownItem {
    key: LyricsAction;
    label: string;
    danger?: boolean;
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
 */
export const LYRICS_DROPDOWN_ITEMS: ILyricsDropdownItem[] = [
    { key: "edit", label: "Modifier", hidden: (_, __, isAdmin) => !isAdmin },
    { key: "seo", label: "Modifier le SEO", hidden: (_, __, isAdmin) => !isAdmin }
];
