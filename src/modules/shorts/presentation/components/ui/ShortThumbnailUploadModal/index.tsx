import { Button, Flex, Modal } from "antd";
import type { FC } from "react";
import { useCallback, useState } from "react";
import FileUploader from "@/shared/presentation/ui/FileUploader";
import { IMAGE_PRESET } from "@/shared/presentation/ui/FileUploader/presets";

/**
 * Props for the ShortThumbnailUploadModal component.
 *
 * @interface IShortThumbnailUploadModalProps
 * @property {boolean} open - Whether the modal is visible
 * @property {boolean} loading - Loading state for the upload button
 * @property {string | null} shortId - The short video to upload the thumbnail for
 * @property {(id: string, file: File) => void} onUpload - Callback with short ID and file
 * @property {() => void} onCancel - Cancel/close handler
 */
interface IShortThumbnailUploadModalProps {
    open: boolean;
    loading: boolean;
    shortId: string | null;
    onUpload: (id: string, file: File) => void;
    onCancel: () => void;
}

/**
 * Modal for uploading a short video thumbnail.
 *
 * @component
 *
 * @description
 * Renders the shared FileUploader in deferred mode for selecting
 * a thumbnail image with optional cropping. The user picks and
 * crops a file, then clicks upload to submit.
 */
const ShortThumbnailUploadModal: FC<IShortThumbnailUploadModalProps> = ({
    open,
    loading,
    shortId,
    onUpload,
    onCancel
}) => {
    const [file, setFile] = useState<File | null>(null);

    const handleUpload = () => {
        if (!shortId || !file) return;
        onUpload(shortId, file);
    };

    const handleCancel = useCallback(() => {
        setFile(null);
        onCancel();
    }, [onCancel]);

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
                        loading={loading}
                        disabled={!file}
                        onClick={handleUpload}
                    >
                        Importer
                    </Button>
                </Flex>
            }
        >
            <FileUploader
                mode="deferred"
                preset={IMAGE_PRESET}
                aspectRatio={1}
                onFileSelect={setFile}
                onRemove={() => setFile(null)}
            />
        </Modal>
    );
};

export default ShortThumbnailUploadModal;
