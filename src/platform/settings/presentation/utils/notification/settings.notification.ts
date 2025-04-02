import type { INotificationConfig } from "@/shared/presentation/utils/notification/notification.utils";

/**
 * Settings notification configurations.
 *
 * @description
 * Predefined notification configurations for settings-related messages.
 * Only success messages are declared here. Error notifications are
 * built at call time from the backend's `Failure.title` / `Failure.detail`.
 */
export const SettingsNotification = {
    /**
     * Success notification for profile update.
     *
     * @description
     * Displays when the user's account information has been updated.
     */
    profileUpdateSuccess: {
        type: "success",
        title: "Profil mis à jour",
        description: "Vos informations ont été mises à jour avec succès."
    } as INotificationConfig,

    /**
     * Success notification for avatar update.
     *
     * @description
     * Displays when the user's profile photo has been changed.
     */
    avatarUpdateSuccess: {
        type: "success",
        title: "Avatar mis à jour",
        description: "Votre photo de profil a été mise à jour avec succès."
    } as INotificationConfig,

    /**
     * Success notification for password change.
     *
     * @description
     * Displays when the user's password has been changed successfully.
     */
    changePasswordSuccess: {
        type: "success",
        title: "Mot de passe modifié",
        description: "Votre mot de passe a été modifié avec succès."
    } as INotificationConfig,

    /**
     * Success notification for session revocation.
     *
     * @description
     * Displays when a login session has been revoked and the device disconnected.
     */
    sessionRevokeSuccess: {
        type: "success",
        title: "Session révoquée",
        description: "L'appareil a été déconnecté avec succès."
    } as INotificationConfig
} as const;
