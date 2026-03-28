import type { INotificationConfig } from "@/shared/presentation/utils/notification/notification.utils";

export const SettingsNotification = {
    profileUpdateSuccess: {
        type: "success",
        message: "Profil mis à jour",
        description: "Vos informations ont été mises à jour avec succès."
    } as INotificationConfig,

    avatarUpdateSuccess: {
        type: "success",
        message: "Avatar mis à jour",
        description: "Votre photo de profil a été mise à jour avec succès."
    } as INotificationConfig,

    changePasswordSuccess: {
        type: "success",
        message: "Mot de passe modifié",
        description: "Votre mot de passe a été modifié avec succès."
    } as INotificationConfig,

    sessionRevokeSuccess: {
        type: "success",
        message: "Session révoquée",
        description: "L'appareil a été déconnecté avec succès."
    } as INotificationConfig,

    signOutError: {
        type: "error",
        message: "Erreur de déconnexion",
        description: "Une erreur est survenue lors de la déconnexion. Veuillez réessayer."
    } as INotificationConfig
} as const;
