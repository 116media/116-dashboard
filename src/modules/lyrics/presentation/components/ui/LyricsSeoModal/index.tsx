import type { FormInstance } from "antd";
import type { FC } from "react";
import LyricsSeoForm from "@/modules/lyrics/presentation/components/forms/LyricsSeoForm";
import type { IUpdateLyricsSeoCredentials } from "@/modules/lyrics/presentation/model/IUpdateLyricsSeoCredentials";
import type { Failure } from "@/shared/domain/failures/failure";
import CreateEditModal from "@/shared/presentation/ui/CreateEditModal";

/**
 * Props for the LyricsSeoModal component.
 *
 * @interface ILyricsSeoModalProps
 * @property {boolean} open - Whether the modal is visible
 * @property {boolean} loading - Loading state for the submit button
 * @property {string | null} success - Success message (shows success view when set)
 * @property {Failure | null | undefined} error - Backend error to display in the form alert
 * @property {FormInstance<IUpdateLyricsSeoCredentials>} form - Ant Design form instance
 * @property {(values: IUpdateLyricsSeoCredentials) => void} onSubmit - Callback when the form is submitted
 * @property {() => void} onCancel - Cancel/close handler
 * @property {() => void} onSuccessClose - Close handler after success
 */
interface ILyricsSeoModalProps {
    open: boolean;
    loading: boolean;
    success: string | null;
    error: Failure | null | undefined;
    form: FormInstance<IUpdateLyricsSeoCredentials>;
    onSubmit: (values: IUpdateLyricsSeoCredentials) => void;
    onCancel: () => void;
    onSuccessClose: () => void;
}

/**
 * Modal for editing lyrics SEO metadata.
 *
 * @component
 *
 * @description
 * Wraps the `LyricsSeoForm` inside a `CreateEditModal` configured
 * in edit mode. Displays a success view when the update completes.
 *
 * @param {ILyricsSeoModalProps} props - Component props
 * @returns {JSX.Element} The SEO edit modal
 */
const LyricsSeoModal: FC<ILyricsSeoModalProps> = ({
    open,
    loading,
    success,
    error,
    form,
    onSubmit,
    onCancel,
    onSuccessClose
}) => {
    return (
        <CreateEditModal
            open={open}
            loading={loading}
            formContext="EDIT"
            success={success}
            onClose={onCancel}
            onSubmit={() => form.submit()}
            title={{ create: "Ajouter le SEO", edit: "Modifier le SEO" }}
            onSuccessClose={onSuccessClose}
        >
            <LyricsSeoForm form={form} error={error} onSubmit={onSubmit} />
        </CreateEditModal>
    );
};

export default LyricsSeoModal;
