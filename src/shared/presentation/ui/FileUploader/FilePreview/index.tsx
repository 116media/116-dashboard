import { Button, Flex, Image, Skeleton, Typography } from "antd";
import { type FC, useEffect, useState } from "react";
import { IconCloseCircleOutlined, IconFilePdfOutlined } from "@/shared/presentation/ui/Icons";
import { isImageUrl } from "../utils";
import styles from "./index.module.scss";

const { Text } = Typography;

interface IFilePreviewProps {
    url: string;
    label?: string;
    disabled?: boolean;
    onRemove: () => void;
    fileName: string | null;
    fileSize: string | null;
}

/**
 * Preview panel for an uploaded or selected file.
 *
 * @component
 *
 * @description
 * Displays an image preview with lightbox for image files,
 * or a PDF/file icon with the file name for non-image files.
 * Shows an animated skeleton placeholder while the image loads
 * to avoid layout shift. Includes file metadata and a remove button.
 */
const FilePreview: FC<IFilePreviewProps> = ({
    url,
    label,
    fileName,
    fileSize,
    disabled = false,
    onRemove
}) => {
    const isImage = isImageUrl(url);
    const hasMeta = fileName || fileSize;
    const [imageLoaded, setImageLoaded] = useState(false);

    // biome-ignore lint/correctness/useExhaustiveDependencies: reset loading state when url changes
    useEffect(() => {
        setImageLoaded(false);
    }, [url]);

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
                <>
                    {!imageLoaded && (
                        <Skeleton.Image active className={styles.filePreview__skeleton} />
                    )}
                    <Image
                        src={url}
                        alt={label ?? "Aperçu"}
                        className={styles.filePreview__image}
                        style={imageLoaded ? undefined : { display: "none" }}
                        onLoad={() => setImageLoaded(true)}
                    />
                </>
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
