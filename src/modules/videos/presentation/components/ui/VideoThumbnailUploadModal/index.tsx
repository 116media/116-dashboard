import { Button, Flex, Modal, Upload } from "antd";
import type { FC } from "react";
import { useState } from "react";
import { IconInboxOutlined } from "@/shared/presentation/ui/Icons";

/**
 * Props for the VideoThumbnailUploadModal component.
 *
 * @interface IVideoThumbnailUploadModalProps
 * @property {boolean} open - Whether the modal is visible
 * @property {boolean} loading - Loading state for the upload button
 * @property {string | null} videoId - The video to upload the thumbnail for
 * @property {(id: string, file: File) => void} onUpload - Callback with video ID and file
 * @property {() => void} onCancel - Cancel/close handler
 */
interface IVideoThumbnailUploadModalProps {
    open: boolean;
    loading: boolean;
    videoId: string | null;
    onUpload: (id: string, file: File) => void;
    onCancel: () => void;
}

/**
 * Modal for uploading a video thumbnail.
 *
 * @component
 *
 * @description
 * Renders a file input for selecting a thumbnail image.
 * The user picks a file and clicks upload. The file is passed
 * to the parent via the `onUpload` callback without being
 * automatically uploaded by Ant Design's Upload.
 *
 * @param {IVideoThumbnailUploadModalProps} props - Component props
 * @returns {JSX.Element} The thumbnail upload modal
 */
const VideoThumbnailUploadModal: FC<IVideoThumbnailUploadModalProps> = ({
    open,
    loading,
    videoId,
    onUpload,
    onCancel
}) => {
    const [file, setFile] = useState<File | null>(null);

    const handleUpload = () => {
        if (!videoId || !file) return;
        onUpload(videoId, file);
    };

    const handleCancel = () => {
        setFile(null);
        onCancel();
    };

    return (
        <Modal
            centered
            open={open}
            width={490}
            destroyOnHidden
            onCancel={handleCancel}
            title="Téléverser une vignette"
            footer={
                <Flex gap={8} justify="space-between" flex={1}>
                    <Button onClick={handleCancel} danger>
                        Annuler
                    </Button>
                    <Button
                        type="primary"
                        loading={loading}
                        disabled={!file}
                        onClick={handleUpload}
                    >
                        Téléverser
                    </Button>
                </Flex>
            }
        >
            <Upload
                maxCount={1}
                accept="image/*"
                beforeUpload={(f) => {
                    setFile(f as unknown as File);
                    return false;
                }}
                onRemove={() => setFile(null)}
            >
                <Button icon={<IconInboxOutlined />}>Sélectionner un fichier</Button>
            </Upload>
        </Modal>
    );
};

export default VideoThumbnailUploadModal;
