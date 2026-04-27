import { Card, Flex, Typography } from "antd";
import { type FC, useMemo } from "react";
import type { IOrderDetailEntity } from "@/modules/commerce/domain/entities/IOrderDetailEntity";
import { ORDER_STATUS_CONFIG } from "@/modules/commerce/presentation/constants/order.status.config";
import DetailField from "@/shared/presentation/ui/DetailField";
import {
    IconCalendarOutlined,
    IconClockCircleOutlined,
    IconDollarOutlined,
    IconTagOutlined
} from "@/shared/presentation/ui/Icons";
import SplitActionButton, {
    type ISplitActionItem
} from "@/shared/presentation/ui/SplitActionButton";
import StatusTag from "@/shared/presentation/ui/StatusTag";
import { dayjs } from "@/shared/presentation/utils/dayjs/dayjs.utils";
import styles from "./index.module.scss";

const { Title, Text } = Typography;

/**
 * Props for the OrderHeaderCard component.
 *
 * @interface IOrderHeaderCardProps
 *
 * @property {IOrderDetailEntity} order - The order to display
 * @property {boolean} isDraft - Whether the order is in Draft status
 * @property {boolean} isPendingPayment - Whether the order is in PendingPayment status
 * @property {boolean} actionsLoading - Whether an order action is in progress
 * @property {() => void} onEditOrder - Handler to open the edit order modal
 * @property {() => void} onAddItem - Handler to open the add-item modal
 * @property {() => void} onSubmitOrder - Handler to submit the order for payment
 * @property {() => void} onCancelOrder - Handler to cancel the order
 */
interface IOrderHeaderCardProps {
    isDraft: boolean;
    order: IOrderDetailEntity;
    actionsLoading: boolean;
    isPendingPayment: boolean;
    onAddItem: () => void;
    onEditOrder: () => void;
    onSubmitOrder: () => void;
    onCancelOrder: () => void;
}

/**
 * Header card for the order detail view.
 *
 * @component
 *
 * @description
 * Displays the order customer name, status badge, action buttons,
 * and a SettingsField grid with order metadata (total, ID, dates).
 *
 * @param {IOrderHeaderCardProps} props - Component props
 * @returns {JSX.Element} The order header card
 */
const OrderHeaderCard: FC<IOrderHeaderCardProps> = ({
    order,
    isDraft,
    onAddItem,
    onEditOrder,
    actionsLoading,
    onSubmitOrder,
    onCancelOrder,
    isPendingPayment
}) => {
    const actions = useMemo<ISplitActionItem[]>(
        () => [
            { key: "edit", label: "Modifier", onClick: onEditOrder, hidden: !isDraft },
            { key: "add-item", label: "Ajouter un produit", onClick: onAddItem, hidden: !isDraft },
            { key: "submit", label: "Soumettre", onClick: onSubmitOrder, hidden: !isDraft },
            {
                key: "cancel",
                label: "Annuler",
                danger: true,
                onClick: onCancelOrder,
                hidden: !isDraft && !isPendingPayment
            }
        ],
        [isDraft, isPendingPayment, onEditOrder, onAddItem, onSubmitOrder, onCancelOrder]
    );

    return (
        <Card>
            <Flex justify="space-between" gap={24} align="center" className={styles.orderHeader}>
                <Flex align="center" justify="space-between" flex={1}>
                    <Title level={4} className={styles.orderHeader__title}>
                        {order.customerName}
                    </Title>
                    <StatusTag status={order.status} config={ORDER_STATUS_CONFIG} />
                </Flex>

                <SplitActionButton loading={actionsLoading} items={actions} />
            </Flex>

            <Text type="secondary" strong className={styles.orderHeader__sectionLabel}>
                Détails de la commande
            </Text>

            <div className={styles.orderHeader__grid}>
                <DetailField
                    label="Total"
                    icon={<IconDollarOutlined />}
                    value={`$${(order.totalAmountUsd ?? 0).toFixed(2)}`}
                />
                <DetailField label="ID" value={order.id} icon={<IconTagOutlined />} copyable />
                <DetailField
                    label="Créée le"
                    icon={<IconClockCircleOutlined />}
                    value={
                        order.createdAt
                            ? dayjs(order.createdAt).format("DD/MM/YYYY HH:mm")
                            : undefined
                    }
                />
                <DetailField
                    label="Mise à jour"
                    icon={<IconCalendarOutlined />}
                    value={
                        order.updatedAt
                            ? dayjs(order.updatedAt).format("DD/MM/YYYY HH:mm")
                            : undefined
                    }
                />
            </div>
        </Card>
    );
};

export default OrderHeaderCard;
