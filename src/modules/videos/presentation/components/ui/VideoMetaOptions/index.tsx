import { Flex, Switch, Typography } from "antd";
import type { FC } from "react";
import type { IVideoEntity } from "@/modules/videos/domain/entities/IVideoEntity";
import styles from "../VideoMetaSidebar/index.module.scss";

const { Text } = Typography;

interface IVideoMetaOptionsProps {
    video: IVideoEntity;
}

/**
 * Options section of the video meta sidebar.
 *
 * @component
 *
 * @description
 * Displays read-only toggle switches for video options
 * such as the featured placement and lyrics flags.
 */
const VideoMetaOptions: FC<IVideoMetaOptionsProps> = ({ video }) => (
    <div className={styles.metaSidebar__section}>
        <Text type="secondary" strong className={styles.metaSidebar__label}>
            Options
        </Text>
        <Flex vertical gap={8}>
            <Flex justify="space-between" align="center">
                <Text>En vedette</Text>
                <Switch checked={video.isFeatured} disabled />
            </Flex>
            <Flex justify="space-between" align="center">
                <Text>A des paroles</Text>
                <Switch checked={video.hasLyrics} disabled />
            </Flex>
        </Flex>
    </div>
);

export default VideoMetaOptions;
