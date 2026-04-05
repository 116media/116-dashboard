import { Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import type { IPricingTierEntity } from "@/modules/lookup/domain/entities/IPricingTierEntity";
import {
    PRICING_TIER_DROPDOWN_ITEMS,
    type PricingTierAction
} from "@/modules/lookup/presentation/constants/lookup.pricing-tiers.dropdown";
import StatusTag from "@/shared/presentation/ui/StatusTag";
import type { ITableActionItem } from "@/shared/presentation/ui/TableActionDropdown";
import TableActionDropdown from "@/shared/presentation/ui/TableActionDropdown";

const { Text } = Typography;

export type { PricingTierAction };

/**
 * Generates Ant Design table column definitions for the pricing tiers table.
 *
 * @description
 * Defines columns for name, description, status, updated date, and an
 * action dropdown. All data columns are client-side sortable. Mutation
 * actions are hidden based on authorization level.
 *
 * @param onAction - Callback when a row action is triggered
 * @param isSuperAdmin - Whether the current user is a SuperAdmin
 * @returns Column configuration for the Ant Design Table
 */
export const pricingTiersTableColumns = (
    onAction: (action: PricingTierAction, pricingTier: IPricingTierEntity) => void,
    isSuperAdmin: boolean
): ColumnsType<IPricingTierEntity> => [
    {
        title: "Nom",
        dataIndex: "name",
        key: "name",
        width: 200,
        sorter: (a, b) => a.name.localeCompare(b.name),
        render: (name: string) => <Text strong>{name}</Text>
    },
    {
        title: "Description",
        dataIndex: "description",
        key: "description",
        width: 250,
        ellipsis: { showTitle: true },
        render: (description: string | null) => <Text type="secondary">{description ?? "—"}</Text>
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
        fixed: "end",
        align: "center",
        sorter: (a, b) => {
            const order = (r: IPricingTierEntity) => (r.isActive ? 0 : 1);
            return order(a) - order(b);
        },
        render: (_: boolean, record: IPricingTierEntity) => (
            <StatusTag status={record.isActive ? "active" : "inactive"} />
        )
    },
    {
        width: 65,
        fixed: "end",
        key: "actions",
        align: "center",
        title: "Actions",
        render: (_: unknown, record: IPricingTierEntity) => {
            const items: ITableActionItem[] = PRICING_TIER_DROPDOWN_ITEMS.map((item) => ({
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
