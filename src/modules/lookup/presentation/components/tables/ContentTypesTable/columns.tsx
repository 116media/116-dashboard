import { Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import type { IContentTypeEntity } from "@/modules/lookup/domain/entities/IContentTypeEntity";
import {
    CONTENT_TYPE_DROPDOWN_ITEMS,
    type ContentTypeAction
} from "@/modules/lookup/presentation/constants/lookup.content-types.dropdown";
import { ENTITY_STATUS_CONFIG } from "@/shared/presentation/constants/entity.status.config";
import StatusTag from "@/shared/presentation/ui/StatusTag";
import type { ITableActionItem } from "@/shared/presentation/ui/TableActionDropdown";
import TableActionDropdown from "@/shared/presentation/ui/TableActionDropdown";

const { Text } = Typography;

export type { ContentTypeAction };

/**
 * Generates Ant Design table column definitions for the content types table.
 *
 * @description
 * Defines columns for name, status, updated date, and an action dropdown.
 * All data columns are client-side sortable. Mutation actions are hidden
 * based on authorization level.
 *
 * @param onAction - Callback when a row action is triggered
 * @param isSuperAdmin - Whether the current user is a SuperAdmin
 * @param isAdminOrSuperAdmin - Whether the current user is Admin or SuperAdmin
 * @returns Column configuration for the Ant Design Table
 */
export const contentTypesTableColumns = (
    onAction: (action: ContentTypeAction, contentType: IContentTypeEntity) => void,
    isSuperAdmin: boolean,
    isAdminOrSuperAdmin: boolean
): ColumnsType<IContentTypeEntity> => [
    {
        title: "Nom",
        dataIndex: "name",
        key: "name",
        width: 200,
        sorter: (a, b) => a.name.localeCompare(b.name),
        render: (name: string) => <Text strong>{name}</Text>
    },
    {
        title: "Modifié le",
        dataIndex: "updatedAt",
        key: "updatedAt",
        width: 160,
        sorter: (a, b) =>
            new Date(a.updatedAt ?? 0).getTime() - new Date(b.updatedAt ?? 0).getTime(),
        render: (date: string | null) =>
            date ? (
                <Text type="secondary">{dayjs(date).format("DD/MM/YYYY hh:mm")}</Text>
            ) : (
                <Text type="secondary">—</Text>
            )
    },
    {
        title: "Statut",
        dataIndex: "isActive",
        key: "status",
        width: 100,
        align: "center",
        fixed: "end",
        sorter: (a, b) => {
            const order = (r: IContentTypeEntity) => (r.isActive ? 0 : 1);
            return order(a) - order(b);
        },
        render: (_: boolean, record: IContentTypeEntity) => (
            <StatusTag
                status={record.isActive ? "active" : "inactive"}
                config={ENTITY_STATUS_CONFIG}
            />
        )
    },
    {
        width: 65,
        fixed: "end",
        key: "actions",
        align: "center",
        title: "Actions",
        render: (_: unknown, record: IContentTypeEntity) => {
            const items: ITableActionItem[] = CONTENT_TYPE_DROPDOWN_ITEMS.map((item) => ({
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
