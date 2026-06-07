import { Flex, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { IPromotionLevelEntity } from "@/modules/lookup/domain/entities/IPromotionLevelEntity";
import {
    PROMOTION_LEVEL_DROPDOWN_ITEMS,
    type PromotionLevelAction
} from "@/modules/lookup/presentation/constants/lookup.promotion-levels.dropdown";
import { ENTITY_STATUS_CONFIG } from "@/shared/presentation/constants/entity.status.config";
import { Colors } from "@/shared/presentation/constants/theme";
import { IconStopOutlined } from "@/shared/presentation/ui/Icons";
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
        width: 200,
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
        title: "Spot",
        dataIndex: "spotPriority",
        key: "spotPriority",
        width: 200,
        defaultSortOrder: "ascend",
        sorter: (a, b) => (a.spotPriority ?? 4) - (b.spotPriority ?? 4),
        render: (spot: number | null) => {
            if (!spot) return <IconStopOutlined style={{ color: Colors.Error, fontSize: 18 }} />;
            const labels: Record<number, string> = {
                1: "Carrousel héros",
                2: "Carrousel latéral",
                3: "Binôme inférieur"
            };
            return (
                <Flex gap={8} align="center">
                    <Tag color="purple-inverse">Spot {spot}</Tag>
                    <Text type="secondary">{labels[spot] ?? `Spot ${spot}`}</Text>
                </Flex>
            );
        }
    },
    {
        title: "Statut",
        dataIndex: "isActive",
        key: "status",
        width: 100,
        fixed: "end",
        sorter: (a, b) => {
            const order = (r: IPromotionLevelEntity) => (r.isActive ? 0 : 1);
            return order(a) - order(b);
        },
        render: (_: boolean, record: IPromotionLevelEntity) => (
            <StatusTag
                status={record.isActive ? "active" : "inactive"}
                config={ENTITY_STATUS_CONFIG}
            />
        )
    },
    {
        width: 65,
        key: "actions",
        fixed: "end",
        align: "center",
        title: "Actions",
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
