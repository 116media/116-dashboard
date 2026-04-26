import { Button, Flex, Modal, Typography } from "antd";
import type { FC } from "react";
import type { Failure } from "@/shared/domain/failures/failure";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";

import styles from "./index.module.scss";

const { Paragraph } = Typography;

/**
 * Props for the ActionModal component.
 *
 * @interface IActionModalProps
 * @property {boolean} open - Whether the modal is visible
 * @property {boolean} loading - Loading state for the confirm button
 * @property {string} title - Modal title (e.g. "Désactiver le rôle")
 * @property {string} [description] - Explanation text
 * @property {boolean} [danger] - Renders confirm button in red
 * @property {string} [confirmLabel] - Confirm button label (default: "Confirmer")
 * @property {Failure | null | undefined} error - Error from backend displayed via ErrorAlert
 * @property {() => void} onConfirm - Confirm handler
 * @property {() => void} onCancel - Cancel/close handler
 */
export interface IActionModalProps {
    open: boolean;
    loading: boolean;
    title: string;
    description?: string;
    danger?: boolean;
    confirmLabel?: string;
    error: Failure | null | undefined;
    onConfirm: () => void;
    onCancel: () => void;
}

/**
 * Confirmation modal for status-change and delete actions.
 *
 * @component
 *
 * @description
 * Displays a confirmation dialog with an optional description,
 * error alert (from backend `Failure`), and confirm/cancel buttons.
 * The confirm button turns red when `danger` is true.
 *
 * @param {IActionModalProps} props - Component props
 * @returns {JSX.Element} The action modal
 */
const ActionModal: FC<IActionModalProps> = ({
    open,
    loading,
    title,
    description,
    danger,
    confirmLabel = "Confirmer",
    error,
    onConfirm,
    onCancel
}) => {
    return (
        <Modal open={open} centered title={title} footer={null} onCancel={onCancel}>
            <ErrorAlert error={error} banner showIcon closable={false} />

            {description && <Paragraph type="secondary">{description}</Paragraph>}

            <Flex justify="end" gap={8} className={styles.actionModal__footer}>
                <Button onClick={onCancel} danger>
                    Annuler
                </Button>
                <Button type="primary" danger={danger} loading={loading} onClick={onConfirm}>
                    {confirmLabel}
                </Button>
            </Flex>
        </Modal>
    );
};

export default ActionModal;
