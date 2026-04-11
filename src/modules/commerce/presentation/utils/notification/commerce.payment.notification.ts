import type { INotificationConfig } from "@/shared/presentation/utils/notification/notification.utils";

/**
 * Payment notification configurations.
 *
 * @description
 * Predefined notification configurations for payment-related messages.
 * Only success messages are declared here. Error notifications are
 * built at call time from the backend's `Failure.title` / `Failure.detail`.
 */
export const PaymentNotification = {
    /**
     * Success notification for attaching a payment proof.
     *
     * @description
     * Displays when a payment proof file has been attached to an order.
     */
    attachProofSuccess: {
        type: "success",
        title: "Preuve attachée",
        description: "La preuve de paiement a été attachée avec succès."
    } as INotificationConfig,

    /**
     * Success notification for payment verification.
     *
     * @description
     * Displays when a payment has been verified by an admin.
     */
    verifySuccess: {
        type: "success",
        title: "Paiement vérifié",
        description: "Le paiement a été vérifié avec succès."
    } as INotificationConfig,

    /**
     * Success notification for payment rejection.
     *
     * @description
     * Displays when a payment has been rejected by an admin.
     */
    rejectSuccess: {
        type: "success",
        title: "Paiement rejeté",
        description: "Le paiement a été rejeté avec succès."
    } as INotificationConfig
} as const;
