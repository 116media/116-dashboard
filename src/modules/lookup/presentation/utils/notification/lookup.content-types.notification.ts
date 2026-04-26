import type { INotificationConfig } from "@/shared/presentation/utils/notification/notification.utils";

/**
 * Content type notification configurations.
 *
 * @description
 * Predefined notification configurations for content type-related messages.
 * Only success messages are declared here. Error notifications are
 * built at call time from the backend's `Failure.title` / `Failure.detail`.
 */
export const ContentTypesNotification = {
    /**
     * Success notification for content type creation.
     *
     * @description
     * Displays when a new content type has been created successfully.
     */
    createSuccess: {
        type: "success",
        title: "Type créé",
        description: "Le type de contenu a été créé avec succès."
    } as INotificationConfig,

    /**
     * Success notification for content type update.
     *
     * @description
     * Displays when a content type's name has been updated.
     */
    updateSuccess: {
        type: "success",
        title: "Type modifié",
        description: "Le type de contenu a été modifié avec succès."
    } as INotificationConfig,

    /**
     * Success notification for content type activation.
     *
     * @description
     * Displays when an inactive content type has been activated.
     */
    activateSuccess: {
        type: "success",
        title: "Type activé",
        description: "Le type de contenu a été activé avec succès."
    } as INotificationConfig,

    /**
     * Success notification for content type deactivation.
     *
     * @description
     * Displays when an active content type has been deactivated.
     */
    deactivateSuccess: {
        type: "success",
        title: "Type désactivé",
        description: "Le type de contenu a été désactivé avec succès."
    } as INotificationConfig
} as const;
