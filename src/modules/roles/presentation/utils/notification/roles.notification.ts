import type { INotificationConfig } from "@/shared/presentation/utils/notification/notification.utils";

/**
 * Role notification configurations.
 *
 * @description
 * Predefined notification configurations for role-related messages.
 * Only success messages are declared here. Error notifications are
 * built at call time from the backend's `Failure.title` / `Failure.detail`.
 */
export const RolesNotification = {
    /**
     * Success notification for role creation.
     *
     * @description
     * Displays when a new role has been created successfully.
     */
    createSuccess: {
        type: "success",
        title: "Rôle créé",
        description: "Le rôle a été créé avec succès."
    } as INotificationConfig,

    /**
     * Success notification for role update.
     *
     * @description
     * Displays when a role's name or description has been updated.
     */
    updateSuccess: {
        type: "success",
        title: "Rôle modifié",
        description: "Le rôle a été modifié avec succès."
    } as INotificationConfig,

    /**
     * Success notification for role activation.
     *
     * @description
     * Displays when an inactive role has been activated.
     */
    activateSuccess: {
        type: "success",
        title: "Rôle activé",
        description: "Le rôle a été activé avec succès."
    } as INotificationConfig,

    /**
     * Success notification for role deactivation.
     *
     * @description
     * Displays when an active role has been deactivated.
     */
    deactivateSuccess: {
        type: "success",
        title: "Rôle désactivé",
        description: "Le rôle a été désactivé avec succès."
    } as INotificationConfig,

    /**
     * Success notification for role soft deletion.
     *
     * @description
     * Displays when a role has been soft-deleted (reversible).
     */
    softDeleteSuccess: {
        type: "success",
        title: "Rôle supprimé",
        description: "Le rôle a été supprimé avec succès."
    } as INotificationConfig,

    /**
     * Success notification for role permanent deletion.
     *
     * @description
     * Displays when a role has been permanently removed from the system.
     */
    hardDeleteSuccess: {
        type: "success",
        title: "Rôle supprimé définitivement",
        description: "Le rôle a été supprimé de manière permanente."
    } as INotificationConfig,

    /**
     * Success notification for role restoration.
     *
     * @description
     * Displays when a soft-deleted role has been restored.
     */
    restoreSuccess: {
        type: "success",
        title: "Rôle restauré",
        description: "Le rôle a été restauré avec succès."
    } as INotificationConfig,

    /**
     * Success notification for permission assignment.
     *
     * @description
     * Displays when a permission has been assigned to a role.
     */
    assignPermissionSuccess: {
        type: "success",
        title: "Permission assignée",
        description: "La permission a été assignée au rôle avec succès."
    } as INotificationConfig,

    /**
     * Success notification for permission removal.
     *
     * @description
     * Displays when a permission has been removed from a role.
     */
    removePermissionSuccess: {
        type: "success",
        title: "Permission retirée",
        description: "La permission a été retirée du rôle avec succès."
    } as INotificationConfig
} as const;
