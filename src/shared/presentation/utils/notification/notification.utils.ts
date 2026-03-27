import { notification } from "antd";

/**
 * Notification configuration interface.
 *
 * @interface INotificationConfig
 * @property {string} type - Notification type (success, error, info, warning)
 * @property {string} message - Notification title/message
 * @property {string} description - Notification description/body text
 * @property {number} duration - Display duration in seconds (optional, defaults to 5)
 */
export interface INotificationConfig {
    type: "success" | "error" | "info" | "warning";
    message: string;
    description: string;
    duration?: number;
}

/**
 * Shows a notification using the global notification API.
 *
 * @param {INotificationConfig} config - Notification configuration
 *
 * @description
 * Displays a notification with the specified configuration.
 * Uses global notification API to ensure notifications persist across page navigation.
 * Default placement is topRight, default duration is 5 seconds.
 */
export const showNotification = (config: INotificationConfig): void => {
    notification[config.type]({
        placement: "topRight",
        message: config.message,
        description: config.description,
        duration: config.duration ?? 5
    });
};
