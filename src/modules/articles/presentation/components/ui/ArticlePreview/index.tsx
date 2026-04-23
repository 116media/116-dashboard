import { Divider, Flex, Image, Tag, Typography } from "antd";
import type { FC } from "react";
import type { IArticleEntity } from "@/modules/articles/domain/entities/IArticleEntity";
import AuthorCard from "@/shared/presentation/ui/AuthorCard";
import { IconClockCircleOutlined } from "@/shared/presentation/ui/Icons";
import RichTextEditor from "@/shared/presentation/ui/RichTextEditor";
import { dayjs } from "@/shared/presentation/utils/dayjs/dayjs.utils";
import styles from "./index.module.scss";

const { Title, Paragraph, Text } = Typography;

interface IArticlePreviewProps {
    article: IArticleEntity;
}

/**
 * Article reading preview — renders like a published article.
 *
 * @component
 *
 * @description
 * Displays the article as a reader would see it: cover image,
 * title, author/date byline, headline summary, and the full
 * rich text body. Tags are shown at the bottom. No admin labels
 * or section headers — just the content.
 */
const ArticlePreview: FC<IArticlePreviewProps> = ({ article }) => (
    <div>
        {article.coverImageUrl && (
            <div className={styles.articlePreview__cover}>
                <Image
                    width="100%"
                    alt={article.title}
                    src={article.coverImageUrl}
                    preview={{ mask: "Aperçu" }}
                />
            </div>
        )}

        <Title level={3} className={styles.articlePreview__title}>
            {article.title}
        </Title>

        {article.author && (
            <div className={styles.articlePreview__author}>
                <AuthorCard author={article.author} showEmail showRole />
            </div>
        )}

        <Flex align="center" gap={12} className={styles.articlePreview__byline}>
            <Text type="secondary">{article.categoryName}</Text>
            <Text type="secondary">·</Text>
            <Text type="secondary">
                {article.createdAt ? dayjs(article.createdAt).format("DD MMMM YYYY") : "—"}
            </Text>
            <Text type="secondary">·</Text>
            <Flex align="center" gap={4}>
                <IconClockCircleOutlined />
                <Text type="secondary" className={styles.articlePreview__readTime}>
                    {article.readTimeInMinutes} min de lecture
                </Text>
            </Flex>
        </Flex>

        {article.headline && (
            <Paragraph className={styles.articlePreview__headline}>{article.headline}</Paragraph>
        )}

        <Divider className={styles.articlePreview__divider} />

        <div className={styles.articlePreview__body}>
            <RichTextEditor value={article.body} readOnly />
        </div>

        {article.tags?.length > 0 && (
            <Flex gap={4} wrap className={styles.articlePreview__tags}>
                {article.tags.map((tag) => (
                    <Tag key={tag.id} color="geekblue">
                        {tag.name}
                    </Tag>
                ))}
            </Flex>
        )}
    </div>
);

export default ArticlePreview;
