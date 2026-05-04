import { Divider, Flex, Typography } from "antd";
import type { FC } from "react";
import type { IArticleEntity } from "@/modules/articles/domain/entities/IArticleEntity";
import ArticleByline from "@/modules/articles/presentation/components/ui/ArticleByline";
import ArticleCoverImage from "@/modules/articles/presentation/components/ui/ArticleCoverImage";
import ArticleTagList from "@/modules/articles/presentation/components/ui/ArticleTagList";
import AuthorCard from "@/shared/presentation/ui/AuthorCard";
import RichTextEditor from "@/shared/presentation/ui/RichTextEditor";
import styles from "./index.module.scss";

const { Title, Paragraph } = Typography;

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
 * rich text body. Tags are shown at the bottom.
 */
const ArticlePreview: FC<IArticlePreviewProps> = ({ article }) => (
    <Flex vertical gap={24}>
        {article.coverImageUrl && (
            <ArticleCoverImage src={article.coverImageUrl} alt={article.title} />
        )}

        <Title level={3} className={styles.articlePreview__title}>
            {article.title}
        </Title>

        <ArticleByline article={article} />

        {article.author && (
            <div className={styles.articlePreview__author}>
                <AuthorCard author={article.author} showEmail showRole />
            </div>
        )}

        {article.headline && (
            <Paragraph className={styles.articlePreview__headline}>{article.headline}</Paragraph>
        )}

        <Divider size="small" />

        <div className={styles.articlePreview__body}>
            <RichTextEditor value={article.body} readOnly />
        </div>

        {article.tags?.length > 0 && <ArticleTagList tags={article.tags} />}
    </Flex>
);

export default ArticlePreview;
