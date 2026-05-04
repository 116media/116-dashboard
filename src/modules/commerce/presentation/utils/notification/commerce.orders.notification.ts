import type { INotificationConfig } from "@/shared/presentation/utils/notification/notification.utils";

/**
 * Order notification configurations.
 *
 * @description
 * Predefined notification configurations for order-related messages.
 * Only success messages are declared here. Error notifications are
 * built at call time from the backend's `Failure.title` / `Failure.detail`.
 */
export const OrdersNotification = {
    /**
     * Success notification for order creation.
     *
     * @description
     * Displays when a new order has been created successfully.
     */
    createSuccess: {
        type: "success",
        title: "Commande créée",
        description: "La commande a été créée avec succès."
    } as INotificationConfig,

    /**
     * Success notification for adding an item to an order.
     *
     * @description
     * Displays when a content item has been added to an order.
     */
    addItemSuccess: {
        type: "success",
        title: "Produit ajouté",
        description: "Le produit a été ajouté à la commande avec succès."
    } as INotificationConfig,

    /**
     * Success notification for adding a pricing tier to an item.
     *
     * @description
     * Displays when a pricing tier has been attached to an order item.
     */
    addTierSuccess: {
        type: "success",
        title: "Tranche ajoutée",
        description: "La tranche tarifaire a été ajoutée avec succès."
    } as INotificationConfig,

    /**
     * Success notification for order submission.
     *
     * @description
     * Displays when a draft order has been submitted for payment.
     */
    submitSuccess: {
        type: "success",
        title: "Commande soumise",
        description: "La commande a été soumise avec succès."
    } as INotificationConfig,

    /**
     * Success notification for order cancellation.
     *
     * @description
     * Displays when an order has been cancelled.
     */
    cancelSuccess: {
        type: "success",
        title: "Commande annulée",
        description: "La commande a été annulée avec succès."
    } as INotificationConfig,

    /**
     * Success notification for order editing.
     *
     * @description
     * Displays when a draft order has been edited successfully.
     */
    editOrderSuccess: {
        type: "success",
        title: "Commande modifiée",
        description: "La commande a été modifiée avec succès."
    } as INotificationConfig,

    /**
     * Success notification for removing an item from an order.
     *
     * @description
     * Displays when a content item has been removed from an order.
     */
    removeItemSuccess: {
        type: "success",
        title: "Produit supprimé",
        description: "Le produit a été supprimé de la commande."
    } as INotificationConfig,

    /**
     * Success notification for removing a tier from an item.
     *
     * @description
     * Displays when a pricing tier has been removed from an order item.
     */
    removeTierSuccess: {
        type: "success",
        title: "Tranche supprimée",
        description: "La tranche tarifaire a été supprimée."
    } as INotificationConfig,

    /**
     * Success notification for editing an item.
     *
     * @description
     * Displays when a content item has been edited successfully.
     */
    editItemSuccess: {
        type: "success",
        title: "Produit modifié",
        description: "Le produit a été modifié avec succès."
    } as INotificationConfig
} as const;
