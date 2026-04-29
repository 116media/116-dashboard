import { Button, Card, Empty, Flex, InputNumber, Popconfirm, Space, Typography } from "antd";
import { type FC, useState } from "react";
import type { ICategoryPricingEntity } from "@/modules/catalog/domain/entities/ICategoryPricingEntity";
import { IconDeleteFilled, IconEditOutlined } from "@/shared/presentation/ui/Icons";
import styles from "./index.module.scss";

const { Text } = Typography;

/**
 * Props for the CategoryPricingList component.
 *
 * @interface ICategoryPricingListProps
 * @property {ICategoryPricingEntity[]} pricing - List of pricing tiers to display
 * @property {boolean} updateLoading - Loading state for the update action
 * @property {boolean} removeLoading - Loading state for the remove action
 * @property {(pricingId: string, priceUsd: number) => Promise<void>} onUpdate - Handler to update a pricing tier's price
 * @property {(pricingId: string) => Promise<void>} onRemove - Handler to remove a pricing tier
 */
interface ICategoryPricingListProps {
    pricing: ICategoryPricingEntity[];
    updateLoading: boolean;
    removeLoading: boolean;
    onUpdate: (pricingId: string, priceUsd: number) => Promise<void>;
    onRemove: (pricingId: string) => Promise<void>;
}

/**
 * Displays category pricing tiers as horizontal cards with inline edit and delete.
 *
 * @component
 *
 * @description
 * Renders each pricing tier as a card showing the tier name and price..
 *
 * @param {ICategoryPricingListProps} props - Component props
 * @returns {JSX.Element} The pricing list or empty state
 */
const CategoryPricingList: FC<ICategoryPricingListProps> = ({
    pricing,
    onUpdate,
    onRemove,
    updateLoading,
    removeLoading
}) => {
    const [editValue, setEditValue] = useState<number>(0);
    const [editingId, setEditingId] = useState<string | null>(null);

    const handleStartEdit = (item: ICategoryPricingEntity) => {
        setEditingId(item.tierId);
        setEditValue(item.priceUsd);
    };

    const handleSaveEdit = async (pricingId: string) => {
        await onUpdate(pricingId, editValue);
        setEditingId(null);
    };

    if (pricing.length === 0) {
        return (
            <Empty
                description="Aucun tarif configuré"
                image={Empty.PRESENTED_IMAGE_DEFAULT}
                className={styles.categoryPricingList__empty}
            />
        );
    }

    return (
        <Space orientation="vertical" size="small" className={styles.categoryPricingList}>
            {pricing.map((item) => (
                <Card key={item.tierId} size="small" hoverable variant="outlined">
                    <Flex justify="space-between" align="center">
                        <Flex gap={12} align="center">
                            <Text strong>{item.tierName}</Text>
                            {editingId === item.tierId ? (
                                <InputNumber
                                    min={0}
                                    step={0.5}
                                    size="small"
                                    value={editValue}
                                    onChange={(v) => setEditValue(v ?? 0)}
                                />
                            ) : (
                                <Text type="secondary">${item.priceUsd.toFixed(2)} USD</Text>
                            )}
                        </Flex>

                        <Flex gap={6}>
                            {editingId === item.tierId ? (
                                <>
                                    <Button
                                        size="small"
                                        type="primary"
                                        loading={updateLoading}
                                        onClick={() => handleSaveEdit(item.tierId)}
                                    >
                                        Enregistrer
                                    </Button>
                                    <Button size="small" onClick={() => setEditingId(null)}>
                                        Annuler
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button
                                        ghost
                                        type="primary"
                                        icon={<IconEditOutlined />}
                                        onClick={() => handleStartEdit(item)}
                                    />
                                    <Popconfirm
                                        okText="Oui"
                                        cancelText="Non"
                                        placement="topLeft"
                                        title="Supprimer ce tarif ?"
                                        onConfirm={() => onRemove(item.tierId)}
                                    >
                                        <Button
                                            danger
                                            type="primary"
                                            loading={removeLoading}
                                            icon={<IconDeleteFilled />}
                                        />
                                    </Popconfirm>
                                </>
                            )}
                        </Flex>
                    </Flex>
                </Card>
            ))}
        </Space>
    );
};

export default CategoryPricingList;
