import { Alert, Flex, Typography } from "antd";
import type { FC } from "react";
import type { IVideoEntity } from "@/modules/videos/domain/entities/IVideoEntity";
import { CONTENT_STATUS_CONFIG } from "@/shared/presentation/constants/content.status.config";
import DetailField from "@/shared/presentation/ui/DetailField";
import {
    IconCalendarOutlined,
    IconClockCircleOutlined,
    IconLinkOutlined,
    IconTagOutlined,
    IconTeamOutlined,
    IconYoutubeFilled
} from "@/shared/presentation/ui/Icons";
import StatusTag from "@/shared/presentation/ui/StatusTag";
import { dayjs } from "@/shared/presentation/utils/dayjs/dayjs.utils";
import styles from "../VideoMetaSidebar/index.module.scss";

const { Text } = Typography;

interface IVideoMetaInfoProps {
    video: IVideoEntity;
}

/**
 * Informations section of the video meta sidebar.
 *
 * @component
 *
 * @description
 * Displays status tag, category, author, customer, YouTube URL,
 * shoot date, creation/update/publish dates, and rejection alert.
 */
const VideoMetaInfo: FC<IVideoMetaInfoProps> = ({ video }) => (
    <div className={styles.metaSidebar__section}>
        <Flex justify="space-between" align="center" className={styles.metaSidebar__header}>
            <Text type="secondary" strong className={styles.metaSidebar__label}>
                Informations
            </Text>
            <StatusTag status={video.status} config={CONTENT_STATUS_CONFIG} />
        </Flex>
        <Flex vertical gap={8}>
            <DetailField label="Catégorie" value={video.categoryName} icon={<IconTagOutlined />} />
            <DetailField
                label="Auteur"
                value={video.author?.userName ?? video.authorId}
                icon={<IconTeamOutlined />}
            />
            {video.customerName && (
                <DetailField
                    label="Client"
                    value={video.customerName}
                    icon={<IconLinkOutlined />}
                />
            )}
            {video.youtubeVideoUrl && (
                <DetailField
                    label="YouTube"
                    value={video.youtubeVideoUrl}
                    icon={<IconYoutubeFilled />}
                />
            )}
            {video.shootingScheduledAt && (
                <DetailField
                    label="Tournage prévu le"
                    icon={<IconCalendarOutlined />}
                    value={dayjs(video.shootingScheduledAt).format("DD/MM/YYYY HH:mm")}
                />
            )}
            <DetailField
                label="Créé le"
                value={
                    video.createdAt ? dayjs(video.createdAt).format("DD/MM/YYYY HH:mm") : undefined
                }
                icon={<IconClockCircleOutlined />}
            />
            <DetailField
                label="Mis à jour le"
                value={
                    video.updatedAt ? dayjs(video.updatedAt).format("DD/MM/YYYY HH:mm") : undefined
                }
                icon={<IconCalendarOutlined />}
            />
            {video.publishedAt && (
                <DetailField
                    label="Publié le"
                    value={dayjs(video.publishedAt).format("DD/MM/YYYY HH:mm")}
                    icon={<IconCalendarOutlined />}
                />
            )}
        </Flex>

        {video.rejectionReason && (
            <Alert
                showIcon
                type="error"
                title="Rejeté"
                description={video.rejectionReason}
                className={styles.metaSidebar__alert}
            />
        )}
    </div>
);

export default VideoMetaInfo;
