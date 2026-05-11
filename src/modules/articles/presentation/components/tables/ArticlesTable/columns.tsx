import { Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { IArticleSummaryEntity } from "@/modules/articles/domain/entities/IArticleSummaryEntity";
import {
    ARTICLE_DROPDOWN_ITEMS,
    type ArticleAction
} from "@/modules/articles/presentation/constants/articles.dropdown";
import type { EnumContentStatus } from "@/shared/infrastructure/api/generated/116.api";
import { CONTENT_STATUS_CONFIG } from "@/shared/presentation/constants/content.status.config";
import { Colors } from "@/shared/presentation/constants/theme";
import { IconCheckCircleFilled, IconCloseCircleFilled } from "@/shared/presentation/ui/Icons";
import StatusTag from "@/shared/presentation/ui/StatusTag";
import type { ITableActionItem } from "@/shared/presentation/ui/TableActionDropdown";
import TableActionDropdown from "@/shared/presentation/ui/TableActionDropdown";
import { dayjs } from "@/shared/presentation/utils/dayjs/dayjs.utils";

const { Text } = Typography;

export type { ArticleAction };

/**
 * Generates Ant Design table column definitions for the articles table.
 *
 * @description
 * Builds columns for title, category, status tag, featured flag,
 * published date, updated date, and an actions dropdown. The dropdown
 * items are filtered based on article status and the current user's role.
 *
 * @param onAction - Callback when a row action is triggered
 * @param isSuperAdmin - Whether the current user is a SuperAdmin
 * @param isAdminOrSuperAdmin - Whether the current user is Admin or SuperAdmin
 * @returns Column configuration for the Ant Design Table
 */
export const articlesTableColumns = (
    onAction: (action: ArticleAction, record: IArticleSummaryEntity) => void,
    isSuperAdmin: boolean,
    isAdminOrSuperAdmin: boolean
): ColumnsType<IArticleSummaryEntity> => [
    {
        title: "Titre",
        dataIndex: "title",
        key: "title",
        width: 220,
        ellipsis: true,
        sorter: (a, b) => a.title.localeCompare(b.title),
        render: (title: string) => (
            <Text strong ellipsis>
                {title}
            </Text>
        )
    },
    {
        title: "Catégorie",
        dataIndex: "categoryName",
        key: "categoryName",
        width: 160,
        ellipsis: true,
        sorter: (a, b) => a.categoryName.localeCompare(b.categoryName),
        render: (name: string) => <Text>{name}</Text>
    },
    {
        title: "Statut",
        dataIndex: "status",
        key: "status",
        width: 160,
        align: "center",
        render: (status: EnumContentStatus) => (
            <StatusTag status={status} config={CONTENT_STATUS_CONFIG} />
        )
    },
    {
        title: "En vedette",
        dataIndex: "isFeatured",
        key: "isFeatured",
        width: 110,
        align: "center",
        render: (isFeatured: boolean) =>
            isFeatured ? (
                <IconCheckCircleFilled style={{ color: Colors.Success, fontSize: 18 }} />
            ) : (
                <IconCloseCircleFilled style={{ color: Colors.Error, fontSize: 18 }} />
            )
    },
    {
        title: "Publié le",
        dataIndex: "publishedAt",
        key: "publishedAt",
        width: 160,
        render: (date: string | null) =>
            date ? (
                <Text type="secondary">{dayjs(date).format("DD/MM/YYYY HH:mm")}</Text>
            ) : (
                <Text type="secondary">—</Text>
            )
    },
    {
        title: "Modifié le",
        dataIndex: "updatedAt",
        key: "updatedAt",
        width: 160,
        render: (date: string | null) =>
            date ? (
                <Text type="secondary">{dayjs(date).format("DD/MM/YYYY HH:mm")}</Text>
            ) : (
                <Text type="secondary">—</Text>
            )
    },
    {
        title: "Actions",
        key: "actions",
        width: 80,
        fixed: "end",
        align: "center",
        render: (_: unknown, record: IArticleSummaryEntity) => {
            const items: ITableActionItem[] = ARTICLE_DROPDOWN_ITEMS.map((item) => ({
                key: item.key,
                label: item.label,
                danger: item.danger,
                hidden: item.hidden(record, isSuperAdmin, isAdminOrSuperAdmin),
                onClick: () => onAction(item.key, record)
            }));

            return <TableActionDropdown items={items} />;
        }
    }
];
