import type { INotificationConfig } from "@/shared/presentation/utils/notification/notification.utils";

/**
 * Category notification configurations.
 *
 * @description
 * Predefined notification configurations for category-related messages.
 * Only success messages are declared here. Error notifications are
 * built at call time from the backend's `Failure.title` / `Failure.detail`.
 */
export const CategoriesNotification = {
    /**
     * Success notification for category creation.
     *
     * @description
     * Displays when a new category has been created successfully.
     */
    createSuccess: {
        type: "success",
        title: "Catégorie créée",
        description: "La catégorie a été créée avec succès."
    } as INotificationConfig,

    /**
     * Success notification for category update.
     *
     * @description
     * Displays when a category has been updated successfully.
     */
    updateSuccess: {
        type: "success",
        title: "Catégorie modifiée",
        description: "La catégorie a été modifiée avec succès."
    } as INotificationConfig,

    /**
     * Success notification for category activation.
     *
     * @description
     * Displays when an inactive category has been activated.
     */
    activateSuccess: {
        type: "success",
        title: "Catégorie activée",
        description: "La catégorie a été activée avec succès."
    } as INotificationConfig,

    /**
     * Success notification for category deactivation.
     *
     * @description
     * Displays when an active category has been deactivated.
     */
    deactivateSuccess: {
        type: "success",
        title: "Catégorie désactivée",
        description: "La catégorie a été désactivée avec succès."
    } as INotificationConfig,

    /**
     * Success notification for adding a pricing tier to a category.
     *
     * @description
     * Displays when a pricing tier has been added to a category.
     */
    addPricingSuccess: {
        type: "success",
        title: "Tarification ajoutée",
        description: "La tarification a été ajoutée à la catégorie avec succès."
    } as INotificationConfig,

    /**
     * Success notification for updating a category pricing entry.
     *
     * @description
     * Displays when a category pricing entry has been updated.
     */
    updatePricingSuccess: {
        type: "success",
        title: "Tarification modifiée",
        description: "La tarification de la catégorie a été modifiée avec succès."
    } as INotificationConfig,

    /**
     * Success notification for removing a pricing tier from a category.
     *
     * @description
     * Displays when a pricing tier has been removed from a category.
     */
    removePricingSuccess: {
        type: "success",
        title: "Tarification supprimée",
        description: "La tarification a été supprimée de la catégorie avec succès."
    } as INotificationConfig
} as const;
