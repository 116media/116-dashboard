import type { PermissionAction } from "@/modules/permissions/presentation/components/tables/PermissionsTable/columns";

type ActionConfig = { title: string; description: string; danger: boolean };

/**
 * Action configuration mapping for permission confirmation modals.
 *
 * @description
 * Maps permission action types to their French titles, descriptions,
 * and danger styling. Only actions requiring a confirmation modal
 * are included — "edit" is intentionally omitted as it opens a
 * separate form modal.
 */
export const PERMISSION_ACTION_CONFIG: Partial<Record<PermissionAction, ActionConfig>> = {
    activate: {
        title: "Activer la permission",
        description: "Êtes-vous sûr de vouloir activer cette permission ?",
        danger: false
    },
    deactivate: {
        title: "Désactiver la permission",
        description: "Les rôles avec cette permission perdront l'accès associé.",
        danger: false
    },
    softDelete: {
        title: "Supprimer la permission",
        description:
            "La permission sera désactivée et marquée comme supprimée. Cette action est réversible.",
        danger: true
    },
    hardDelete: {
        title: "Supprimer définitivement",
        description:
            "Cette action est irréversible. La permission et toutes ses associations seront supprimées.",
        danger: true
    },
    restore: {
        title: "Restaurer la permission",
        description: "La permission sera restaurée et pourra être réactivée.",
        danger: false
    }
};
