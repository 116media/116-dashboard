import { Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import type { IPermissionEntity } from "@/modules/permissions/domain/entities/IPermission";
import { PERMISSION_DROPDOWN_ITEMS } from "@/modules/permissions/presentation/constants/permissions.dropdown";
import StatusTag from "@/shared/presentation/ui/StatusTag";
import type { ITableActionItem } from "@/shared/presentation/ui/TableActionDropdown";
import TableActionDropdown from "@/shared/presentation/ui/TableActionDropdown";

const { Text } = Typography;

/**
 * Action types available in the permissions table dropdown.
 */
export type PermissionAction =
    | "edit"
    | "activate"
    | "deactivate"
    | "softDelete"
    | "restore"
    | "hardDelete";

/**
 * Generates Ant Design table column definitions for the permissions table.
 *
 * @description
 * Defines columns for resource, action, status, updated date,
 * description, and an action dropdown. All data columns are
 * client-side sortable. Mutation actions are hidden when
 * `isSuperAdmin` is false.
 *
 * @param onAction - Callback when a row action is triggered
 * @param isSuperAdmin - Whether the current user is a SuperAdmin
 * @returns Column configuration for the Ant Design Table
 */
export const permissionsTableColumns = (
    onAction: (action: PermissionAction, permission: IPermissionEntity) => void,
    isSuperAdmin: boolean
): ColumnsType<IPermissionEntity> => [
    {
        title: "Ressource",
        dataIndex: "resource",
        key: "resource",
        width: 120,
        sorter: (a, b) => a.resource.localeCompare(b.resource),
        render: (resource: string) => (
            <Tag color="default" variant="solid">
                {resource}
            </Tag>
        )
    },
    {
        title: "Action",
        dataIndex: "action",
        key: "action",
        width: 120,
        sorter: (a, b) => a.action.localeCompare(b.action),
        render: (action: string) => (
            <Tag color="default" variant="solid">
                {action}
            </Tag>
        )
    },
    {
        title: "Description",
        dataIndex: "description",
        key: "description",
        width: 250,
        ellipsis: { showTitle: true },
        sorter: (a, b) => a.description.localeCompare(b.description),
        render: (description: string) => <Text type="secondary">{description}</Text>
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
        key: "status",
        width: 100,
        fixed: "end",
        align: "center",
        sorter: (a, b) => {
            const order = (r: IPermissionEntity) => (r.isDeleted ? 2 : r.isActive ? 0 : 1);
            return order(a) - order(b);
        },
        render: (_: unknown, record: IPermissionEntity) => {
            if (record.isDeleted) return <StatusTag status="deleted" />;
            return <StatusTag status={record.isActive ? "active" : "inactive"} />;
        }
    },
    {
        width: 65,
        fixed: "end",
        key: "actions",
        align: "center",
        title: "Actions",
        render: (_: unknown, record: IPermissionEntity) => {
            const items: ITableActionItem[] = PERMISSION_DROPDOWN_ITEMS.map((item) => ({
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
