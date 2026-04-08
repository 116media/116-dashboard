import type { INotificationConfig } from "@/shared/presentation/utils/notification/notification.utils";

/**
 * Customer notification configurations.
 *
 * @description
 * Predefined notification configurations for customer-related messages.
 * Only success messages are declared here. Error notifications are
 * built at call time from the backend's `Failure.title` / `Failure.detail`.
 */
export const CustomersNotification = {
    /**
     * Success notification for customer creation.
     *
     * @description
     * Displays when a new customer has been created successfully.
     */
    createSuccess: {
        type: "success",
        title: "Client créé",
        description: "Le client a été créé avec succès."
    } as INotificationConfig,

    /**
     * Success notification for customer update.
     *
     * @description
     * Displays when a customer has been updated successfully.
     */
    updateSuccess: {
        type: "success",
        title: "Client modifié",
        description: "Le client a été modifié avec succès."
    } as INotificationConfig
} as const;
