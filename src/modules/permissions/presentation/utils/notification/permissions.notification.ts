import type { INotificationConfig } from "@/shared/presentation/utils/notification/notification.utils";

/**
 * Permission notification configurations.
 *
 * @description
 * Predefined notification configurations for permission-related messages.
 * Only success messages are declared here. Error notifications are
 * built at call time from the backend's `Failure.title` / `Failure.detail`.
 */
export const PermissionsNotification = {
    /**
     * Success notification for permission creation.
     *
     * @description
     * Displays when a new permission has been created successfully.
     */
    createSuccess: {
        type: "success",
        title: "Permission créée",
        description: "La permission a été créée avec succès."
    } as INotificationConfig,

    /**
     * Success notification for permission update.
     *
     * @description
     * Displays when a permission's resource, action, or description has been updated.
     */
    updateSuccess: {
        type: "success",
        title: "Permission modifiée",
        description: "La permission a été modifiée avec succès."
    } as INotificationConfig,

    /**
     * Success notification for permission activation.
     *
     * @description
     * Displays when an inactive permission has been activated.
     */
    activateSuccess: {
        type: "success",
        title: "Permission activée",
        description: "La permission a été activée avec succès."
    } as INotificationConfig,

    /**
     * Success notification for permission deactivation.
     *
     * @description
     * Displays when an active permission has been deactivated.
     */
    deactivateSuccess: {
        type: "success",
        title: "Permission désactivée",
        description: "La permission a été désactivée avec succès."
    } as INotificationConfig,

    /**
     * Success notification for permission soft deletion.
     *
     * @description
     * Displays when a permission has been soft-deleted (reversible).
     */
    softDeleteSuccess: {
        type: "success",
        title: "Permission supprimée",
        description: "La permission a été supprimée avec succès."
    } as INotificationConfig,

    /**
     * Success notification for permission permanent deletion.
     *
     * @description
     * Displays when a permission has been permanently removed from the system.
     */
    hardDeleteSuccess: {
        type: "success",
        title: "Permission supprimée définitivement",
        description: "La permission a été supprimée de manière permanente."
    } as INotificationConfig,

    /**
     * Success notification for permission restoration.
     *
     * @description
     * Displays when a soft-deleted permission has been restored.
     */
    restoreSuccess: {
        type: "success",
        title: "Permission restaurée",
        description: "La permission a été restaurée avec succès."
    } as INotificationConfig
} as const;
