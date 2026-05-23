import { Flex, Typography } from "antd";
import type { FC } from "react";
import type { IVideoEntity } from "@/modules/videos/domain/entities/IVideoEntity";
import styles from "../VideoMetaSidebar/index.module.scss";

const { Text } = Typography;

interface IVideoMetaSeoProps {
    video: IVideoEntity;
}

/**
 * SEO section of the video meta sidebar.
 *
 * @component
 *
 * @description
 * Displays the video's meta title and meta description,
 * with a placeholder when not set.
 */
const VideoMetaSeo: FC<IVideoMetaSeoProps> = ({ video }) => (
    <div className={styles.metaSidebar__section}>
        <Text type="secondary" strong className={styles.metaSidebar__label}>
            SEO
        </Text>
        <Flex vertical gap={8}>
            <div>
                <Text type="secondary">Titre SEO</Text>
                <br />
                <Text className={video.metaTitle ? undefined : styles.metaSidebar__empty}>
                    {video.metaTitle ?? "Non renseigné"}
                </Text>
            </div>
            <div>
                <Text type="secondary">Description SEO</Text>
                <br />
                <Text className={video.metaDescription ? undefined : styles.metaSidebar__empty}>
                    {video.metaDescription ?? "Non renseigné"}
                </Text>
            </div>
        </Flex>
    </div>
);

export default VideoMetaSeo;
