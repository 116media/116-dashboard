import { Flex, Switch, Tag, Typography } from "antd";
import type { FC } from "react";
import type { IVideoEntity } from "@/modules/videos/domain/entities/IVideoEntity";
import {
    IconCalendarOutlined,
    IconSoundOutlined,
    IconStarOutlined
} from "@/shared/presentation/ui/Icons";
import { dayjs } from "@/shared/presentation/utils/dayjs/dayjs.utils";
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
 * Displays read-only toggle for the lyrics flag and a read-only
 * promotion status section showing the active promotion level name
 * and expiry date when promoted.
 */
const VideoMetaOptions: FC<IVideoMetaOptionsProps> = ({ video }) => (
    <div className={styles.metaSidebar__section}>
        <Text type="secondary" strong className={styles.metaSidebar__label}>
            Options
        </Text>
        <Flex vertical gap={8}>
            <Flex justify="space-between" align="center">
                <Flex align="center" gap={6}>
                    <IconSoundOutlined />
                    <Text>A des paroles</Text>
                </Flex>
                <Switch checked={video.hasLyrics} disabled />
            </Flex>
        </Flex>

        <Text
            type="secondary"
            strong
            className={styles.metaSidebar__label}
            style={{ marginTop: 12, display: "block" }}
        >
            Promotion
        </Text>
        <Flex vertical gap={8}>
            <Flex justify="space-between" align="center">
                <Flex align="center" gap={6}>
                    <IconStarOutlined />
                    <Text>Statut</Text>
                </Flex>
                {video.isPromoted ? <Tag color="gold">Promu</Tag> : <Tag>Non promu</Tag>}
            </Flex>
            {video.isPromoted && video.promotionLevelName && (
                <Flex justify="space-between" align="center">
                    <Text type="secondary">Niveau</Text>
                    <Text strong>{video.promotionLevelName}</Text>
                </Flex>
            )}
            {video.isPromoted && video.promotedUntil && (
                <Flex justify="space-between" align="center">
                    <Flex align="center" gap={6}>
                        <IconCalendarOutlined />
                        <Text type="secondary">Expire le</Text>
                    </Flex>
                    <Text>{dayjs(video.promotedUntil).format("DD/MM/YYYY HH:mm")}</Text>
                </Flex>
            )}
        </Flex>
    </div>
);

export default VideoMetaOptions;
