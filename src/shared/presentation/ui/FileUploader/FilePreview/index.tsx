import { Button, Flex, Image, Typography } from "antd";
import type { FC } from "react";
import { IconCloseCircleOutlined, IconFilePdfOutlined } from "@/shared/presentation/ui/Icons";
import { isImageUrl } from "../utils";
import styles from "./index.module.scss";

const { Text } = Typography;

interface IFilePreviewProps {
    url: string;
    fileName: string | null;
    fileSize: string | null;
    label?: string;
    disabled?: boolean;
    onRemove: () => void;
}

/**
 * Preview panel for an uploaded or selected file.
 *
 * @component
 *
 * @description
 * Displays an image preview with lightbox for image files,
 * or a PDF/file icon with the file name for non-image files.
 * Includes file metadata and a remove button.
 */
const FilePreview: FC<IFilePreviewProps> = ({
    url,
    fileName,
    fileSize,
    label,
    disabled = false,
    onRemove
}) => {
    const isImage = isImageUrl(url);
    const hasMeta = fileName || fileSize;

    const removeButton = (
        <Button
            danger
            size="small"
            variant="outlined"
            onClick={onRemove}
            disabled={disabled}
            icon={<IconCloseCircleOutlined />}
        />
    );

    return (
        <Flex vertical gap={8} className={styles.filePreview}>
            {hasMeta && (
                <Flex justify="space-between" align="center" className={styles.filePreview__meta}>
                    <Flex
                        gap={2}
                        align="center"
                        justify="space-between"
                        className={styles.filePreview__metaInfo}
                    >
                        {fileName && (
                            <Text strong ellipsis className={styles.filePreview__fileName}>
                                {fileName}
                            </Text>
                        )}
                        {fileSize && (
                            <Text type="secondary" className={styles.filePreview__fileSize}>
                                {fileSize}
                            </Text>
                        )}
                    </Flex>
                    {removeButton}
                </Flex>
            )}

            {!hasMeta && <Flex justify="flex-end">{removeButton}</Flex>}

            {isImage ? (
                <Image src={url} alt={label ?? "Aperçu"} className={styles.filePreview__image} />
            ) : (
                <Flex justify="space-between" align="center">
                    <div className={styles.filePreview__file}>
                        <IconFilePdfOutlined className={styles.filePreview__fileIcon} />
                        <Text>{fileName ?? "Fichier sélectionné"}</Text>
                    </div>
                    {!hasMeta && removeButton}
                </Flex>
            )}
        </Flex>
    );
};

export default FilePreview;
