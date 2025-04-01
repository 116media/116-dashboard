import { Button, Result } from "antd";
import type { FC } from "react";

import styles from "./index.module.scss";

/**
 * Props for the FormSuccessResult component.
 *
 * @interface IFormSuccessResultProps
 * @property {string} title - Success message title
 * @property {string} [subtitle] - Optional secondary message
 * @property {() => void} onClose - Callback to close/dismiss the success state
 * @property {string} [closeLabel] - Close button label (default: "Fermer")
 */
export interface IFormSuccessResultProps {
    title: string;
    subtitle?: string;
    onClose: () => void;
    closeLabel?: string;
}

/**
 * Success state displayed after a form submission.
 *
 * @component
 *
 * @description
 * Renders an Ant Design `Result` with success status, title,
 * optional subtitle, and a close button. Used inside `CreateEditModal`
 * to replace the form content after a successful operation.
 *
 * @param {IFormSuccessResultProps} props - Component props
 * @returns {JSX.Element} The success result
 */
const FormSuccessResult: FC<IFormSuccessResultProps> = ({
    title,
    subtitle,
    onClose,
    closeLabel = "Fermer"
}) => {
    return (
        <div className={styles.formSuccessResult}>
            <Result
                status="success"
                title={title}
                subTitle={subtitle}
                extra={
                    <Button type="primary" onClick={onClose}>
                        {closeLabel}
                    </Button>
                }
            />
        </div>
    );
};

export default FormSuccessResult;
