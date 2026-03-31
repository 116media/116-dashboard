import { Alert } from "antd";
import type { FC, MouseEventHandler } from "react";
import type { Failure } from "@/shared/domain/failures/failure";
import { IconCloseCircleOutlined } from "@/shared/presentation/ui/Icons";

import styles from "./index.module.scss";

/**
 * Props for the ErrorAlert component.
 *
 * @interface IErrorAlertProps
 * @property {boolean} banner - Whether to display as a banner without borders
 * @property {boolean} showIcon - Whether to show the error icon
 * @property {boolean} closable - Whether the alert can be dismissed
 * @property {Failure | undefined | null} error - The error object to display
 * @property {MouseEventHandler<HTMLButtonElement>} onClose - Callback when the alert is closed
 */
export interface IErrorAlertProps {
    banner: boolean;
    showIcon: boolean;
    closable: boolean;
    error: Failure | undefined | null;
    onClose?: MouseEventHandler<HTMLButtonElement>;
}

/**
 * Error alert component for displaying API error messages.
 *
 * @component
 *
 * @description
 * Displays error messages from API responses in a user-friendly alert format.
 * Shows the error title and detail from a Failure object.
 * Renders nothing if no error is provided.
 *
 * @returns {JSX.Element | null} The error alert or null if no error
 */
const ErrorAlert: FC<IErrorAlertProps> = ({ error, closable, banner, showIcon, onClose }) => {
    return (
        error && (
            <Alert
                type="error"
                banner={banner}
                showIcon={showIcon}
                className={styles.errorAlert}
                closable={
                    closable
                        ? {
                              "aria-label": "close",
                              closeIcon: <IconCloseCircleOutlined />,
                              onClose
                          }
                        : false
                }
                title={error?.title}
                description={error?.detail}
            />
        )
    );
};

export default ErrorAlert;
