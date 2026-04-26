import type { INotificationConfig } from "@/shared/presentation/utils/notification/notification.utils";

/**
 * Pricing tier notification configurations.
 *
 * @description
 * Predefined notification configurations for pricing tier-related messages.
 * Only success messages are declared here. Error notifications are
 * built at call time from the backend's `Failure.title` / `Failure.detail`.
 */
export const PricingTiersNotification = {
    /**
     * Success notification for pricing tier creation.
     *
     * @description
     * Displays when a new pricing tier has been created successfully.
     */
    createSuccess: {
        type: "success",
        title: "Niveau créé",
        description: "Le niveau tarifaire a été créé avec succès."
    } as INotificationConfig,

    /**
     * Success notification for pricing tier update.
     *
     * @description
     * Displays when a pricing tier's details have been updated.
     */
    updateSuccess: {
        type: "success",
        title: "Niveau modifié",
        description: "Le niveau tarifaire a été modifié avec succès."
    } as INotificationConfig,

    /**
     * Success notification for pricing tier activation.
     *
     * @description
     * Displays when an inactive pricing tier has been activated.
     */
    activateSuccess: {
        type: "success",
        title: "Niveau activé",
        description: "Le niveau tarifaire a été activé avec succès."
    } as INotificationConfig,

    /**
     * Success notification for pricing tier deactivation.
     *
     * @description
     * Displays when an active pricing tier has been deactivated.
     */
    deactivateSuccess: {
        type: "success",
        title: "Niveau désactivé",
        description: "Le niveau tarifaire a été désactivé avec succès."
    } as INotificationConfig
} as const;
