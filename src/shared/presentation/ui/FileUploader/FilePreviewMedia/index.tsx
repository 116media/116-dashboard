import { Flex, Image, Skeleton, Typography } from "antd";
import { type FC, type ReactNode, useEffect, useState } from "react";
import { IconFilePdfOutlined } from "@/shared/presentation/ui/Icons";
import VideoPlayer from "@/shared/presentation/ui/VideoPlayer";
import { isImageUrl } from "../utils";
import styles from "./index.module.scss";

const { Text } = Typography;

interface IFilePreviewMediaProps {
    url: string;
    isVideo: boolean;
    label?: string;
    hasMeta: boolean;
    fileName: string | null;
    removeButton: ReactNode;
}

/**
 * Renders the media body of a file preview.
 *
 * @component
 *
 * @description
 * Picks the right renderer for the file kind: a video player for videos, an image with a
 * skeleton placeholder (to avoid layout shift) for images, or a generic file icon otherwise.
 * The image-loading state lives here because it belongs to the image branch.
 */
const FilePreviewMedia: FC<IFilePreviewMediaProps> = ({
    url,
    isVideo,
    label,
    hasMeta,
    fileName,
    removeButton
}) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    // biome-ignore lint/correctness/useExhaustiveDependencies: reset loading state when url changes
    useEffect(() => {
        setImageLoaded(false);
    }, [url]);

    if (isVideo) {
        return <VideoPlayer src={url} maxHeight={400} />;
    }

    if (isImageUrl(url)) {
        return (
            <>
                {!imageLoaded && (
                    <Skeleton.Image active className={styles.filePreviewMedia__skeleton} />
                )}
                <Image
                    src={url}
                    alt={label ?? "Aperçu"}
                    className={styles.filePreviewMedia__image}
                    style={imageLoaded ? undefined : { display: "none" }}
                    onLoad={() => setImageLoaded(true)}
                />
            </>
        );
    }

    return (
        <Flex justify="space-between" align="center">
            <div className={styles.filePreviewMedia__file}>
                <IconFilePdfOutlined className={styles.filePreviewMedia__fileIcon} />
                <Text>{fileName ?? "Fichier sélectionné"}</Text>
            </div>
            {!hasMeta && removeButton}
        </Flex>
    );
};

export default FilePreviewMedia;
