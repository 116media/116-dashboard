import type { INotificationConfig } from "@/shared/presentation/utils/notification/notification.utils";

/**
 * Authentication notification configurations.
 *
 * @description
 * Predefined notification configurations for authentication-related messages.
 */
export const AuthNotification = {
    /**
     * Success notification for OTP code sent.
     *
     * @description
     * Displays when a verification code has been sent to the user's email.
     */
    otpSentSuccess: {
        type: "success",
        title: "Code envoyé",
        description: "Un nouveau code de vérification a été envoyé à votre adresse e-mail."
    } as INotificationConfig,

    /**
     * Success notification for password reset completion.
     *
     * @description
     * Displays when the user's password has been successfully reset.
     * Informs user to proceed with login.
     */
    passwordResetSuccess: {
        type: "success",
        title: "Mot de passe réinitialisé",
        description:
            "Votre mot de passe a été réinitialisé avec succès. Veuillez vous connecter maintenant."
    } as INotificationConfig
} as const;
