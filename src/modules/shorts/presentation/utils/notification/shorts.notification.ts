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
        title: "Réel créé",
        description: "Le réel a été créé avec succès."
    } as INotificationConfig,

    /**
     * Success notification for short video activation.
     *
     * @description
     * Displays when a short video has been activated.
     */
    activateSuccess: {
        type: "success",
        title: "Réel activé",
        description: "Le réel a été activé avec succès."
    } as INotificationConfig,

    /**
     * Success notification for short video deactivation.
     *
     * @description
     * Displays when a short video has been deactivated.
     */
    deactivateSuccess: {
        type: "success",
        title: "Réel désactivé",
        description: "Le réel a été désactivé avec succès."
    } as INotificationConfig,

    /**
     * Success notification for short video deletion.
     *
     * @description
     * Displays when a short video has been permanently deleted.
     */
    deleteSuccess: {
        type: "success",
        title: "Réel supprimé",
        description: "Le réel a été supprimé définitivement."
    } as INotificationConfig,

    /**
     * Success notification for short video thumbnail upload.
     *
     * @description
     * Displays when a thumbnail has been uploaded for a short video.
     */
    uploadThumbnailSuccess: {
        type: "success",
        title: "Miniature uploadée",
        description: "La miniature a été uploadée avec succès."
    } as INotificationConfig
} as const;
