import type { INotificationConfig } from "@/shared/presentation/utils/notification/notification.utils";

/**
 * FileUploader notification configurations.
 *
 * @description
 * Centralized notification messages for the shared FileUploader component, so the
 * component never hardcodes user-facing strings inline. Mirrors the per-module
 * notification convention. Messages with dynamic content are exposed as functions
 * that build the config from their arguments.
 */
export const FileUploaderNotification = {
    /**
     * Error notification shown when a selected file exceeds the preset's size limit.
     *
     * @param fileSize - Human-readable size of the rejected file
     * @param maxSize - Human-readable maximum allowed size
     * @returns The notification configuration
     */
    fileTooLarge: (fileSize: string, maxSize: string): INotificationConfig => ({
        type: "error",
        title: "Fichier trop volumineux",
        description: `Le fichier fait ${fileSize}, la taille maximale est de ${maxSize}.`
    })
} as const;
