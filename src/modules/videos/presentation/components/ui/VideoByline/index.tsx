import { Flex, Tag, Typography } from "antd";
import type { FC } from "react";
import type { IVideoEntity } from "@/modules/videos/domain/entities/IVideoEntity";
import { IconCalendarOutlined } from "@/shared/presentation/ui/Icons";
import { dayjs } from "@/shared/presentation/utils/dayjs/dayjs.utils";
import styles from "../VideoPreview/index.module.scss";

const { Text } = Typography;

interface IVideoBylineProps {
    video: IVideoEntity;
}

/**
 * Byline bar for the video preview.
 *
 * @component
 *
 * @description
 * Renders the category tag on the left and
 * the creation date on the right.
 */
const VideoByline: FC<IVideoBylineProps> = ({ video }) => (
    <Flex align="center" justify="space-between" className={styles.videoPreview__byline}>
        <Tag color="purple" variant="solid" className={styles.videoPreview__category}>
            {video.categoryName}
        </Tag>

        <Flex align="center" gap={4}>
            <IconCalendarOutlined />
            <Text type="secondary">
                {video.createdAt ? dayjs(video.createdAt).format("DD MMMM, YYYY") : "—"}
            </Text>
        </Flex>
    </Flex>
);

export default VideoByline;
