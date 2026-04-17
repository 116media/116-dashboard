import type { FormInstance } from "antd";
import type { FC } from "react";
import ArticleSeoForm from "@/modules/articles/presentation/components/forms/ArticleSeoForm";
import type { IUpdateArticleSeoCredentials } from "@/modules/articles/presentation/model/IUpdateArticleSeoCredentials";
import type { Failure } from "@/shared/domain/failures/failure";
import CreateEditModal from "@/shared/presentation/ui/CreateEditModal";

/**
 * Props for the ArticleSeoModal component.
 *
 * @interface IArticleSeoModalProps
 * @property {boolean} open - Whether the modal is visible
 * @property {boolean} loading - Loading state for the submit button
 * @property {string | null} success - Success message (shows success view when set)
 * @property {Failure | null | undefined} error - Backend error to display in the form alert
 * @property {FormInstance<IUpdateArticleSeoCredentials>} form - Ant Design form instance
 * @property {(values: IUpdateArticleSeoCredentials) => void} onSubmit - Callback when the form is submitted
 * @property {() => void} onCancel - Cancel/close handler
 * @property {() => void} onSuccessClose - Close handler after success
 */
interface IArticleSeoModalProps {
    open: boolean;
    loading: boolean;
    success: string | null;
    error: Failure | null | undefined;
    form: FormInstance<IUpdateArticleSeoCredentials>;
    onSubmit: (values: IUpdateArticleSeoCredentials) => void;
    onCancel: () => void;
    onSuccessClose: () => void;
}

/**
 * Modal for editing article SEO metadata.
 *
 * @component
 *
 * @description
 * Wraps the `ArticleSeoForm` inside a `CreateEditModal` configured
 * in edit mode. Displays a success view when the update completes.
 *
 * @param {IArticleSeoModalProps} props - Component props
 * @returns {JSX.Element} The SEO edit modal
 */
const ArticleSeoModal: FC<IArticleSeoModalProps> = ({
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
            <ArticleSeoForm form={form} error={error} onSubmit={onSubmit} />
        </CreateEditModal>
    );
};

export default ArticleSeoModal;
