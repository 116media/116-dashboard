import type { FormInstance } from "antd";
import { type FC, useEffect } from "react";
import YoutubeUrlForm from "@/modules/videos/presentation/components/forms/YoutubeUrlForm";
import type { IAttachYoutubeUrlCredentials } from "@/modules/videos/presentation/model/IAttachYoutubeUrlCredentials";
import type { Failure } from "@/shared/domain/failures/failure";
import CreateEditModal from "@/shared/presentation/ui/CreateEditModal";

/**
 * Props for the YoutubeUrlModal component.
 *
 * @interface IYoutubeUrlModalProps
 * @property {boolean} open - Whether the modal is visible
 * @property {boolean} loading - Loading state for the submit button
 * @property {string | null} success - Success message (shows success view when set)
 * @property {Failure | null | undefined} error - Backend error to display in the form alert
 * @property {FormInstance<IAttachYoutubeUrlCredentials>} form - Ant Design form instance
 * @property {(values: IAttachYoutubeUrlCredentials) => void} onSubmit - Callback when the form is submitted
 * @property {() => void} onCancel - Cancel/close handler
 * @property {() => void} onSuccessClose - Close handler after success
 */
interface IYoutubeUrlModalProps {
    open: boolean;
    loading: boolean;
    success: string | null;
    error: Failure | null | undefined;
    initialYoutubeVideoUrl?: string | null;
    form: FormInstance<IAttachYoutubeUrlCredentials>;
    onSubmit: (values: IAttachYoutubeUrlCredentials) => void;
    onCancel: () => void;
    onReset?: () => void;
    onSuccessClose: () => void;
}

/**
 * Modal for attaching a YouTube video ID.
 *
 * @component
 *
 * @description
 * Wraps the `YoutubeUrlForm` inside a `CreateEditModal` configured
 * in edit mode. Displays a success view when the attachment completes.
 *
 * @param {IYoutubeUrlModalProps} props - Component props
 * @returns {JSX.Element} The YouTube ID modal
 */
const YoutubeUrlModal: FC<IYoutubeUrlModalProps> = ({
    open,
    loading,
    success,
    error,
    form,
    initialYoutubeVideoUrl,
    onSubmit,
    onCancel,
    onSuccessClose,
    onReset
}) => {
    useEffect(() => {
        if (open && initialYoutubeVideoUrl) {
            form.setFieldsValue({ youtubeVideoUrl: initialYoutubeVideoUrl });
        }
    }, [open, initialYoutubeVideoUrl, form]);

    return (
        <CreateEditModal
            open={open}
            loading={loading}
            formContext="EDIT"
            success={success}
            onClose={onCancel}
            onSubmit={() => form.submit()}
            onSuccessClose={onSuccessClose}
            afterClose={() => {
                form.resetFields();
                onReset?.();
            }}
            title={{ create: "Associer YouTube", edit: "Associer YouTube" }}
        >
            <YoutubeUrlForm form={form} error={error} onSubmit={onSubmit} />
        </CreateEditModal>
    );
};

export default YoutubeUrlModal;
