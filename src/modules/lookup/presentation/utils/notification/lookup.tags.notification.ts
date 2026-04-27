import type { INotificationConfig } from "@/shared/presentation/utils/notification/notification.utils";

/**
 * Tag notification configurations.
 *
 * @description
 * Predefined notification configurations for tag-related messages.
 * Only success messages are declared here. Error notifications are
 * built at call time from the backend's `Failure.title` / `Failure.detail`.
 */
export const TagsNotification = {
    /**
     * Success notification for tag creation.
     *
     * @description
     * Displays when a new tag has been created successfully.
     */
    createSuccess: {
        type: "success",
        title: "Tag créé",
        description: "Le tag a été créé avec succès."
    } as INotificationConfig,

    /**
     * Success notification for tag update.
     *
     * @description
     * Displays when a tag has been updated successfully.
     */
    updateSuccess: {
        type: "success",
        title: "Tag modifié",
        description: "Le tag a été modifié avec succès."
    } as INotificationConfig,

    /**
     * Success notification for tag deletion.
     *
     * @description
     * Displays when a tag has been permanently deleted.
     */
    deleteSuccess: {
        type: "success",
        title: "Tag supprimé",
        description: "Le tag a été supprimé avec succès."
    } as INotificationConfig
} as const;
