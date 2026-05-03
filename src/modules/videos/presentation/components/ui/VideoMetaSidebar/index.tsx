import { Alert, Flex, Image, Switch, Typography } from "antd";
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
import styles from "./index.module.scss";

const { Text } = Typography;

interface IVideoMetaSidebarProps {
    video: IVideoEntity;
}

/**
 * Admin sidebar for the video detail page.
 *
 * @component
 *
 * @description
 * Three sections stacked vertically:
 * 1. Informations — status, category, author, YouTube URL, shoot date, dates
 * 2. SEO — meta title, meta description
 * 3. Options — featured and has lyrics toggles (read-only)
 */
const VideoMetaSidebar: FC<IVideoMetaSidebarProps> = ({ video }) => (
    <Flex vertical gap={16}>
        <div className={styles.metaSidebar__section}>
            <Flex justify="space-between" align="center" className={styles.metaSidebar__header}>
                <Text type="secondary" strong className={styles.metaSidebar__label}>
                    Informations
                </Text>
                <StatusTag status={video.status} config={CONTENT_STATUS_CONFIG} />
            </Flex>
            <Flex vertical gap={8}>
                <DetailField
                    label="Catégorie"
                    value={video.categoryName}
                    icon={<IconTagOutlined />}
                />
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
                        video.createdAt
                            ? dayjs(video.createdAt).format("DD/MM/YYYY HH:mm")
                            : undefined
                    }
                    icon={<IconClockCircleOutlined />}
                />
                <DetailField
                    label="Mis à jour le"
                    value={
                        video.updatedAt
                            ? dayjs(video.updatedAt).format("DD/MM/YYYY HH:mm")
                            : undefined
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

        {video.thumbnailUrl && (
            <div className={styles.metaSidebar__section}>
                <Text type="secondary" strong className={styles.metaSidebar__label}>
                    Miniature
                </Text>
                <Image
                    alt={video.title}
                    src={video.thumbnailUrl}
                    preview={{ mask: "Aperçu" }}
                    className={styles.metaSidebar__thumbnail}
                />
            </div>
        )}
    </Flex>
);

export default VideoMetaSidebar;
