import { Button, Flex, Modal, Upload } from "antd";
import type { FC } from "react";
import { useState } from "react";
import { IconInboxOutlined } from "@/shared/presentation/ui/Icons";

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
 * Renders a file input for selecting a thumbnail image.
 * The user picks a file and clicks upload. The file is passed
 * to the parent via the `onUpload` callback without being
 * automatically uploaded by Ant Design's Upload.
 *
 * @param {IShortThumbnailUploadModalProps} props - Component props
 * @returns {JSX.Element} The thumbnail upload modal
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
            title="T\u00e9l\u00e9verser une miniature"
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
                        T\u00e9l\u00e9verser
                    </Button>
                </Flex>
            }
        >
            <Flex vertical gap={16}>
                <Upload
                    maxCount={1}
                    accept="image/*"
                    beforeUpload={(f) => {
                        setFile(f as unknown as File);
                        return false;
                    }}
                    onRemove={() => setFile(null)}
                >
                    <Button icon={<IconInboxOutlined />}>S\u00e9lectionner un fichier</Button>
                </Upload>
            </Flex>
        </Modal>
    );
};

export default ShortThumbnailUploadModal;
