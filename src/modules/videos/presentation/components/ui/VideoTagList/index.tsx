import { Flex, Tag } from "antd";
import type { FC } from "react";
import type { ITagEntity } from "@/modules/lookup/domain/entities/ITagEntity";
import styles from "../VideoPreview/index.module.scss";

interface IVideoTagListProps {
    tags: ITagEntity[];
}

/**
 * Tag list for the video preview.
 *
 * @component
 *
 * @description
 * Renders a horizontal wrapping list of video tags
 * using the geekblue filled variant.
 */
const VideoTagList: FC<IVideoTagListProps> = ({ tags }) => (
    <Flex gap={8} wrap className={styles.videoPreview__tags}>
        {tags.map((tag) => (
            <Tag key={tag.id} variant="filled" color="geekblue">
                {tag.name}
            </Tag>
        ))}
    </Flex>
);

export default VideoTagList;
