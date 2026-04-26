import type { PricingTierAction } from "@/modules/lookup/presentation/constants/lookup.pricing-tiers.dropdown";

type ActionConfig = { title: string; description: string; danger: boolean };

/**
 * Action configuration mapping for pricing tier confirmation modals.
 *
 * @description
 * Maps pricing tier action types to their French titles, descriptions,
 * and danger styling. Only actions requiring a confirmation modal
 * are included — actions like "edit" that open separate modals are
 * intentionally omitted.
 */
export const PRICING_TIER_ACTION_CONFIG: Partial<Record<PricingTierAction, ActionConfig>> = {
    activate: {
        title: "Activer le niveau tarifaire",
        description: "Êtes-vous sûr de vouloir activer ce niveau tarifaire ?",
        danger: false
    },
    deactivate: {
        title: "Désactiver le niveau tarifaire",
        description: "Ce niveau tarifaire ne sera plus disponible pour la tarification.",
        danger: false
    }
};
