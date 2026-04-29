import { Button, Card, Empty, Flex, Popconfirm, Space, Tag, Typography } from "antd";
import type { FC } from "react";
import type { IPackageSlotEntity } from "@/modules/catalog/domain/entities/IPackageSlotEntity";
import { IconDeleteFilled } from "@/shared/presentation/ui/Icons";
import styles from "./index.module.scss";

const { Text } = Typography;

/**
 * Props for the PackageSlotsList component.
 *
 * @interface IPackageSlotsListProps
 * @property {IPackageSlotEntity[]} slots - List of slots to display
 * @property {boolean} removeLoading - Loading state for the remove action
 * @property {(slotId: string) => Promise<void>} onRemove - Handler to remove a slot
 */
interface IPackageSlotsListProps {
    removeLoading: boolean;
    slots: IPackageSlotEntity[];
    onRemove: (slotId: string) => Promise<void>;
}

/**
 * Displays package slots as horizontal cards with delete action.
 *
 * @component
 *
 * @description
 * Renders each slot as a card showing the category name, quantity,
 * and a required/optional tag.
 *
 * @param {IPackageSlotsListProps} props - Component props
 * @returns {JSX.Element} The slots list or empty state
 */
const PackageSlotsList: FC<IPackageSlotsListProps> = ({ slots, removeLoading, onRemove }) => {
    if (slots.length === 0) {
        return (
            <Empty
                description="Aucun slot configuré"
                image={Empty.PRESENTED_IMAGE_DEFAULT}
                className={styles.packageSlotsList__empty}
            />
        );
    }

    return (
        <Space orientation="vertical" size="small" className={styles.packageSlotsList}>
            {slots.map((slot) => (
                <Card key={slot.id} size="small" hoverable variant="outlined">
                    <Flex justify="space-between" align="center">
                        <Flex gap={12} align="center">
                            <Text strong>{slot.categoryName ?? "Catégorie libre"}</Text>
                            <Text type="secondary">× {slot.quantity}</Text>
                            <Tag color={slot.isRequired ? "blue" : "default"}>
                                {slot.isRequired ? "Obligatoire" : "Optionnel"}
                            </Tag>
                        </Flex>

                        <Popconfirm
                            okText="Oui"
                            cancelText="Non"
                            placement="topLeft"
                            title="Supprimer ce slot ?"
                            onConfirm={() => onRemove(slot.id)}
                        >
                            <Button
                                ghost
                                danger
                                loading={removeLoading}
                                icon={<IconDeleteFilled />}
                            />
                        </Popconfirm>
                    </Flex>
                </Card>
            ))}
        </Space>
    );
};

export default PackageSlotsList;
