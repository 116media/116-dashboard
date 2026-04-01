import type { RoleAction } from "@/modules/roles/presentation/components/tables/RolesTable/columns";

type ActionConfig = { title: string; description: string; danger: boolean };

/**
 * Action configuration mapping for role confirmation modals.
 *
 * @description
 * Maps role action types to their French titles, descriptions,
 * and danger styling. Only actions requiring a confirmation modal
 * are included — actions like "edit" or "managePermissions" that
 * open separate modals are intentionally omitted.
 */
export const ROLE_ACTION_CONFIG: Partial<Record<RoleAction, ActionConfig>> = {
    activate: {
        title: "Activer le rôle",
        description: "Êtes-vous sûr de vouloir activer ce rôle ?",
        danger: false
    },
    deactivate: {
        title: "Désactiver le rôle",
        description: "Les utilisateurs avec ce rôle perdront les permissions associées.",
        danger: false
    },
    softDelete: {
        title: "Supprimer le rôle",
        description:
            "Le rôle sera désactivé et marqué comme supprimé. Cette action est réversible.",
        danger: true
    },
    hardDelete: {
        title: "Supprimer définitivement",
        description:
            "Cette action est irréversible. Le rôle et toutes ses associations seront supprimés.",
        danger: true
    },
    restore: {
        title: "Restaurer le rôle",
        description: "Le rôle sera restauré et pourra être réactivé.",
        danger: false
    }
};
