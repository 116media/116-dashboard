import { Button, Flex, Modal, Radio, Upload } from "antd";
import type { FC } from "react";
import { useState } from "react";
import { EnumArticleImageType } from "@/shared/infrastructure/api/generated/116.api";
import { IconInboxOutlined } from "@/shared/presentation/ui/Icons";

/**
 * Props for the ArticleImageUploadModal component.
 *
 * @interface IArticleImageUploadModalProps
 * @property {boolean} open - Whether the modal is visible
 * @property {boolean} loading - Loading state for the upload button
 * @property {string | null} articleId - The article to upload the image for
 * @property {(id: string, file: File, imageType: EnumArticleImageType) => void} onUpload - Callback with article ID, file, and image type
 * @property {() => void} onCancel - Cancel/close handler
 */
interface IArticleImageUploadModalProps {
    open: boolean;
    loading: boolean;
    articleId: string | null;
    onUpload: (id: string, file: File, imageType: EnumArticleImageType) => void;
    onCancel: () => void;
}

/**
 * Modal for uploading an article image.
 *
 * @component
 *
 * @description
 * Renders a file input and an image type selector (Cover or Body).
 * The user selects the image type, picks a file, and clicks upload.
 * The file is passed to the parent via the `onUpload` callback
 * without being automatically uploaded by Ant Design's Upload.
 *
 * @param {IArticleImageUploadModalProps} props - Component props
 * @returns {JSX.Element} The image upload modal
 */
const ArticleImageUploadModal: FC<IArticleImageUploadModalProps> = ({
    open,
    loading,
    articleId,
    onUpload,
    onCancel
}) => {
    const [file, setFile] = useState<File | null>(null);
    const [imageType, setImageType] = useState<EnumArticleImageType>(EnumArticleImageType.Cover);

    const handleUpload = () => {
        if (!articleId || !file) return;
        onUpload(articleId, file, imageType);
    };

    const handleCancel = () => {
        setFile(null);
        setImageType(EnumArticleImageType.Cover);
        onCancel();
    };

    return (
        <Modal
            centered
            open={open}
            width={490}
            destroyOnHidden
            onCancel={handleCancel}
            title="Téléverser une image"
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
            <Flex vertical gap={16}>
                <Radio.Group
                    value={imageType}
                    onChange={(e) => setImageType(e.target.value)}
                    optionType="button"
                    buttonStyle="solid"
                >
                    <Radio.Button value={EnumArticleImageType.Cover}>Couverture</Radio.Button>
                    <Radio.Button value={EnumArticleImageType.Body}>Corps</Radio.Button>
                </Radio.Group>

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
            </Flex>
        </Modal>
    );
};

export default ArticleImageUploadModal;
