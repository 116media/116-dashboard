import { Descriptions, Flex, Image, Tag, Typography } from "antd";
import type { FC } from "react";
import type { IArticleEntity } from "@/modules/articles/domain/entities/IArticleEntity";
import styles from "./index.module.scss";

const { Text } = Typography;

interface IArticleCreateSummaryProps {
    article: IArticleEntity | null;
}

/**
 * Read-only summary preview for article creation wizard step 4.
 *
 * @component
 *
 * @description
 * Displays all article data before final submission. Body content
 * is rendered as HTML in a bordered preview box. Tags are shown
 * as Tag components.
 */
const ArticleCreateSummary: FC<IArticleCreateSummaryProps> = ({ article }) => {
    if (!article) return null;

    return (
        <Flex vertical gap={16}>
            <Descriptions column={1} bordered size="small">
                <Descriptions.Item label="Titre">
                    <Text strong>{article.title}</Text>
                </Descriptions.Item>
                <Descriptions.Item label="Catégorie">{article.categoryName}</Descriptions.Item>
                <Descriptions.Item label="Sommaire">
                    {article.headline || <Text type="secondary">—</Text>}
                </Descriptions.Item>
                {article.coverImageUrl && (
                    <Descriptions.Item label="Couverture">
                        <Image
                            alt="Cover"
                            width={120}
                            src={article.coverImageUrl}
                            className={styles.articleSummary__cover}
                        />
                    </Descriptions.Item>
                )}
                {article.tags && article.tags.length > 0 && (
                    <Descriptions.Item label="Tags">
                        <Flex gap={4} wrap>
                            {article.tags.map((tag) => (
                                <Tag key={tag.id} color="blue">
                                    {tag.name}
                                </Tag>
                            ))}
                        </Flex>
                    </Descriptions.Item>
                )}
                {article.metaTitle && (
                    <Descriptions.Item label="Titre SEO">{article.metaTitle}</Descriptions.Item>
                )}
                {article.metaDescription && (
                    <Descriptions.Item label="Description SEO">
                        {article.metaDescription}
                    </Descriptions.Item>
                )}
            </Descriptions>

            {article.body && (
                <div className={styles.articleSummary__body}>
                    <Text
                        strong
                        type="secondary"
                        style={{ fontSize: 12, marginBottom: 8, display: "block" }}
                    >
                        Aperçu du contenu
                    </Text>
                    <div
                        className={styles.articleSummary__bodyContent}
                        // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted HTML from backend
                        dangerouslySetInnerHTML={{ __html: article.body }}
                    />
                </div>
            )}
        </Flex>
    );
};

export default ArticleCreateSummary;
