import { Button, Flex, Form, Modal, Typography } from "antd";
import type { FC } from "react";
import type { IVideoSummaryEntity } from "@/modules/videos/domain/entities/IVideoSummaryEntity";
import VideoRejectForm from "@/modules/videos/presentation/components/forms/VideoRejectForm";
import type { VideoAction } from "@/modules/videos/presentation/constants/videos.dropdown";
import { VIDEO_ACTION_CONFIG } from "@/modules/videos/presentation/constants/videos.workflow.config";
import type { IRejectVideoCredentials } from "@/modules/videos/presentation/model/IRejectVideoCredentials";
import type { Failure } from "@/shared/domain/failures/failure";
import ActionModal from "@/shared/presentation/ui/ActionModal";

const { Paragraph } = Typography;

/**
 * Props for the VideoWorkflowModal component.
 *
 * @interface IVideoWorkflowModalProps
 * @property {boolean} open - Whether the modal is visible
 * @property {VideoAction | null} action - The workflow action type
 * @property {IVideoSummaryEntity | null} video - The video being acted upon
 * @property {boolean} loading - Loading state for the confirm button
 * @property {Failure | null | undefined} error - Backend error to display
 * @property {() => void} onConfirm - Confirm handler for non-reject actions
 * @property {(values: IRejectVideoCredentials) => void} [onRejectSubmit] - Submit handler for the reject form
 * @property {() => void} onCancel - Cancel/close handler
 */
interface IVideoWorkflowModalProps {
    open: boolean;
    action: VideoAction | null;
    video: IVideoSummaryEntity | null;
    loading: boolean;
    error?: Failure | null | undefined;
    onConfirm: () => void;
    onRejectSubmit?: (values: IRejectVideoCredentials) => void;
    onCancel: () => void;
}

/**
 * Confirmation modal for video workflow transitions.
 *
 * @component
 *
 * @description
 * Maps video action types to French titles, descriptions, and danger
 * styling via `VIDEO_ACTION_CONFIG`. For most actions, delegates
 * rendering to the shared `ActionModal`. For the "reject" action,
 * renders a custom modal with an inline `VideoRejectForm` to
 * capture the rejection reason before confirming.
 *
 * @param {IVideoWorkflowModalProps} props - Component props
 * @returns {JSX.Element | null} The workflow modal, or null if no config/video
 */
const VideoWorkflowModal: FC<IVideoWorkflowModalProps> = ({
    open,
    action,
    video,
    loading,
    error,
    onConfirm,
    onRejectSubmit,
    onCancel
}) => {
    const [rejectForm] = Form.useForm<IRejectVideoCredentials>();
    const config = action ? VIDEO_ACTION_CONFIG[action] : undefined;

    if (!config || !video) return null;

    if (action === "reject") {
        const handleRejectSubmit = (values: IRejectVideoCredentials) => {
            onRejectSubmit?.(values);
        };

        return (
            <Modal open={open} centered title={config.title} footer={null} onCancel={onCancel}>
                <Paragraph type="secondary">{config.description}</Paragraph>

                <VideoRejectForm
                    form={rejectForm}
                    error={error ?? null}
                    onSubmit={handleRejectSubmit}
                />

                <Flex justify="end" gap={8} style={{ marginTop: 16 }}>
                    <Button onClick={onCancel} danger>
                        Annuler
                    </Button>
                    <Button
                        type="primary"
                        danger
                        loading={loading}
                        onClick={() => rejectForm.submit()}
                    >
                        {config.confirmLabel}
                    </Button>
                </Flex>
            </Modal>
        );
    }

    return (
        <ActionModal
            open={open}
            error={error ?? null}
            loading={loading}
            onCancel={onCancel}
            title={config.title}
            onConfirm={onConfirm}
            danger={config.danger}
            confirmLabel={config.confirmLabel}
            description={config.description}
        />
    );
};

export default VideoWorkflowModal;
