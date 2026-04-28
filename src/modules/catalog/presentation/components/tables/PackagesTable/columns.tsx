import { Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { IPackageEntity } from "@/modules/catalog/domain/entities/IPackageEntity";
import {
    PACKAGE_DROPDOWN_ITEMS,
    type PackageAction
} from "@/modules/catalog/presentation/constants/catalog.packages.dropdown";
import StatusTag from "@/shared/presentation/ui/StatusTag";
import type { ITableActionItem } from "@/shared/presentation/ui/TableActionDropdown";
import TableActionDropdown from "@/shared/presentation/ui/TableActionDropdown";

const { Text } = Typography;

export type { PackageAction };

/**
 * Generates Ant Design table column definitions for the packages table.
 *
 * @description
 * Defines columns for name, flat price, slots count, active status,
 * and an action dropdown. Mutation actions are hidden based on
 * authorization level.
 *
 * @param onAction - Callback when a row action is triggered
 * @param isSuperAdmin - Whether the current user is a SuperAdmin
 * @param isAdminOrSuperAdmin - Whether the current user is Admin or SuperAdmin
 * @returns Column configuration for the Ant Design Table
 */
export const packagesTableColumns = (
    onAction: (action: PackageAction, pkg: IPackageEntity) => void,
    isSuperAdmin: boolean,
    isAdminOrSuperAdmin: boolean
): ColumnsType<IPackageEntity> => [
    {
        title: "Nom",
        dataIndex: "name",
        key: "name",
        width: 200,
        sorter: (a, b) => a.name.localeCompare(b.name),
        render: (name: string) => <Text strong>{name}</Text>
    },
    {
        title: "Prix (USD)",
        dataIndex: "flatPriceUsd",
        key: "flatPriceUsd",
        width: 120,
        sorter: (a, b) => a.flatPriceUsd - b.flatPriceUsd,
        render: (value: number) => `${value.toFixed(2)} $`
    },
    {
        title: "Slots",
        key: "slots",
        width: 80,
        align: "center",
        render: (_: unknown, record: IPackageEntity) => record.slots.length
    },
    {
        title: "Statut",
        dataIndex: "isActive",
        key: "status",
        width: 100,
        align: "center",
        render: (_: boolean, record: IPackageEntity) => (
            <StatusTag status={record.isActive ? "active" : "inactive"} />
        )
    },
    {
        title: "Actions",
        key: "actions",
        width: 80,
        fixed: "right",
        align: "center",
        render: (_: unknown, record: IPackageEntity) => {
            const items: ITableActionItem[] = PACKAGE_DROPDOWN_ITEMS.map((item) => ({
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
