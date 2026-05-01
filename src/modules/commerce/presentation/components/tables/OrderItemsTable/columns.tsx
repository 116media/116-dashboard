import { Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { IOrderItemEntity } from "@/modules/commerce/domain/entities/IOrderItemEntity";

const { Text } = Typography;

/**
 * Generates Ant Design table column definitions for the order items table.
 *
 * @description
 * Builds columns for content type, category name, promotion level,
 * social boost flag, bonus flag, and attached pricing tiers.
 * Used in the order detail view to display line items.
 *
 * @returns Column configuration for the Ant Design Table
 */
export const orderItemsTableColumns = (): ColumnsType<IOrderItemEntity> => [
    {
        title: "Type",
        dataIndex: "contentKind",
        key: "contentKind",
        width: 100,
        render: (kind: string) => <Tag>{kind}</Tag>
    },
    {
        title: "Catégorie",
        dataIndex: "categoryName",
        key: "categoryName",
        width: 180,
        ellipsis: true,
        render: (name: string) => <Text strong>{name}</Text>
    },
    {
        title: "Promotion",
        dataIndex: "promotionLevelName",
        key: "promotionLevelName",
        width: 150,
        render: (name: string | null, record: IOrderItemEntity) =>
            name ? (
                <Text>
                    {name}
                    {record.promoPriceUsd != null && (
                        <Text type="secondary"> — ${record.promoPriceUsd.toFixed(2)}</Text>
                    )}
                </Text>
            ) : (
                <Text type="secondary">—</Text>
            )
    },
    {
        title: "Boost",
        dataIndex: "socialBoost",
        key: "socialBoost",
        width: 80,
        align: "center",
        render: (boost: boolean) => (
            <Tag color={boost ? "blue" : "default"}>{boost ? "Oui" : "Non"}</Tag>
        )
    },
    {
        title: "Bonus",
        dataIndex: "isBonus",
        key: "isBonus",
        width: 80,
        align: "center",
        render: (bonus: boolean) => (
            <Tag color={bonus ? "green" : "default"}>{bonus ? "Oui" : "Non"}</Tag>
        )
    },
    {
        title: "Tranches",
        dataIndex: "tiers",
        key: "tiers",
        width: 200,
        render: (_: unknown, record: IOrderItemEntity) =>
            record.tiers.length > 0 ? (
                record.tiers.map((tier) => (
                    <Tag key={tier.tierName}>
                        {tier.tierName}: ${tier.priceSnapshotUsd.toFixed(2)}
                    </Tag>
                ))
            ) : (
                <Text type="secondary">Aucune</Text>
            )
    }
];
