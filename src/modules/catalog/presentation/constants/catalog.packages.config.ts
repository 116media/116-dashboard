import type { PackageAction } from "@/modules/catalog/presentation/constants/catalog.packages.dropdown";

type ActionConfig = { title: string; description: string; confirmLabel: string; danger: boolean };

/**
 * Action configuration mapping for package confirmation modals.
 *
 * @description
 * Maps package action types to their French titles, descriptions,
 * confirm button labels, and danger styling. Only actions requiring
 * a confirmation modal are included.
 */
export const PACKAGE_ACTION_CONFIG: Partial<Record<PackageAction, ActionConfig>> = {
    activate: {
        title: "Activer le package",
        description: "Êtes-vous sûr de vouloir activer ce package ?",
        confirmLabel: "Activer",
        danger: false
    },
    deactivate: {
        title: "Désactiver le package",
        description: "Êtes-vous sûr de vouloir désactiver ce package ?",
        confirmLabel: "Désactiver",
        danger: true
    }
};
