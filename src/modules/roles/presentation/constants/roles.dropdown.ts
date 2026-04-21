import type { IRoleEntity } from "@/modules/roles/domain/entities/IRole";
import type { RoleAction } from "@/modules/roles/presentation/components/tables/RolesTable/columns";

interface IRoleDropdownItem {
    key: RoleAction;
    label: string;
    danger?: boolean;
    hidden: (record: IRoleEntity, isSuperAdmin: boolean) => boolean;
}

/**
 * Dropdown menu items for the roles table actions column.
 *
 * @description
 * Static configuration for each action's label, danger state,
 * and visibility logic. The `onClick` handler is wired at
 * render time in the columns definition.
 */
export const ROLE_DROPDOWN_ITEMS: IRoleDropdownItem[] = [
    {
        key: "edit",
        label: "Modifier",
        hidden: (_, isSuperAdmin) => !isSuperAdmin
    },
    {
        key: "managePermissions",
        label: "Gérer les permissions",
        hidden: (r, isSuperAdmin) => !isSuperAdmin || r.isDeleted
    },
    {
        key: "assignPermission",
        label: "Assigner une permission",
        hidden: (r, isSuperAdmin) => !isSuperAdmin || r.isDeleted
    },
    {
        key: "removePermission",
        label: "Retirer une permission",
        hidden: (r, isSuperAdmin) => !isSuperAdmin || r.isDeleted
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
