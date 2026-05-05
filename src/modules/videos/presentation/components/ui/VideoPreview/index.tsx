import { Divider, Flex, Typography } from "antd";
import type { FC } from "react";
import type { IVideoEntity } from "@/modules/videos/domain/entities/IVideoEntity";
import VideoByline from "@/modules/videos/presentation/components/ui/VideoByline";
import VideoPlayerSection from "@/modules/videos/presentation/components/ui/VideoPlayerSection";
import VideoTagList from "@/modules/videos/presentation/components/ui/VideoTagList";
import AuthorCard from "@/shared/presentation/ui/AuthorCard";
import RichTextEditor from "@/shared/presentation/ui/RichTextEditor";
import styles from "./index.module.scss";

const { Title } = Typography;

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
 * (YouTube if available, otherwise thumbnail), title, byline,
 * description, and tags at the bottom.
 */
const VideoPreview: FC<IVideoPreviewProps> = ({ video }) => (
    <Flex vertical gap={24}>
        <VideoPlayerSection
            title={video.title}
            youtubeUrl={video.youtubeVideoUrl}
            thumbnailUrl={video.thumbnailUrl}
        />

        <Title level={3} className={styles.videoPreview__title}>
            {video.title}
        </Title>

        <VideoByline video={video} />

        {video.author && (
            <div className={styles.videoPreview__author}>
                <AuthorCard author={video.author} showEmail showRole />
            </div>
        )}

        <Divider size="small" />

        <div className={styles.videoPreview__description}>
            <RichTextEditor value={video.description} readOnly />
        </div>

        {video.tags?.length > 0 && <VideoTagList tags={video.tags} />}
    </Flex>
);

export default VideoPreview;
