import { Alert, Flex, Typography } from "antd";
import type { FC } from "react";
import type { IArticleEntity } from "@/modules/articles/domain/entities/IArticleEntity";
import { CONTENT_STATUS_CONFIG } from "@/shared/presentation/constants/content.status.config";
import DetailField from "@/shared/presentation/ui/DetailField";
import {
    IconCalendarOutlined,
    IconClockCircleOutlined,
    IconTagOutlined,
    IconTeamOutlined
} from "@/shared/presentation/ui/Icons";
import StatusTag from "@/shared/presentation/ui/StatusTag";
import { dayjs } from "@/shared/presentation/utils/dayjs/dayjs.utils";
import styles from "../ArticleMetaSidebar/index.module.scss";

const { Text } = Typography;

interface IArticleMetaInfoProps {
    article: IArticleEntity;
}

/**
 * Informations section of the article meta sidebar.
 *
 * @component
 *
 * @description
 * Displays status tag, category, author, creation/update/publish
 * dates, and rejection reason alert if applicable.
 */
const ArticleMetaInfo: FC<IArticleMetaInfoProps> = ({ article }) => (
    <div className={styles.metaSidebar__section}>
        <Flex justify="space-between" align="center" className={styles.metaSidebar__header}>
            <Text type="secondary" strong className={styles.metaSidebar__label}>
                Informations
            </Text>
            <StatusTag status={article.status} config={CONTENT_STATUS_CONFIG} />
        </Flex>
        <Flex vertical gap={8}>
            <DetailField
                label="Catégorie"
                value={article.categoryName}
                icon={<IconTagOutlined />}
            />
            <DetailField
                label="Auteur"
                value={article.author?.userName ?? article.authorId}
                icon={<IconTeamOutlined />}
            />
            <DetailField
                label="Créé le"
                value={
                    article.createdAt
                        ? dayjs(article.createdAt).format("DD/MM/YYYY HH:mm")
                        : undefined
                }
                icon={<IconClockCircleOutlined />}
            />
            <DetailField
                label="Mis à jour le"
                value={
                    article.updatedAt
                        ? dayjs(article.updatedAt).format("DD/MM/YYYY HH:mm")
                        : undefined
                }
                icon={<IconCalendarOutlined />}
            />
            {article.publishedAt && (
                <DetailField
                    label="Publié le"
                    value={dayjs(article.publishedAt).format("DD/MM/YYYY HH:mm")}
                    icon={<IconCalendarOutlined />}
                />
            )}
        </Flex>

        {article.rejectionReason && (
            <Alert
                showIcon
                type="error"
                title="Rejeté"
                description={article.rejectionReason}
                className={styles.metaSidebar__alert}
            />
        )}
    </div>
);

export default ArticleMetaInfo;
