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
    } as INotificationConfig
} as const;
