import type { IPermissionEntity } from "@/modules/permissions/domain/entities/IPermission";
import type { PermissionAction } from "@/modules/permissions/presentation/components/tables/PermissionsTable/columns";

interface IPermissionDropdownItem {
    key: PermissionAction;
    label: string;
    danger?: boolean;
    hidden: (record: IPermissionEntity, isSuperAdmin: boolean) => boolean;
}

/**
 * Dropdown menu items for the permissions table actions column.
 *
 * @description
 * Static configuration for each action's label, danger state,
 * and visibility logic. The `onClick` handler is wired at
 * render time in the columns definition.
 */
export const PERMISSION_DROPDOWN_ITEMS: IPermissionDropdownItem[] = [
    {
        key: "edit",
        label: "Modifier",
        hidden: (_, isSuperAdmin) => !isSuperAdmin
    },
    {
        key: "activate",
        label: "Activer",
        hidden: (r, isSuperAdmin) => !isSuperAdmin || r.isActive || r.isDeleted
    },
    {
        key: "deactivate",
        label: "Désactiver",
        hidden: (r, isSuperAdmin) => !isSuperAdmin || !r.isActive
    },
    {
        key: "softDelete",
        label: "Supprimer",
        danger: true,
        hidden: (r, isSuperAdmin) => !isSuperAdmin || r.isDeleted
    },
    {
        key: "restore",
        label: "Restaurer",
        hidden: (r, isSuperAdmin) => !isSuperAdmin || !r.isDeleted
    },
    {
        key: "hardDelete",
        label: "Supprimer définitivement",
        danger: true,
        hidden: (r, isSuperAdmin) => !isSuperAdmin || !r.isDeleted
    }
];
