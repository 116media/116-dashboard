import type { IShortVideoEntity } from "@/modules/shorts/domain/entities/IShortVideoEntity";

/**
 * Available action types for a short video record.
 */
export type ShortAction = "edit" | "viewVideo" | "activate" | "deactivate" | "thumbnail" | "delete";

interface IShortDropdownItem {
    label: string;
    key: ShortAction;
    danger?: boolean;
    hidden: (
        record: IShortVideoEntity,
        isSuperAdmin: boolean,
        isAdminOrSuperAdmin: boolean
    ) => boolean;
}

/**
 * Dropdown menu items for the shorts table actions column.
 *
 * @description
 * Static configuration for each action's label, danger state,
 * and visibility logic. The `onClick` handler is wired at
 * render time in the columns definition.
 *
 * @remarks
 * - "edit" and "thumbnail" are available to Admin and SuperAdmin.
 * - "activate", "deactivate", and "delete" are restricted to SuperAdmin only.
 */
export const SHORT_DROPDOWN_ITEMS: IShortDropdownItem[] = [
    { key: "edit", label: "Modifier", hidden: (_, __, isAdmin) => !isAdmin },
    { key: "viewVideo", label: "Voir la vidéo associée", hidden: (r) => !r.videoId },
    {
        key: "activate",
        label: "Activer",
        hidden: (r, isSuperAdmin) => !isSuperAdmin || r.isActive
    },
    {
        key: "thumbnail",
        label: "Importer une miniature",
        hidden: (_, __, isAdmin) => !isAdmin
    },
    {
        key: "deactivate",
        label: "Désactiver",
        hidden: (r, isSuperAdmin) => !isSuperAdmin || !r.isActive
    },
    {
        key: "delete",
        label: "Supprimer",
        danger: true,
        hidden: (_, isSuperAdmin) => !isSuperAdmin
    }
];
