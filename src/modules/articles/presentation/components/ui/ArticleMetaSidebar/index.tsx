import { Alert, Flex, Image, Switch, Typography } from "antd";
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
import styles from "./index.module.scss";

const { Text } = Typography;

interface IArticleMetaSidebarProps {
    article: IArticleEntity;
}

/**
 * Admin sidebar for the article detail page.
 *
 * @component
 *
 * @description
 * Four sections stacked vertically:
 * 1. Informations — status, category, author, dates
 * 2. SEO — meta title, meta description
 * 3. Options — featured toggle (read-only)
 * 4. Images — grid of uploaded images
 */
const ArticleMetaSidebar: FC<IArticleMetaSidebarProps> = ({ article }) => (
    <Flex vertical gap={16}>
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
                    type="error"
                    showIcon
                    message="Rejeté"
                    description={article.rejectionReason}
                    className={styles.metaSidebar__alert}
                />
            )}
        </div>

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
                    <Text
                        className={article.metaDescription ? undefined : styles.metaSidebar__empty}
                    >
                        {article.metaDescription ?? "Non renseigné"}
                    </Text>
                </div>
            </Flex>
        </div>

        <div className={styles.metaSidebar__section}>
            <Text type="secondary" strong className={styles.metaSidebar__label}>
                Options
            </Text>
            <Flex justify="space-between" align="center">
                <Text>En vedette</Text>
                <Switch checked={article.isFeatured} disabled />
            </Flex>
        </div>

        {article.images?.length > 0 && (
            <div className={styles.metaSidebar__section}>
                <Text type="secondary" strong className={styles.metaSidebar__label}>
                    Images ({article.images?.length})
                </Text>
                <div className={styles.metaSidebar__imageGrid}>
                    {article.images.map((img) => (
                        <Image
                            key={img.id}
                            src={img.url}
                            alt={img.imageType}
                            className={styles.metaSidebar__image}
                        />
                    ))}
                </div>
            </div>
        )}
    </Flex>
);

export default ArticleMetaSidebar;
