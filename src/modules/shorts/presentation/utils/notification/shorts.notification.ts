import type { INotificationConfig } from "@/shared/presentation/utils/notification/notification.utils";

/**
 * Short video notification configurations.
 *
 * @description
 * Predefined notification configurations for short video-related messages.
 * Only success messages are declared here. Error notifications are
 * built at call time from the backend's `Failure.title` / `Failure.detail`.
 */
export const ShortsNotification = {
    /**
     * Success notification for short video creation.
     *
     * @description
     * Displays when a new short video has been created successfully.
     */
    createSuccess: {
        type: "success",
        title: "Court-m\u00e9trage cr\u00e9\u00e9",
        description: "Le court-m\u00e9trage a \u00e9t\u00e9 cr\u00e9\u00e9 avec succ\u00e8s."
    } as INotificationConfig,

    /**
     * Success notification for short video activation.
     *
     * @description
     * Displays when a short video has been activated.
     */
    activateSuccess: {
        type: "success",
        title: "Court-m\u00e9trage activ\u00e9",
        description: "Le court-m\u00e9trage a \u00e9t\u00e9 activ\u00e9 avec succ\u00e8s."
    } as INotificationConfig,

    /**
     * Success notification for short video deactivation.
     *
     * @description
     * Displays when a short video has been deactivated.
     */
    deactivateSuccess: {
        type: "success",
        title: "Court-m\u00e9trage d\u00e9sactiv\u00e9",
        description: "Le court-m\u00e9trage a \u00e9t\u00e9 d\u00e9sactiv\u00e9 avec succ\u00e8s."
    } as INotificationConfig,

    /**
     * Success notification for short video deletion.
     *
     * @description
     * Displays when a short video has been permanently deleted.
     */
    deleteSuccess: {
        type: "success",
        title: "Court-m\u00e9trage supprim\u00e9",
        description: "Le court-m\u00e9trage a \u00e9t\u00e9 supprim\u00e9 d\u00e9finitivement."
    } as INotificationConfig,

    /**
     * Success notification for short video thumbnail upload.
     *
     * @description
     * Displays when a thumbnail has been uploaded for a short video.
     */
    uploadThumbnailSuccess: {
        type: "success",
        title: "Miniature t\u00e9l\u00e9vers\u00e9e",
        description: "La miniature a \u00e9t\u00e9 t\u00e9l\u00e9vers\u00e9e avec succ\u00e8s."
    } as INotificationConfig
} as const;
