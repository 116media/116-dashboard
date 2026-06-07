import { Button, Flex, Form, Modal, Typography } from "antd";
import type { FC } from "react";
import VideoUnpromoteForm from "@/modules/videos/presentation/components/forms/VideoUnpromoteForm";
import type { IUnpromoteVideoCredentials } from "@/modules/videos/presentation/model/IUnpromoteVideoCredentials";
import type { Failure } from "@/shared/domain/failures/failure";

const { Paragraph } = Typography;

/**
 * Props for the VideoUnpromoteModal component.
 *
 * @interface IVideoUnpromoteModalProps
 * @property {boolean} open - Whether the modal is visible
 * @property {boolean} loading - Loading state for the confirm button
 * @property {string} title - Modal title
 * @property {string} description - Explanation text shown below the title
 * @property {string} confirmLabel - Label for the confirm button
 * @property {Failure | null | undefined} error - Backend error to display in the form
 * @property {(values: IUnpromoteVideoCredentials) => void} onSubmit - Submit handler for the unpromote form
 * @property {() => void} onCancel - Cancel/close handler
 */
interface IVideoUnpromoteModalProps {
    open: boolean;
    loading: boolean;
    title: string;
    description: string;
    confirmLabel: string;
    error: Failure | null | undefined;
    onSubmit: (values: IUnpromoteVideoCredentials) => void;
    onCancel: () => void;
}

/**
 * Modal for removing the promotion of a video with a required audit reason.
 *
 * @component
 *
 * @description
 * Renders a centered modal with a `VideoUnpromoteForm` for capturing
 * the audit reason. The footer triggers form submission via `form.submit()`.
 *
 * @param {IVideoUnpromoteModalProps} props - Component props
 * @returns {JSX.Element} The rendered unpromote modal
 */
const VideoUnpromoteModal: FC<IVideoUnpromoteModalProps> = ({
    open,
    loading,
    title,
    description,
    confirmLabel,
    error,
    onSubmit,
    onCancel
}) => {
    const [form] = Form.useForm<IUnpromoteVideoCredentials>();

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

            <VideoUnpromoteForm form={form} error={error} onSubmit={onSubmit} />
        </Modal>
    );
};

export default VideoUnpromoteModal;
