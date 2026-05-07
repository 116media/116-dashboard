import type { IShortVideoEntity } from "@/modules/shorts/domain/entities/IShortVideoEntity";

/**
 * Available action types for a short video record.
 */
export type ShortAction = "activate" | "deactivate" | "thumbnail" | "delete";

interface IShortDropdownItem {
    key: ShortAction;
    label: string;
    danger?: boolean;
    hidden: (record: IShortVideoEntity, isSuperAdmin: boolean) => boolean;
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
 * - "activate" is hidden when the short is already active.
 * - "deactivate" is hidden when the short is already inactive.
 * - "thumbnail" and "delete" are restricted to SuperAdmin only.
 */
export const SHORT_DROPDOWN_ITEMS: IShortDropdownItem[] = [
    {
        key: "activate",
        label: "Activer",
        hidden: (r, isSuperAdmin) => !isSuperAdmin || r.isActive
    },
    {
        key: "deactivate",
        label: "Désactiver",
        hidden: (r, isSuperAdmin) => !isSuperAdmin || !r.isActive
    },
    {
        key: "thumbnail",
        label: "Téléverser une miniature",
        hidden: (_, isSuperAdmin) => !isSuperAdmin
    },
    {
        key: "delete",
        label: "Supprimer",
        danger: true,
        hidden: (_, isSuperAdmin) => !isSuperAdmin
    }
];
