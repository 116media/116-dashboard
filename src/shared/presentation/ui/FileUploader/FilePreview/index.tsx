import { Button, Flex, Typography } from "antd";
import type { FC } from "react";
import { IconCloseCircleOutlined } from "@/shared/presentation/ui/Icons";
import FilePreviewMedia from "../FilePreviewMedia";
import styles from "./index.module.scss";

const { Text } = Typography;

interface IFilePreviewProps {
    url: string;
    label?: string;
    disabled?: boolean;
    isVideo?: boolean;
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
 * Shows file metadata and a remove button, then delegates the media body (video player, image,
 * or file icon) to <see cref="FilePreviewMedia" />.
 */
const FilePreview: FC<IFilePreviewProps> = ({
    url,
    label,
    fileName,
    fileSize,
    isVideo = false,
    disabled = false,
    onRemove
}) => {
    const hasMeta = Boolean(fileName || fileSize);

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

            <FilePreviewMedia
                url={url}
                label={label}
                isVideo={isVideo}
                hasMeta={hasMeta}
                fileName={fileName}
                removeButton={removeButton}
            />
        </Flex>
    );
};

export default FilePreview;
