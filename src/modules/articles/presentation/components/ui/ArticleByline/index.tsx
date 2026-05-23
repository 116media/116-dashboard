import { Flex, Tag, Typography } from "antd";
import type { FC } from "react";
import type { IArticleEntity } from "@/modules/articles/domain/entities/IArticleEntity";
import { IconCalendarOutlined, IconClockCircleOutlined } from "@/shared/presentation/ui/Icons";
import { dayjs } from "@/shared/presentation/utils/dayjs/dayjs.utils";
import styles from "../ArticlePreview/index.module.scss";

const { Text } = Typography;

interface IArticleBylineProps {
    article: IArticleEntity;
}

/**
 * Byline bar for the article preview.
 *
 * @component
 *
 * @description
 * Renders the category tag on the left and
 * the creation date + read time on the right.
 */
const ArticleByline: FC<IArticleBylineProps> = ({ article }) => (
    <Flex align="center" justify="space-between">
        <Tag color="purple" variant="solid" className={styles.articlePreview__category}>
            {article.categoryName}
        </Tag>

        <Flex align="center" gap={24}>
            <Flex align="center" gap={4}>
                <IconCalendarOutlined />
                <Text type="secondary">
                    {article.createdAt ? dayjs(article.createdAt).format("DD MMMM, YYYY") : "—"}
                </Text>
            </Flex>
            <Flex align="center" gap={4}>
                <IconClockCircleOutlined />
                <Text type="secondary" className={styles.articlePreview__readTime}>
                    {article.readTimeInMinutes} min de lecture
                </Text>
            </Flex>
        </Flex>
    </Flex>
);

export default ArticleByline;
