import type { INotificationConfig } from "@/shared/presentation/utils/notification/notification.utils";

/**
 * Package notification configurations.
 *
 * @description
 * Predefined notification configurations for package-related messages.
 * Only success messages are declared here. Error notifications are
 * built at call time from the backend's `Failure.title` / `Failure.detail`.
 */
export const PackagesNotification = {
    /**
     * Success notification for package creation.
     *
     * @description
     * Displays when a new package has been created successfully.
     */
    createSuccess: {
        type: "success",
        title: "Package créé",
        description: "Le package a été créé avec succès."
    } as INotificationConfig,

    /**
     * Success notification for package activation.
     *
     * @description
     * Displays when an inactive package has been activated.
     */
    activateSuccess: {
        type: "success",
        title: "Package activé",
        description: "Le package a été activé avec succès."
    } as INotificationConfig,

    /**
     * Success notification for package deactivation.
     *
     * @description
     * Displays when an active package has been deactivated.
     */
    deactivateSuccess: {
        type: "success",
        title: "Package désactivé",
        description: "Le package a été désactivé avec succès."
    } as INotificationConfig,

    /**
     * Success notification for adding a slot to a package.
     *
     * @description
     * Displays when a slot has been added to a package.
     */
    addSlotSuccess: {
        type: "success",
        title: "Slot ajouté",
        description: "Le slot a été ajouté au package avec succès."
    } as INotificationConfig,

    /**
     * Success notification for removing a slot from a package.
     *
     * @description
     * Displays when a slot has been removed from a package.
     */
    removeSlotSuccess: {
        type: "success",
        title: "Slot supprimé",
        description: "Le slot a été supprimé du package avec succès."
    } as INotificationConfig
} as const;
