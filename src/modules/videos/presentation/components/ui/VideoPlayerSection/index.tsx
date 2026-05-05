import { Image } from "antd";
import type { FC } from "react";
import VideoPlayer from "@/shared/presentation/ui/VideoPlayer";
import styles from "../VideoPreview/index.module.scss";

interface IVideoPlayerSectionProps {
    youtubeUrl?: string | null;
    thumbnailUrl?: string | null;
    title: string;
}

/**
 * Player or thumbnail section for the video preview.
 *
 * @component
 *
 * @description
 * Renders a YouTube player if a URL is available,
 * otherwise falls back to a thumbnail image preview.
 */
const VideoPlayerSection: FC<IVideoPlayerSectionProps> = ({ youtubeUrl, thumbnailUrl, title }) => {
    if (youtubeUrl) {
        return (
            <div className={styles.videoPreview__player}>
                <VideoPlayer youtubeUrl={youtubeUrl} poster={thumbnailUrl} />
            </div>
        );
    }

    if (thumbnailUrl) {
        return (
            <div className={styles.videoPreview__cover}>
                <Image width="100%" alt={title} src={thumbnailUrl} preview={{ mask: "Aperçu" }} />
            </div>
        );
    }

    return null;
};

export default VideoPlayerSection;
