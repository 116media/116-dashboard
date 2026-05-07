import { Button, Flex, Modal } from "antd";
import type { FC } from "react";
import VideoTagsForm from "@/modules/videos/presentation/components/forms/VideoTagsForm";
import FormSuccessResult from "@/shared/presentation/ui/FormSuccessResult";

/**
 * Props for the VideoTagsModal component.
 *
 * @interface IVideoTagsModalProps
 * @property {boolean} open - Whether the modal is visible
 * @property {boolean} loading - Loading state for the submit button
 * @property {string | null} success - Success message (shows success view when set)
 * @property {string[]} tagIds - Currently selected tag identifiers
 * @property {(ids: string[]) => void} onTagsChange - Callback when the tag selection changes
 * @property {() => void} onSubmit - Callback to save the tag selection
 * @property {() => void} onCancel - Cancel/close handler
 * @property {() => void} onSuccessClose - Close handler after success
 */
interface IVideoTagsModalProps {
    open: boolean;
    loading: boolean;
    success: string | null;
    tagIds: string[];
    onTagsChange: (ids: string[]) => void;
    onSubmit: () => void;
    onCancel: () => void;
    onSuccessClose: () => void;
}

/**
 * Modal for editing video tags.
 *
 * @component
 *
 * @description
 * Wraps the `VideoTagsForm` inside a modal with submit and cancel
 * buttons. Displays a success view when the update completes.
 * Uses `destroyOnHidden` to reset state when the modal closes.
 *
 * @param {IVideoTagsModalProps} props - Component props
 * @returns {JSX.Element} The tags edit modal
 */
const VideoTagsModal: FC<IVideoTagsModalProps> = ({
    open,
    loading,
    success,
    tagIds,
    onTagsChange,
    onSubmit,
    onCancel,
    onSuccessClose
}) => {
    return (
        <Modal
            centered
            open={open}
            width={590}
            destroyOnHidden
            onCancel={onCancel}
            closable={!success}
            title={!success && "Modifier les tags"}
            footer={
                success ? null : (
                    <Flex gap={8} justify="space-between" flex={1}>
                        <Button onClick={onCancel} danger>
                            Annuler
                        </Button>
                        <Button type="primary" loading={loading} onClick={onSubmit}>
                            Mettre à jour
                        </Button>
                    </Flex>
                )
            }
        >
            {success ? (
                <FormSuccessResult title={success} onClose={onSuccessClose} />
            ) : (
                <VideoTagsForm tagIds={tagIds} onTagsChange={onTagsChange} />
            )}
        </Modal>
    );
};

export default VideoTagsModal;
