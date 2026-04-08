import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";

/**
 * Available action types for a category record.
 */
export type CategoryAction = "edit" | "activate" | "deactivate";

interface ICategoryDropdownItem {
    key: CategoryAction;
    label: string;
    danger?: boolean;
    hidden: (
        record: ICategoryEntity,
        isSuperAdmin: boolean,
        isAdminOrSuperAdmin: boolean
    ) => boolean;
}

/**
 * Dropdown menu items for the categories table actions column.
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
export const CATEGORY_DROPDOWN_ITEMS: ICategoryDropdownItem[] = [
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
        danger: true,
        hidden: (record, _, isAdminOrSuperAdmin) => !isAdminOrSuperAdmin || !record.isActive
    }
];
