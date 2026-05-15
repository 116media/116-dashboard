import { Flex } from "antd";
import type { FC } from "react";
import type { IVideoEntity } from "@/modules/videos/domain/entities/IVideoEntity";
import VideoMetaInfo from "@/modules/videos/presentation/components/ui/VideoMetaInfo";
import VideoMetaOptions from "@/modules/videos/presentation/components/ui/VideoMetaOptions";
import VideoMetaSeo from "@/modules/videos/presentation/components/ui/VideoMetaSeo";
import VideoMetaThumbnail from "@/modules/videos/presentation/components/ui/VideoMetaThumbnail";

interface IVideoMetaSidebarProps {
    video: IVideoEntity;
}

/**
 * Admin sidebar for the video detail page.
 *
 * @component
 *
 * @description
 * Four sections stacked vertically:
 * 1. Informations — status, category, author, YouTube URL, shoot date, dates
 * 2. SEO — meta title, meta description
 * 3. Options — lyrics toggle and promotion status (read-only)
 * 4. Miniature — video thumbnail preview
 */
const VideoMetaSidebar: FC<IVideoMetaSidebarProps> = ({ video }) => (
    <Flex vertical gap={16}>
        <VideoMetaInfo video={video} />
        <VideoMetaSeo video={video} />
        <VideoMetaOptions video={video} />
        {video.thumbnailUrl && <VideoMetaThumbnail title={video.title} src={video.thumbnailUrl} />}
    </Flex>
);

export default VideoMetaSidebar;
