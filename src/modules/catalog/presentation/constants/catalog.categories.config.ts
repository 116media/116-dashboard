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
        title: "Mettre en exclusivité",
        description:
            "Cette catégorie deviendra le contenu exclusif de l'accueil et remplacera la catégorie exclusive actuelle.",
        confirmLabel: "Confirmer",
        danger: false
    },
    pinToFeed: {
        title: "Épingler au fil d'actualité",
        description:
            "Cette catégorie apparaîtra comme une section du fil d'actualité avec ses dernières vidéos. Une fois la limite atteinte, la plus ancienne est automatiquement détachée.",
        confirmLabel: "Épingler",
        danger: false
    },
    unpinFromFeed: {
        title: "Détacher du fil d'actualité",
        description: "Cette catégorie ne sera plus affichée comme section du fil d'actualité.",
        confirmLabel: "Détacher",
        danger: true
    }
};
