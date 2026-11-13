import { Flex, Image, Skeleton, Typography } from "antd";
import { type FC, Fragment, type ReactNode, useEffect, useState } from "react";
import { IconFilePdfOutlined, IconPlaySquareOutlined } from "@/shared/presentation/ui/Icons";
import VideoPlayer from "@/shared/presentation/ui/VideoPlayer";
import { isImageUrl } from "../utils";
import styles from "./index.module.scss";

const { Text } = Typography;

interface IFilePreviewMediaProps {
    url: string;
    isVideo: boolean;
    isImage: boolean;
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
    isImage,
    label,
    hasMeta,
    fileName,
    removeButton
}) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [videoReady, setVideoReady] = useState(false);

    // biome-ignore lint/correctness/useExhaustiveDependencies: reset loading state when url changes
    useEffect(() => {
        setImageLoaded(false);
        setVideoReady(false);
        if (!isVideo) return;

        // Fallback reveal so the player is never permanently hidden if the ready event is missed.
        const timeout = setTimeout(() => setVideoReady(true), 4000);
        return () => clearTimeout(timeout);
    }, [url, isVideo]);

    if (isVideo) {
        return (
            <Fragment>
                {!videoReady && (
                    <Skeleton.Node active className={styles.filePreviewMedia__skeleton}>
                        <IconPlaySquareOutlined className={styles.filePreviewMedia__skeletonIcon} />
                    </Skeleton.Node>
                )}
                <div style={videoReady ? undefined : { display: "none" }}>
                    <VideoPlayer src={url} maxHeight={400} onReady={() => setVideoReady(true)} />
                </div>
            </Fragment>
        );
    }

    if (isImage || isImageUrl(url)) {
        return (
            <Fragment>
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
            </Fragment>
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
