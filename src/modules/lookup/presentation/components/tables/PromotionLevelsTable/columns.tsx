import { Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { IPromotionLevelEntity } from "@/modules/lookup/domain/entities/IPromotionLevelEntity";
import {
    PROMOTION_LEVEL_DROPDOWN_ITEMS,
    type PromotionLevelAction
} from "@/modules/lookup/presentation/constants/lookup.promotion-levels.dropdown";
import StatusTag from "@/shared/presentation/ui/StatusTag";
import type { ITableActionItem } from "@/shared/presentation/ui/TableActionDropdown";
import TableActionDropdown from "@/shared/presentation/ui/TableActionDropdown";

const { Text } = Typography;

export type { PromotionLevelAction };

/**
 * Generates Ant Design table column definitions for the promotion levels table.
 *
 * @description
 * Defines columns for name, duration, price, status, and an action dropdown.
 * All data columns are client-side sortable. Mutation actions are hidden
 * based on authorization level.
 *
 * @param onAction - Callback when a row action is triggered
 * @param isSuperAdmin - Whether the current user is a SuperAdmin
 * @returns Column configuration for the Ant Design Table
 */
export const promotionLevelsTableColumns = (
    onAction: (action: PromotionLevelAction, promotionLevel: IPromotionLevelEntity) => void,
    isSuperAdmin: boolean
): ColumnsType<IPromotionLevelEntity> => [
    {
        title: "Nom",
        dataIndex: "name",
        key: "name",
        sorter: (a, b) => a.name.localeCompare(b.name),
        render: (name: string) => <Text strong>{name}</Text>
    },
    {
        title: "Durée",
        dataIndex: "durationDays",
        key: "durationDays",
        width: 120,
        sorter: (a, b) => a.durationDays - b.durationDays,
        render: (days: number) => <Text type="secondary">{days} jours</Text>
    },
    {
        title: "Prix",
        dataIndex: "priceUsd",
        key: "priceUsd",
        width: 120,
        sorter: (a, b) => a.priceUsd - b.priceUsd,
        render: (price: number) => <Text type="secondary">${price} USD</Text>
    },
    {
        title: "Statut",
        dataIndex: "isActive",
        key: "status",
        width: 100,
        sorter: (a, b) => {
            const order = (r: IPromotionLevelEntity) => (r.isActive ? 0 : 1);
            return order(a) - order(b);
        },
        render: (_: boolean, record: IPromotionLevelEntity) => (
            <StatusTag status={record.isActive ? "active" : "inactive"} />
        )
    },
    {
        width: 65,
        key: "actions",
        align: "center" as const,
        render: (_: unknown, record: IPromotionLevelEntity) => {
            const items: ITableActionItem[] = PROMOTION_LEVEL_DROPDOWN_ITEMS.map((item) => ({
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
