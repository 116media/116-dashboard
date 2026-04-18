import { Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { IShortVideoEntity } from "@/modules/shorts/domain/entities/IShortVideoEntity";
import {
    SHORT_DROPDOWN_ITEMS,
    type ShortAction
} from "@/modules/shorts/presentation/constants/shorts.dropdown";
import StatusTag from "@/shared/presentation/ui/StatusTag";
import type { ITableActionItem } from "@/shared/presentation/ui/TableActionDropdown";
import TableActionDropdown from "@/shared/presentation/ui/TableActionDropdown";

const { Text } = Typography;

export type { ShortAction };

/**
 * Generates Ant Design table column definitions for the shorts table.
 *
 * @description
 * Builds columns for title, slug, active status tag, view count,
 * like count, and an actions dropdown. The dropdown items are
 * filtered based on short video status and the current user's role.
 *
 * @param onAction - Callback when a row action is triggered
 * @param isSuperAdmin - Whether the current user is a SuperAdmin
 * @returns Column configuration for the Ant Design Table
 */
export const shortsTableColumns = (
    onAction: (action: ShortAction, record: IShortVideoEntity) => void,
    isSuperAdmin: boolean
): ColumnsType<IShortVideoEntity> => [
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
        title: "Slug",
        dataIndex: "slug",
        key: "slug",
        width: 200,
        ellipsis: true,
        render: (slug: string) => <Text type="secondary">{slug}</Text>
    },
    {
        title: "Actif",
        dataIndex: "isActive",
        key: "isActive",
        width: 110,
        align: "center",
        render: (isActive: boolean) => <StatusTag status={isActive ? "active" : "inactive"} />
    },
    {
        title: "Vues",
        dataIndex: "viewCount",
        key: "viewCount",
        width: 100,
        align: "center",
        sorter: (a, b) => a.viewCount - b.viewCount,
        render: (count: number) => <Text>{count}</Text>
    },
    {
        title: "Likes",
        dataIndex: "likeCount",
        key: "likeCount",
        width: 100,
        align: "center",
        sorter: (a, b) => a.likeCount - b.likeCount,
        render: (count: number) => <Text>{count}</Text>
    },
    {
        title: "Actions",
        key: "actions",
        width: 80,
        fixed: "end",
        align: "center",
        render: (_: unknown, record: IShortVideoEntity) => {
            const items: ITableActionItem[] = SHORT_DROPDOWN_ITEMS.map((item) => ({
                key: item.key,
                label: item.label,
                danger: item.danger,
                hidden: item.hidden(record, isSuperAdmin),
                onClick: () => onAction(item.key, record)
            }));

            return <TableActionDropdown items={items} />;
        }
    }
];
