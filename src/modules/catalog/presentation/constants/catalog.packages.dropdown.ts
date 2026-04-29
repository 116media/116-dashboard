import type { IPackageEntity } from "@/modules/catalog/domain/entities/IPackageEntity";

/**
 * Available action types for a package record.
 */
export type PackageAction = "activate" | "deactivate" | "manageSlots";

interface IPackageDropdownItem {
    key: PackageAction;
    label: string;
    danger?: boolean;
    hidden: (
        record: IPackageEntity,
        isSuperAdmin: boolean,
        isAdminOrSuperAdmin: boolean
    ) => boolean;
}

/**
 * Dropdown menu items for the packages table actions column.
 *
 * @description
 * Static configuration for each action's label, danger state,
 * and visibility logic. The `onClick` handler is wired at
 * render time in the columns definition.
 *
 * @remarks
 * - "activate" and "deactivate" are available to Admin and SuperAdmin.
 */
export const PACKAGE_DROPDOWN_ITEMS: IPackageDropdownItem[] = [
    {
        key: "manageSlots",
        label: "Gérer les slots",
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
