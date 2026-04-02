import type { IContentTypeEntity } from "@/modules/lookup/domain/entities/IContentTypeEntity";

/**
 * Available action types for a content type record.
 */
export type ContentTypeAction = "edit" | "activate" | "deactivate";

interface IContentTypeDropdownItem {
    key: ContentTypeAction;
    label: string;
    danger?: boolean;
    hidden: (
        record: IContentTypeEntity,
        isSuperAdmin: boolean,
        isAdminOrSuperAdmin: boolean
    ) => boolean;
}

/**
 * Dropdown menu items for the content types table actions column.
 *
 * @description
 * Static configuration for each action's label, danger state,
 * and visibility logic. The `onClick` handler is wired at
 * render time in the columns definition.
 *
 * @remarks
 * - "edit" is restricted to SuperAdmin only.
 * - "activate" and "deactivate" are available to Admin and SuperAdmin.
 */
export const CONTENT_TYPE_DROPDOWN_ITEMS: IContentTypeDropdownItem[] = [
    {
        key: "edit",
        label: "Modifier",
        hidden: (_, isSuperAdmin) => !isSuperAdmin
    },
    {
        key: "activate",
        label: "Activer",
        hidden: (record, _, isAdminOrSuperAdmin) => !isAdminOrSuperAdmin || record.isActive
    },
    {
        key: "deactivate",
        label: "Désactiver",
        hidden: (record, _, isAdminOrSuperAdmin) => !isAdminOrSuperAdmin || !record.isActive
    }
];
