import type { PromotionLevelAction } from "@/modules/lookup/presentation/constants/lookup.promotion-levels.dropdown";

type ActionConfig = { title: string; description: string; danger: boolean };

/**
 * Action configuration mapping for promotion level confirmation modals.
 *
 * @description
 * Maps promotion level action types to their French titles, descriptions,
 * and danger styling. Only actions requiring a confirmation modal
 * are included — actions like "edit" that open separate modals are
 * intentionally omitted.
 */
export const PROMOTION_LEVEL_ACTION_CONFIG: Partial<Record<PromotionLevelAction, ActionConfig>> = {
    activate: {
        title: "Activer le niveau de promotion",
        description: "Êtes-vous sûr de vouloir activer ce niveau de promotion ?",
        danger: false
    },
    deactivate: {
        title: "Désactiver le niveau de promotion",
        description: "Ce niveau de promotion ne sera plus disponible pour les commandes.",
        danger: false
    }
};
