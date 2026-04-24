import { Space, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { IOrderItemEntity } from "@/modules/commerce/domain/entities/IOrderItemEntity";
import { Colors } from "@/shared/presentation/constants/theme";
import { IconCheckCircleFilled, IconCloseCircleFilled } from "@/shared/presentation/ui/Icons";
import type { ITableActionItem } from "@/shared/presentation/ui/TableActionDropdown";
import TableActionDropdown from "@/shared/presentation/ui/TableActionDropdown";

const { Text } = Typography;

/**
 * Generates Ant Design table column definitions for the order items table.
 *
 * @description
 * Builds columns for content type, category name, promotion level,
 * social boost flag, bonus flag, attached pricing tiers, and an
 * actions column for managing items and tiers (only on draft orders).
 *
 * @param onAddTier - Callback to add a pricing tier to an item
 * @param onRemoveItem - Callback to remove an item from the order
 * @param onRemoveTier - Callback to remove a tier from an item
 * @param isDraft - Whether the order is in Draft status (enables actions)
 * @returns Column configuration for the Ant Design Table
 */
export const orderItemsTableColumns = (
    onAddTier?: (itemId: string, categoryName: string) => void,
    onRemoveItem?: (itemId: string) => void,
    onRemoveTier?: (itemId: string, tierId: string) => void,
    onEditItem?: (item: IOrderItemEntity) => void,
    isDraft?: boolean
): ColumnsType<IOrderItemEntity> => [
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
        render: (boost: boolean) =>
            boost ? (
                <IconCheckCircleFilled style={{ color: Colors.Success, fontSize: 18 }} />
            ) : (
                <IconCloseCircleFilled style={{ color: Colors.Error, fontSize: 18 }} />
            )
    },
    {
        title: "Bonus",
        dataIndex: "isBonus",
        key: "isBonus",
        width: 80,
        align: "center",
        render: (bonus: boolean) =>
            bonus ? (
                <IconCheckCircleFilled style={{ color: Colors.Success, fontSize: 18 }} />
            ) : (
                <IconCloseCircleFilled style={{ color: Colors.Error, fontSize: 18 }} />
            )
    },
    {
        title: "Tranches",
        dataIndex: "tiers",
        key: "tiers",
        width: 250,
        render: (_: unknown, record: IOrderItemEntity) =>
            (record.tiers ?? []).length > 0 ? (
                <Space size={[4, 4]} wrap>
                    {record.tiers.map((tier) => (
                        <Tag
                            key={tier.id}
                            closable={isDraft && !!onRemoveTier}
                            onClose={(e) => {
                                e.preventDefault();
                                onRemoveTier?.(record.id, tier.id);
                            }}
                        >
                            {tier.tierName}: ${tier.priceSnapshotUsd.toFixed(2)}
                        </Tag>
                    ))}
                </Space>
            ) : (
                <Text type="secondary">Aucune</Text>
            )
    },
    ...(isDraft && (onAddTier || onRemoveItem)
        ? [
              {
                  title: "Actions",
                  key: "actions",
                  width: 80,
                  fixed: "end" as const,
                  align: "center" as const,
                  render: (_: unknown, record: IOrderItemEntity) => {
                      const items: ITableActionItem[] = [];

                      if (onEditItem) {
                          items.push({
                              key: "editItem",
                              label: "Modifier le produit",
                              onClick: () => onEditItem(record)
                          });
                      }

                      if (onAddTier) {
                          items.push({
                              key: "addTier",
                              label: "Ajouter une tranche",
                              onClick: () => onAddTier(record.id, record.categoryName)
                          });
                      }

                      if (onRemoveItem) {
                          items.push({
                              key: "removeItem",
                              label: "Supprimer le produit",
                              danger: true,
                              onClick: () => onRemoveItem(record.id)
                          });
                      }

                      return <TableActionDropdown items={items} />;
                  }
              }
          ]
        : [])
];
