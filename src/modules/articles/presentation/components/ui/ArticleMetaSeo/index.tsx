import { Flex, Typography } from "antd";
import type { FC } from "react";
import type { IArticleEntity } from "@/modules/articles/domain/entities/IArticleEntity";
import styles from "../ArticleMetaSidebar/index.module.scss";

const { Text } = Typography;

interface IArticleMetaSeoProps {
    article: IArticleEntity;
}

/**
 * SEO section of the article meta sidebar.
 *
 * @component
 *
 * @description
 * Displays the article's meta title and meta description,
 * with a placeholder when not set.
 */
const ArticleMetaSeo: FC<IArticleMetaSeoProps> = ({ article }) => (
    <div className={styles.metaSidebar__section}>
        <Text type="secondary" strong className={styles.metaSidebar__label}>
            SEO
        </Text>
        <Flex vertical gap={8}>
            <div>
                <Text type="secondary">Titre SEO</Text>
                <br />
                <Text className={article.metaTitle ? undefined : styles.metaSidebar__empty}>
                    {article.metaTitle ?? "Non renseigné"}
                </Text>
            </div>
            <div>
                <Text type="secondary">Description SEO</Text>
                <br />
                <Text className={article.metaDescription ? undefined : styles.metaSidebar__empty}>
                    {article.metaDescription ?? "Non renseigné"}
                </Text>
            </div>
        </Flex>
    </div>
);

export default ArticleMetaSeo;
