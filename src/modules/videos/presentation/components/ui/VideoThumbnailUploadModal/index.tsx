import { Button, Flex, Form, Modal } from "antd";
import type { FC } from "react";
import { useCallback, useState } from "react";
import FileUploader from "@/shared/presentation/ui/FileUploader";
import { IMAGE_PRESET } from "@/shared/presentation/ui/FileUploader/presets";

/**
 * Props for the VideoThumbnailUploadModal component.
 *
 * @interface IVideoThumbnailUploadModalProps
 * @property {boolean} open - Whether the modal is visible
 * @property {boolean} loading - Loading state for the upload button
 * @property {string | null} videoId - The video to upload the thumbnail for
 * @property {string | null | undefined} currentThumbnailUrl - Existing thumbnail URL to prefill
 * @property {(id: string, file: File) => Promise<void>} onUpload - Callback with video ID and file
 * @property {() => void} onCancel - Cancel/close handler
 */
interface IVideoThumbnailUploadModalProps {
    open: boolean;
    loading: boolean;
    videoId: string | null;
    currentThumbnailUrl?: string | null;
    onUpload: (id: string, file: File) => Promise<boolean>;
    onCancel: () => void;
}

/**
 * Modal for uploading a video thumbnail.
 *
 * @component
 *
 * @description
 * Renders the shared FileUploader in deferred mode for selecting
 * a thumbnail image with optional cropping. The user picks and
 * crops a file, then clicks upload to submit.
 */
const VideoThumbnailUploadModal: FC<IVideoThumbnailUploadModalProps> = ({
    open,
    loading,
    videoId,
    currentThumbnailUrl,
    onUpload,
    onCancel
}) => {
    const [file, setFile] = useState<File | null>(null);

    const handleCancel = useCallback(() => {
        setFile(null);
        onCancel();
    }, [onCancel]);

    const handleUpload = async () => {
        if (!videoId || !file) return;
        const success = await onUpload(videoId, file);
        if (success) handleCancel();
    };

    return (
        <Modal
            centered
            open={open}
            width={490}
            destroyOnHidden
            onCancel={handleCancel}
            title="Importer une miniature"
            footer={
                <Flex gap={8} justify="space-between" flex={1}>
                    <Button onClick={handleCancel} danger>
                        Annuler
                    </Button>
                    <Button
                        type="primary"
                        disabled={!file}
                        loading={loading}
                        onClick={handleUpload}
                    >
                        Importer
                    </Button>
                </Flex>
            }
        >
            <Form layout="vertical" size="large">
                <Form.Item label="Miniature">
                    <div>
                        <FileUploader
                            mode="deferred"
                            aspectRatio={16 / 9}
                            preset={IMAGE_PRESET}
                            value={currentThumbnailUrl}
                            onRemove={() => setFile(null)}
                            onFileSelect={setFile}
                        />
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default VideoThumbnailUploadModal;
