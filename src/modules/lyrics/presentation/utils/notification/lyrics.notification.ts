import type { INotificationConfig } from "@/shared/presentation/utils/notification/notification.utils";

/**
 * Lyrics notification configurations.
 *
 * @description
 * Predefined notification configurations for lyrics-related messages.
 * Only success messages are declared here. Error notifications are
 * built at call time from the backend's `Failure.title` / `Failure.detail`.
 */
export const LyricsNotification = {
    /**
     * Success notification for lyrics creation.
     *
     * @description
     * Displays when new lyrics have been created successfully.
     */
    createSuccess: {
        type: "success",
        title: "Paroles créées",
        description: "Les paroles ont été créées avec succès."
    } as INotificationConfig,

    /**
     * Success notification for lyrics update.
     *
     * @description
     * Displays when lyrics have been updated successfully.
     */
    updateSuccess: {
        type: "success",
        title: "Paroles modifiées",
        description: "Les paroles ont été modifiées avec succès."
    } as INotificationConfig,

    /**
     * Success notification for lyrics SEO update.
     *
     * @description
     * Displays when SEO metadata has been updated for lyrics.
     */
    updateSeoSuccess: {
        type: "success",
        title: "SEO mis à jour",
        description: "Les informations SEO ont été mises à jour."
    } as INotificationConfig
} as const;
