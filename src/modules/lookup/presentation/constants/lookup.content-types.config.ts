import type { ContentTypeAction } from "@/modules/lookup/presentation/constants/lookup.content-types.dropdown";

type ActionConfig = { title: string; description: string; danger: boolean };

/**
 * Action configuration mapping for content type confirmation modals.
 *
 * @description
 * Maps content type action types to their French titles, descriptions,
 * and danger styling. Only actions requiring a confirmation modal
 * are included — actions like "edit" that open separate modals are
 * intentionally omitted.
 */
export const CONTENT_TYPE_ACTION_CONFIG: Partial<Record<ContentTypeAction, ActionConfig>> = {
    activate: {
        title: "Activer le type de contenu",
        description: "Êtes-vous sûr de vouloir activer ce type de contenu ?",
        danger: false
    },
    deactivate: {
        title: "Désactiver le type de contenu",
        description: "Ce type de contenu ne sera plus disponible pour les catégories.",
        danger: false
    }
};
