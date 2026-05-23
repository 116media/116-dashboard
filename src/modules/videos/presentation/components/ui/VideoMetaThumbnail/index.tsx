import { Image, Typography } from "antd";
import type { FC } from "react";
import styles from "../VideoMetaSidebar/index.module.scss";

const { Text } = Typography;

interface IVideoMetaThumbnailProps {
    title: string;
    src: string;
}

/**
 * Thumbnail section of the video meta sidebar.
 *
 * @component
 *
 * @description
 * Displays the video thumbnail image with a preview mask
 * and a section label.
 */
const VideoMetaThumbnail: FC<IVideoMetaThumbnailProps> = ({ title, src }) => (
    <div className={styles.metaSidebar__section}>
        <Text type="secondary" strong className={styles.metaSidebar__label}>
            Miniature
        </Text>
        <Image
            alt={title}
            src={src}
            preview={{ mask: "Aperçu" }}
            className={styles.metaSidebar__thumbnail}
        />
    </div>
);

export default VideoMetaThumbnail;
