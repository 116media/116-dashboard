import type { FormInstance } from "antd";
import type { FC } from "react";
import VideoSeoForm from "@/modules/videos/presentation/components/forms/VideoSeoForm";
import type { IUpdateVideoSeoCredentials } from "@/modules/videos/presentation/model/IUpdateVideoSeoCredentials";
import type { Failure } from "@/shared/domain/failures/failure";
import CreateEditModal from "@/shared/presentation/ui/CreateEditModal";

/**
 * Props for the VideoSeoModal component.
 *
 * @interface IVideoSeoModalProps
 * @property {boolean} open - Whether the modal is visible
 * @property {boolean} loading - Loading state for the submit button
 * @property {string | null} success - Success message (shows success view when set)
 * @property {Failure | null | undefined} error - Backend error to display in the form alert
 * @property {FormInstance<IUpdateVideoSeoCredentials>} form - Ant Design form instance
 * @property {(values: IUpdateVideoSeoCredentials) => void} onSubmit - Callback when the form is submitted
 * @property {() => void} onCancel - Cancel/close handler
 * @property {() => void} onSuccessClose - Close handler after success
 */
interface IVideoSeoModalProps {
    open: boolean;
    loading: boolean;
    success: string | null;
    error: Failure | null | undefined;
    form: FormInstance<IUpdateVideoSeoCredentials>;
    onSubmit: (values: IUpdateVideoSeoCredentials) => void;
    onCancel: () => void;
    onReset?: () => void;
    onSuccessClose: () => void;
}

/**
 * Modal for editing video SEO metadata.
 *
 * @component
 *
 * @description
 * Wraps the `VideoSeoForm` inside a `CreateEditModal` configured
 * in edit mode. Displays a success view when the update completes.
 *
 * @param {IVideoSeoModalProps} props - Component props
 * @returns {JSX.Element} The SEO edit modal
 */
const VideoSeoModal: FC<IVideoSeoModalProps> = ({
    open,
    loading,
    success,
    error,
    form,
    onSubmit,
    onCancel,
    onSuccessClose,
    onReset
}) => {
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
            title={{ create: "Ajouter le SEO", edit: "Modifier le SEO" }}
        >
            <VideoSeoForm form={form} error={error} onSubmit={onSubmit} />
        </CreateEditModal>
    );
};

export default VideoSeoModal;
