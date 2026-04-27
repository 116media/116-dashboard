import { Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { ITagEntity } from "@/modules/lookup/domain/entities/ITagEntity";
import {
    TAG_DROPDOWN_ITEMS,
    type TagAction
} from "@/modules/lookup/presentation/constants/lookup.tags.dropdown";
import type { ITableActionItem } from "@/shared/presentation/ui/TableActionDropdown";
import TableActionDropdown from "@/shared/presentation/ui/TableActionDropdown";

const { Text } = Typography;

export type { TagAction };

/**
 * Generates Ant Design table column definitions for the tags table.
 *
 * @description
 * Defines columns for name, slug, and an action dropdown.
 * All data columns are client-side sortable. Mutation actions
 * are hidden based on authorization level.
 *
 * @param onAction - Callback when a row action is triggered
 * @param isSuperAdmin - Whether the current user is a SuperAdmin
 * @param isAdminOrSuperAdmin - Whether the current user is Admin or SuperAdmin
 * @returns Column configuration for the Ant Design Table
 */
export const tagsTableColumns = (
    onAction: (action: TagAction, tag: ITagEntity) => void,
    isSuperAdmin: boolean,
    isAdminOrSuperAdmin: boolean
): ColumnsType<ITagEntity> => [
    {
        title: "Nom",
        dataIndex: "name",
        key: "name",
        width: 200,
        sorter: (a, b) => a.name.localeCompare(b.name),
        render: (name: string) => <Text strong>{name}</Text>
    },
    {
        title: "Slug",
        dataIndex: "slug",
        key: "slug",
        width: 200,
        sorter: (a, b) => a.slug.localeCompare(b.slug),
        render: (slug: string) => <Text type="secondary">{slug}</Text>
    },
    {
        width: 50,
        key: "actions",
        align: "center" as const,
        render: (_: unknown, record: ITagEntity) => {
            const items: ITableActionItem[] = TAG_DROPDOWN_ITEMS.map((item) => ({
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
