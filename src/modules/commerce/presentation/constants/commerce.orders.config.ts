import type { OrderAction } from "@/modules/commerce/presentation/constants/commerce.orders.dropdown";

type ActionConfig = { title: string; description: string; confirmLabel: string; danger: boolean };

/**
 * Action configuration mapping for order confirmation modals.
 *
 * @description
 * Maps order action types to their French titles, descriptions,
 * confirm button labels, and danger styling. Only actions requiring
 * a confirmation modal are included — actions like "view" that
 * navigate directly are intentionally omitted.
 */
export const ORDER_ACTION_CONFIG: Partial<Record<OrderAction, ActionConfig>> = {
    submit: {
        title: "Soumettre la commande",
        description: "Êtes-vous sûr de vouloir soumettre cette commande pour paiement ?",
        confirmLabel: "Soumettre",
        danger: false
    },
    cancel: {
        title: "Annuler la commande",
        description: "Êtes-vous sûr de vouloir annuler cette commande ?",
        confirmLabel: "Annuler",
        danger: true
    }
};
