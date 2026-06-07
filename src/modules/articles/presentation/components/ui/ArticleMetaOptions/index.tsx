import { Flex, Tag, Typography } from "antd";
import type { FC } from "react";
import type { IArticleEntity } from "@/modules/articles/domain/entities/IArticleEntity";
import { IconCalendarOutlined, IconStarOutlined } from "@/shared/presentation/ui/Icons";
import { dayjs } from "@/shared/presentation/utils/dayjs/dayjs.utils";
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
 * Displays read-only promotion status for the article.
 * Shows the active promotion level name and expiry date when promoted,
 * or a non-promoted badge when no promotion is active.
 */
const ArticleMetaOptions: FC<IArticleMetaOptionsProps> = ({ article }) => (
    <div className={styles.metaSidebar__section}>
        <Text type="secondary" strong className={styles.metaSidebar__label}>
            Promotion
        </Text>
        <Flex vertical gap={8}>
            <Flex justify="space-between" align="center">
                <Flex align="center" gap={6}>
                    <IconStarOutlined />
                    <Text>Statut</Text>
                </Flex>
                {article.isPromoted ? <Tag color="gold">Promu</Tag> : <Tag>Non promu</Tag>}
            </Flex>
            {article.isPromoted && article.promotionLevelName && (
                <Flex justify="space-between" align="center">
                    <Text type="secondary">Niveau</Text>
                    <Text strong>{article.promotionLevelName}</Text>
                </Flex>
            )}
            {article.isPromoted && article.promotedUntil && (
                <Flex justify="space-between" align="center">
                    <Flex align="center" gap={6}>
                        <IconCalendarOutlined />
                        <Text type="secondary">Expire le</Text>
                    </Flex>
                    <Text>{dayjs(article.promotedUntil).format("DD/MM/YYYY HH:mm")}</Text>
                </Flex>
            )}
        </Flex>
    </div>
);

export default ArticleMetaOptions;
