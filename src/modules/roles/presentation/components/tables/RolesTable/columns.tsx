import { Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import type { IRoleEntity } from "@/modules/roles/domain/entities/IRole";
import { ROLE_DROPDOWN_ITEMS } from "@/modules/roles/presentation/constants/roles.dropdown";
import StatusTag from "@/shared/presentation/ui/StatusTag";
import type { ITableActionItem } from "@/shared/presentation/ui/TableActionDropdown";
import TableActionDropdown from "@/shared/presentation/ui/TableActionDropdown";

const { Text } = Typography;

/**
 * Action types available in the roles table dropdown.
 */
export type RoleAction =
    | "edit"
    | "managePermissions"
    | "assignPermission"
    | "removePermission"
    | "activate"
    | "deactivate"
    | "softDelete"
    | "restore"
    | "hardDelete";

/**
 * Generates Ant Design table column definitions for the roles table.
 *
 * @description
 * Defines columns for name, status, updated date, description,
 * and an action dropdown. All data columns are client-side sortable.
 * Mutation actions are hidden when `isSuperAdmin` is false.
 *
 * @param onAction - Callback when a row action is triggered
 * @param isSuperAdmin - Whether the current user is a SuperAdmin
 * @returns Column configuration for the Ant Design Table
 */
export const rolesTableColumns = (
    onAction: (action: RoleAction, role: IRoleEntity) => void,
    isSuperAdmin: boolean
): ColumnsType<IRoleEntity> => [
    {
        title: "Nom",
        dataIndex: "name",
        key: "name",
        sorter: (a, b) => a.name.localeCompare(b.name),
        render: (name: string) => <Text strong>{name}</Text>
    },
    {
        title: "Statut",
        dataIndex: "isActive",
        key: "status",
        width: 100,
        sorter: (a, b) => {
            const order = (r: IRoleEntity) => (r.isDeleted ? 2 : r.isActive ? 0 : 1);
            return order(a) - order(b);
        },
        render: (_: boolean, record: IRoleEntity) => {
            if (record.isDeleted) return <StatusTag status="deleted" />;
            return <StatusTag status={record.isActive ? "active" : "inactive"} />;
        }
    },
    {
        title: "Description",
        dataIndex: "description",
        key: "description",
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
                <Text type="secondary">{dayjs(date).format("DD MMM YYYY, HH:mm")}</Text>
            ) : (
                <Text type="secondary">—</Text>
            )
    },
    {
        width: 65,
        key: "actions",
        align: "center" as const,
        render: (_: unknown, record: IRoleEntity) => {
            const items: ITableActionItem[] = ROLE_DROPDOWN_ITEMS.map((item) => ({
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
