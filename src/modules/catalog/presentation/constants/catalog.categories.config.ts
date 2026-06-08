import type { CategoryAction } from "@/modules/catalog/presentation/constants/catalog.categories.dropdown";

type ActionConfig = { title: string; description: string; confirmLabel: string; danger: boolean };

/**
 * Action configuration mapping for category confirmation modals.
 *
 * @description
 * Maps category action types to their French titles, descriptions,
 * confirm button labels, and danger styling. Only actions requiring
 * a confirmation modal are included — actions like "edit" that open
 * separate modals are intentionally omitted.
 */
export const CATEGORY_ACTION_CONFIG: Partial<Record<CategoryAction, ActionConfig>> = {
    activate: {
        title: "Activer la catégorie",
        description: "Êtes-vous sûr de vouloir activer cette catégorie ?",
        confirmLabel: "Activer",
        danger: false
    },
    deactivate: {
        title: "Désactiver la catégorie",
        description: "Êtes-vous sûr de vouloir désactiver cette catégorie ?",
        confirmLabel: "Désactiver",
        danger: true
    },
    setExclusive: {
        title: "Définir comme émission exclusive",
        description:
            "Êtes-vous sûr de vouloir définir cette catégorie comme émission exclusive ? L'émission exclusive actuelle sera automatiquement remplacée.",
        confirmLabel: "Définir",
        danger: false
    }
};
