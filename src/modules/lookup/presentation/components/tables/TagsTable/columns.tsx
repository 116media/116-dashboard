import { Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { ITagEntity } from "@/modules/lookup/domain/entities/ITagEntity";

const { Text } = Typography;

/**
 * Generates Ant Design table column definitions for the tags table.
 *
 * @description
 * Defines columns for name and slug. Tags have no status column and
 * no actions column since they cannot be edited, activated, or
 * deactivated.
 *
 * @returns Column configuration for the Ant Design Table
 */
export const tagsTableColumns = (): ColumnsType<ITagEntity> => [
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
    }
];
