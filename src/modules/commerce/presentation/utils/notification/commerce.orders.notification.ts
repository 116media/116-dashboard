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
        title: "Article ajouté",
        description: "L'article a été ajouté à la commande avec succès."
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
    } as INotificationConfig
} as const;
