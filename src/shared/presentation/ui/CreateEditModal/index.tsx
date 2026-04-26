import { Button, Flex, Modal } from "antd";
import type { FC, ReactNode } from "react";
import type { FormContext } from "@/shared/domain/types/pagination";
import FormSuccessResult from "@/shared/presentation/ui/FormSuccessResult";

/**
 * Props for the CreateEditModal component.
 *
 * @interface ICreateEditModalProps
 * @property {boolean} open - Whether the modal is visible
 * @property {boolean} loading - Loading state for the submit button
 * @property {FormContext} formContext - "CREATE" or "EDIT" mode
 * @property {string | null} success - Success message (shows FormSuccessResult when set)
 * @property {() => void} onClose - Closes the modal
 * @property {() => void} onSubmit - Triggers form submission
 * @property {{ create: string; edit: string }} title - Titles for each mode
 * @property {number} [width] - Modal width (default: 590)
 * @property {ReactNode} children - Form content
 * @property {() => void} onSuccessClose - Close handler after success
 */
export interface ICreateEditModalProps {
    open: boolean;
    loading: boolean;
    formContext: FormContext;
    success: string | null;
    onClose: () => void;
    onSubmit: () => void;
    title: { create: string; edit: string };
    width?: number;
    children: ReactNode;
    onSuccessClose: () => void;
}

/**
 * Reusable modal for create and edit operations.
 *
 * @component
 *
 * @description
 * Switches between form view and success view based on the `success` prop.
 * The header renders the context-appropriate title with submit and cancel
 * buttons. Uses `destroyOnClose` to reset form state when the modal closes.
 *
 * @param {ICreateEditModalProps} props - Component props
 * @returns {JSX.Element} The create/edit modal
 */
const CreateEditModal: FC<ICreateEditModalProps> = ({
    open,
    loading,
    formContext,
    success,
    onClose,
    onSubmit,
    title,
    width = 590,
    children,
    onSuccessClose
}) => {
    const modalTitle = formContext === "CREATE" ? title.create : title.edit;

    return (
        <Modal
            centered
            open={open}
            width={width}
            destroyOnHidden
            onCancel={onClose}
            closable={!success}
            title={!success && modalTitle}
            footer={
                !success && (
                    <Flex gap={8} justify="space-between" flex={1}>
                        <Button onClick={onClose} danger>
                            Annuler
                        </Button>
                        <Button type="primary" loading={loading} onClick={onSubmit}>
                            {formContext === "CREATE" ? "Créer" : "Mettre à jour"}
                        </Button>
                    </Flex>
                )
            }
        >
            {success ? <FormSuccessResult title={success} onClose={onSuccessClose} /> : children}
        </Modal>
    );
};

export default CreateEditModal;
