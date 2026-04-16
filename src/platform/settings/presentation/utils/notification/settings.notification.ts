import type { INotificationConfig } from "@/shared/presentation/utils/notification/notification.utils";

export const SettingsNotification = {
    profileUpdateSuccess: {
        type: "success",
        title: "Profil mis à jour",
        description: "Vos informations ont été mises à jour avec succès."
    } as INotificationConfig,

    avatarUpdateSuccess: {
        type: "success",
        title: "Avatar mis à jour",
        description: "Votre photo de profil a été mise à jour avec succès."
    } as INotificationConfig,

    changePasswordSuccess: {
        type: "success",
        title: "Mot de passe modifié",
        description: "Votre mot de passe a été modifié avec succès."
    } as INotificationConfig,

    sessionRevokeSuccess: {
        type: "success",
        title: "Session révoquée",
        description: "L'appareil a été déconnecté avec succès."
    } as INotificationConfig
} as const;
