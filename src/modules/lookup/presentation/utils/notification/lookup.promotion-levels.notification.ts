import type { INotificationConfig } from "@/shared/presentation/utils/notification/notification.utils";

/**
 * Promotion level notification configurations.
 *
 * @description
 * Predefined notification configurations for promotion level-related messages.
 * Only success messages are declared here. Error notifications are
 * built at call time from the backend's `Failure.title` / `Failure.detail`.
 */
export const PromotionLevelsNotification = {
    /**
     * Success notification for promotion level creation.
     *
     * @description
     * Displays when a new promotion level has been created successfully.
     */
    createSuccess: {
        type: "success",
        title: "Promotion créée",
        description: "Le niveau de promotion a été créé avec succès."
    } as INotificationConfig,

    /**
     * Success notification for promotion level update.
     *
     * @description
     * Displays when a promotion level's details have been updated.
     */
    updateSuccess: {
        type: "success",
        title: "Promotion modifiée",
        description: "Le niveau de promotion a été modifié avec succès."
    } as INotificationConfig,

    /**
     * Success notification for promotion level activation.
     *
     * @description
     * Displays when an inactive promotion level has been activated.
     */
    activateSuccess: {
        type: "success",
        title: "Promotion activée",
        description: "Le niveau de promotion a été activé avec succès."
    } as INotificationConfig,

    /**
     * Success notification for promotion level deactivation.
     *
     * @description
     * Displays when an active promotion level has been deactivated.
     */
    deactivateSuccess: {
        type: "success",
        title: "Promotion désactivée",
        description: "Le niveau de promotion a été désactivé avec succès."
    } as INotificationConfig
} as const;
