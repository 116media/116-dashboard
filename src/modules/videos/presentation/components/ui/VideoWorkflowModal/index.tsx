import type { FC } from "react";
import type { IVideoSummaryEntity } from "@/modules/videos/domain/entities/IVideoSummaryEntity";
import VideoRejectModal from "@/modules/videos/presentation/components/ui/VideoRejectModal";
import VideoUnpromoteModal from "@/modules/videos/presentation/components/ui/VideoUnpromoteModal";
import type { VideoAction } from "@/modules/videos/presentation/constants/videos.dropdown";
import { VIDEO_ACTION_CONFIG } from "@/modules/videos/presentation/constants/videos.workflow.config";
import type { IRejectVideoCredentials } from "@/modules/videos/presentation/model/IRejectVideoCredentials";
import type { IUnpromoteVideoCredentials } from "@/modules/videos/presentation/model/IUnpromoteVideoCredentials";
import type { Failure } from "@/shared/domain/failures/failure";
import ActionModal from "@/shared/presentation/ui/ActionModal";

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
 * @property {(values: IRejectVideoCredentials) => void} [onRejectSubmit] - Submit handler for the reject modal
 * @property {(values: IUnpromoteVideoCredentials) => void} [onUnpromoteSubmit] - Submit handler for the unpromote modal
 * @property {() => void} onCancel - Cancel/close handler
 * @property {() => void} [onAfterClose] - Callback invoked after the modal close animation completes
 */
interface IVideoWorkflowModalProps {
    open: boolean;
    action: VideoAction | null;
    video: IVideoSummaryEntity | null;
    loading: boolean;
    error?: Failure | null | undefined;
    onConfirm: () => void;
    onRejectSubmit?: (values: IRejectVideoCredentials) => void;
    onUnpromoteSubmit?: (values: IUnpromoteVideoCredentials) => void;
    onCancel: () => void;
    onAfterClose?: () => void;
}

/**
 * Dispatcher modal for video workflow transitions.
 *
 * @component
 *
 * @description
 * Routes each workflow action to its dedicated modal component.
 * The "reject" action renders `VideoRejectModal`, the "unpromote"
 * action renders `VideoUnpromoteModal`, and all other actions
 * delegate to the shared `ActionModal`.
 *
 * @param {IVideoWorkflowModalProps} props - Component props
 * @returns {JSX.Element | null} The appropriate modal, or null if no config/video
 */
const VideoWorkflowModal: FC<IVideoWorkflowModalProps> = ({
    open,
    action,
    video,
    loading,
    error,
    onConfirm,
    onRejectSubmit,
    onUnpromoteSubmit,
    onCancel,
    onAfterClose
}) => {
    const config = action ? VIDEO_ACTION_CONFIG[action] : undefined;

    if (!config || !video) return null;

    if (action === "reject") {
        return (
            <VideoRejectModal
                open={open}
                loading={loading}
                title={config.title}
                description={config.description}
                confirmLabel={config.confirmLabel}
                error={error ?? null}
                onSubmit={(values) => onRejectSubmit?.(values)}
                onCancel={onCancel}
            />
        );
    }

    if (action === "unpromote") {
        return (
            <VideoUnpromoteModal
                open={open}
                loading={loading}
                title={config.title}
                description={config.description}
                confirmLabel={config.confirmLabel}
                error={error ?? null}
                onSubmit={(values) => onUnpromoteSubmit?.(values)}
                onCancel={onCancel}
            />
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
            onAfterClose={onAfterClose}
            confirmLabel={config.confirmLabel}
            description={config.description}
        />
    );
};

export default VideoWorkflowModal;
