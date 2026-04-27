import type { ITagEntity } from "@/modules/lookup/domain/entities/ITagEntity";

/**
 * Available action types for a tag record.
 */
export type TagAction = "edit" | "delete";

interface ITagDropdownItem {
    key: TagAction;
    label: string;
    danger?: boolean;
    hidden: (record: ITagEntity, isSuperAdmin: boolean, isAdminOrSuperAdmin: boolean) => boolean;
}

/**
 * Dropdown menu items for the tags table actions column.
 *
 * @description
 * Static configuration for each action's label, danger state,
 * and visibility logic. The `onClick` handler is wired at
 * render time in the columns definition.
 *
 * @remarks
 * - "edit" is available to Admin and SuperAdmin.
 * - "delete" is restricted to SuperAdmin only, with danger styling.
 */
export const TAG_DROPDOWN_ITEMS: ITagDropdownItem[] = [
    {
        key: "edit",
        label: "Modifier",
        hidden: (_, _isSuperAdmin, isAdminOrSuperAdmin) => !isAdminOrSuperAdmin
    },
    {
        key: "delete",
        label: "Supprimer",
        danger: true,
        hidden: (_, isSuperAdmin) => !isSuperAdmin
    }
];
