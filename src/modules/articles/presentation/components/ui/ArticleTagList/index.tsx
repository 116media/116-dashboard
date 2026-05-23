import { Flex, Tag } from "antd";
import type { FC } from "react";
import type { ITagEntity } from "@/modules/lookup/domain/entities/ITagEntity";
import styles from "../ArticlePreview/index.module.scss";

interface IArticleTagListProps {
    tags: ITagEntity[];
}

/**
 * Tag list for the article preview.
 *
 * @component
 *
 * @description
 * Renders a horizontal wrapping list of article tags
 * using the geekblue filled variant.
 */
const ArticleTagList: FC<IArticleTagListProps> = ({ tags }) => (
    <Flex gap={8} wrap className={styles.articlePreview__tags}>
        {tags.map((tag) => (
            <Tag key={tag.id} variant="filled" color="geekblue">
                {tag.name}
            </Tag>
        ))}
    </Flex>
);

export default ArticleTagList;
