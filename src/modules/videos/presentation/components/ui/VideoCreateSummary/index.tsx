import { Descriptions, Flex, Tag, Typography } from "antd";
import type { FC } from "react";
import type { IVideoEntity } from "@/modules/videos/domain/entities/IVideoEntity";
import { Colors } from "@/shared/presentation/constants/theme";
import { IconStopOutlined } from "@/shared/presentation/ui/Icons";

const { Text } = Typography;

interface IVideoCreateSummaryProps {
    video: IVideoEntity | null;
}

/**
 * Read-only summary preview for video creation wizard step 4.
 *
 * @component
 */
const VideoCreateSummary: FC<IVideoCreateSummaryProps> = ({ video }) => {
    if (!video) return null;

    return (
        <Flex vertical gap={16}>
            <Descriptions column={1} bordered size="small">
                <Descriptions.Item label="Titre">
                    <Text strong>{video.title}</Text>
                </Descriptions.Item>
                <Descriptions.Item label="Catégorie">{video.categoryName}</Descriptions.Item>
                <Descriptions.Item label="Description">
                    {video.description || (
                        <IconStopOutlined style={{ color: Colors.Error, fontSize: 18 }} />
                    )}
                </Descriptions.Item>
                {video.tags && video.tags.length > 0 && (
                    <Descriptions.Item label="Tags">
                        <Flex gap={4} wrap>
                            {video.tags.map((tag) => (
                                <Tag key={tag.id} color="blue">
                                    {tag.name}
                                </Tag>
                            ))}
                        </Flex>
                    </Descriptions.Item>
                )}
                {video.metaTitle && (
                    <Descriptions.Item label="Titre SEO">{video.metaTitle}</Descriptions.Item>
                )}
                {video.metaDescription && (
                    <Descriptions.Item label="Description SEO">
                        {video.metaDescription}
                    </Descriptions.Item>
                )}
            </Descriptions>
        </Flex>
    );
};

export default VideoCreateSummary;
