import { Flex, Switch, Typography } from "antd";
import type { FC } from "react";
import type { IArticleEntity } from "@/modules/articles/domain/entities/IArticleEntity";
import styles from "../ArticleMetaSidebar/index.module.scss";

const { Text } = Typography;

interface IArticleMetaOptionsProps {
    article: IArticleEntity;
}

/**
 * Options section of the article meta sidebar.
 *
 * @component
 *
 * @description
 * Displays read-only toggle switches for article options
 * such as the featured placement flag.
 */
const ArticleMetaOptions: FC<IArticleMetaOptionsProps> = ({ article }) => (
    <div className={styles.metaSidebar__section}>
        <Text type="secondary" strong className={styles.metaSidebar__label}>
            Options
        </Text>
        <Flex justify="space-between" align="center">
            <Text>En vedette</Text>
            <Switch checked={article.isFeatured} disabled />
        </Flex>
    </div>
);

export default ArticleMetaOptions;
