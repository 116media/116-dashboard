import { Flex, Image, Tag, Typography } from "antd";
import type { FC } from "react";
import type { IVideoEntity } from "@/modules/videos/domain/entities/IVideoEntity";
import AuthorCard from "@/shared/presentation/ui/AuthorCard";
import RichTextEditor from "@/shared/presentation/ui/RichTextEditor";
import VideoPlayer from "@/shared/presentation/ui/VideoPlayer";
import { dayjs } from "@/shared/presentation/utils/dayjs/dayjs.utils";
import styles from "./index.module.scss";

const { Title, Text } = Typography;

interface IVideoPreviewProps {
    video: IVideoEntity;
}

/**
 * Video reading preview — renders like a published video.
 *
 * @component
 *
 * @description
 * Displays the video as a viewer would see it: embedded player
 * (YouTube if available, otherwise thumbnail), title, category/date
 * byline, description, and tags at the bottom.
 */
const VideoPreview: FC<IVideoPreviewProps> = ({ video }) => (
    <div>
        {video.youtubeVideoUrl ? (
            <div className={styles.videoPreview__player}>
                <VideoPlayer youtubeUrl={video.youtubeVideoUrl} poster={video.thumbnailUrl} />
            </div>
        ) : video.thumbnailUrl ? (
            <div className={styles.videoPreview__cover}>
                <Image
                    width="100%"
                    alt={video.title}
                    src={video.thumbnailUrl}
                    preview={{ mask: "Aperçu" }}
                />
            </div>
        ) : null}

        <Title level={3} className={styles.videoPreview__title}>
            {video.title}
        </Title>

        {video.author && (
            <div className={styles.videoPreview__author}>
                <AuthorCard author={video.author} showEmail showRole />
            </div>
        )}

        <Flex align="center" gap={12} className={styles.videoPreview__byline}>
            <Text type="secondary">{video.categoryName}</Text>
            <Text type="secondary">·</Text>
            <Text type="secondary">
                {video.createdAt ? dayjs(video.createdAt).format("DD MMMM YYYY") : "—"}
            </Text>
        </Flex>

        <div className={styles.videoPreview__description}>
            <RichTextEditor value={video.description} readOnly />
        </div>

        {video.tags?.length > 0 && (
            <Flex gap={4} wrap className={styles.videoPreview__tags}>
                {video.tags.map((tag) => (
                    <Tag key={tag.id} color="geekblue">
                        {tag.name}
                    </Tag>
                ))}
            </Flex>
        )}
    </div>
);

export default VideoPreview;
