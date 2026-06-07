import { Button, Flex, Form, Modal, Typography } from "antd";
import type { FC } from "react";
import VideoRejectForm from "@/modules/videos/presentation/components/forms/VideoRejectForm";
import type { IRejectVideoCredentials } from "@/modules/videos/presentation/model/IRejectVideoCredentials";
import type { Failure } from "@/shared/domain/failures/failure";

const { Paragraph } = Typography;

/**
 * Props for the VideoRejectModal component.
 *
 * @interface IVideoRejectModalProps
 * @property {boolean} open - Whether the modal is visible
 * @property {boolean} loading - Loading state for the confirm button
 * @property {string} title - Modal title
 * @property {string} description - Explanation text shown below the title
 * @property {string} confirmLabel - Label for the confirm button
 * @property {Failure | null | undefined} error - Backend error to display in the form
 * @property {(values: IRejectVideoCredentials) => void} onSubmit - Submit handler for the rejection form
 * @property {() => void} onCancel - Cancel/close handler
 */
interface IVideoRejectModalProps {
    open: boolean;
    loading: boolean;
    title: string;
    description: string;
    confirmLabel: string;
    error: Failure | null | undefined;
    onSubmit: (values: IRejectVideoCredentials) => void;
    onCancel: () => void;
}

/**
 * Modal for rejecting a video with a required reason.
 *
 * @component
 *
 * @description
 * Renders a centered modal with a `VideoRejectForm` for capturing
 * the rejection reason. The footer triggers form submission via `form.submit()`.
 *
 * @param {IVideoRejectModalProps} props - Component props
 * @returns {JSX.Element} The rendered rejection modal
 */
const VideoRejectModal: FC<IVideoRejectModalProps> = ({
    open,
    loading,
    title,
    description,
    confirmLabel,
    error,
    onSubmit,
    onCancel
}) => {
    const [form] = Form.useForm<IRejectVideoCredentials>();

    return (
        <Modal
            centered
            open={open}
            onCancel={onCancel}
            title={title}
            footer={
                <Flex gap={8} justify="space-between" flex={1}>
                    <Button danger onClick={onCancel}>
                        Annuler
                    </Button>
                    <Button danger type="primary" loading={loading} onClick={() => form.submit()}>
                        {confirmLabel}
                    </Button>
                </Flex>
            }
        >
            <Paragraph type="secondary">{description}</Paragraph>

            <VideoRejectForm form={form} error={error} onSubmit={onSubmit} />
        </Modal>
    );
};

export default VideoRejectModal;
