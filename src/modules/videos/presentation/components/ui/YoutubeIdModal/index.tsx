import type { FormInstance } from "antd";
import { type FC, useEffect } from "react";
import YoutubeIdForm from "@/modules/videos/presentation/components/forms/YoutubeIdForm";
import type { IAttachYoutubeIdCredentials } from "@/modules/videos/presentation/model/IAttachYoutubeIdCredentials";
import type { Failure } from "@/shared/domain/failures/failure";
import CreateEditModal from "@/shared/presentation/ui/CreateEditModal";

/**
 * Props for the YoutubeIdModal component.
 *
 * @interface IYoutubeIdModalProps
 * @property {boolean} open - Whether the modal is visible
 * @property {boolean} loading - Loading state for the submit button
 * @property {string | null} success - Success message (shows success view when set)
 * @property {Failure | null | undefined} error - Backend error to display in the form alert
 * @property {FormInstance<IAttachYoutubeIdCredentials>} form - Ant Design form instance
 * @property {(values: IAttachYoutubeIdCredentials) => void} onSubmit - Callback when the form is submitted
 * @property {() => void} onCancel - Cancel/close handler
 * @property {() => void} onSuccessClose - Close handler after success
 */
interface IYoutubeIdModalProps {
    open: boolean;
    loading: boolean;
    success: string | null;
    error: Failure | null | undefined;
    form: FormInstance<IAttachYoutubeIdCredentials>;
    initialYoutubeId?: string | null;
    onSubmit: (values: IAttachYoutubeIdCredentials) => void;
    onCancel: () => void;
    onSuccessClose: () => void;
}

/**
 * Modal for attaching a YouTube video ID.
 *
 * @component
 *
 * @description
 * Wraps the `YoutubeIdForm` inside a `CreateEditModal` configured
 * in edit mode. Displays a success view when the attachment completes.
 *
 * @param {IYoutubeIdModalProps} props - Component props
 * @returns {JSX.Element} The YouTube ID modal
 */
const YoutubeIdModal: FC<IYoutubeIdModalProps> = ({
    open,
    loading,
    success,
    error,
    form,
    initialYoutubeId,
    onSubmit,
    onCancel,
    onSuccessClose
}) => {
    useEffect(() => {
        if (open && initialYoutubeId) {
            form.setFieldsValue({ youtubeVideoId: initialYoutubeId });
        }
    }, [open, initialYoutubeId, form]);

    return (
        <CreateEditModal
            open={open}
            loading={loading}
            formContext="EDIT"
            success={success}
            onClose={onCancel}
            onSubmit={() => form.submit()}
            title={{ create: "Associer YouTube", edit: "Associer YouTube" }}
            onSuccessClose={onSuccessClose}
        >
            <YoutubeIdForm form={form} error={error} onSubmit={onSubmit} />
        </CreateEditModal>
    );
};

export default YoutubeIdModal;
