import { Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import type { IRoleEntity } from "@/modules/roles/domain/entities/IRole";
import type { ITableActionItem } from "@/shared/presentation/ui/TableActionDropdown";
import TableActionDropdown from "@/shared/presentation/ui/TableActionDropdown";

const { Text } = Typography;

/**
 * Action types available in the roles table dropdown.
 */
export type RoleAction =
    | "edit"
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
            if (record.isDeleted) return <Tag color="error">Supprimé</Tag>;
            return record.isActive ? (
                <Tag color="success" variant="outlined">
                    Actif
                </Tag>
            ) : (
                <Tag color="warning" variant="outlined">
                    Inactif
                </Tag>
            );
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
            const items: ITableActionItem[] = [
                {
                    key: "edit",
                    label: "Modifier",
                    onClick: () => onAction("edit", record),
                    hidden: !isSuperAdmin
                },
                {
                    key: "activate",
                    label: "Activer",
                    onClick: () => onAction("activate", record),
                    hidden: !isSuperAdmin || record.isActive || record.isDeleted
                },
                {
                    key: "deactivate",
                    label: "Désactiver",
                    onClick: () => onAction("deactivate", record),
                    hidden: !isSuperAdmin || !record.isActive
                },
                {
                    key: "softDelete",
                    label: "Supprimer",
                    danger: true,
                    onClick: () => onAction("softDelete", record),
                    hidden: !isSuperAdmin || record.isDeleted
                },
                {
                    key: "restore",
                    label: "Restaurer",
                    onClick: () => onAction("restore", record),
                    hidden: !isSuperAdmin || !record.isDeleted
                },
                {
                    key: "hardDelete",
                    label: "Supprimer définitivement",
                    danger: true,
                    onClick: () => onAction("hardDelete", record),
                    hidden: !isSuperAdmin || !record.isDeleted
                }
            ];

            return <TableActionDropdown items={items} />;
        }
    }
];
