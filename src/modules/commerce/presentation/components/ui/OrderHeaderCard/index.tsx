import { Button, Card, Flex, Space, Typography } from "antd";
import type { FC } from "react";
import type { IOrderDetailEntity } from "@/modules/commerce/domain/entities/IOrderDetailEntity";
import { ORDER_STATUS_CONFIG } from "@/modules/commerce/presentation/constants/order.status.config";
import SettingsField from "@/platform/settings/presentation/components/ui/SettingsField";
import {
    IconCalendarOutlined,
    IconClockCircleOutlined,
    IconDollarOutlined,
    IconTagOutlined
} from "@/shared/presentation/ui/Icons";
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
}) => (
    <Card>
        <Flex justify="space-between" align="center" className={styles.orderHeader}>
            <Flex align="center" justify="space-between" flex={1}>
                <Title level={4} className={styles.orderHeader__title}>
                    {order.customerName}
                </Title>
                <StatusTag status={order.status} config={ORDER_STATUS_CONFIG} />
            </Flex>

            <Space>
                {isDraft && (
                    <>
                        <Button onClick={onEditOrder}>Modifier</Button>
                        <Button onClick={onAddItem}>Ajouter un produit</Button>
                        <Button type="primary" loading={actionsLoading} onClick={onSubmitOrder}>
                            Soumettre
                        </Button>
                    </>
                )}
                {(isDraft || isPendingPayment) && (
                    <Button danger loading={actionsLoading} onClick={onCancelOrder}>
                        Annuler
                    </Button>
                )}
            </Space>
        </Flex>

        <Text type="secondary" strong className={styles.orderHeader__sectionLabel}>
            Détails de la commande
        </Text>

        <div className={styles.orderHeader__grid}>
            <SettingsField
                label="Total"
                value={`$${(order.totalAmountUsd ?? 0).toFixed(2)}`}
                icon={<IconDollarOutlined />}
            />
            <SettingsField label="ID" value={order.id} icon={<IconTagOutlined />} />
            <SettingsField
                label="Créée le"
                value={
                    order.createdAt ? dayjs(order.createdAt).format("DD/MM/YYYY HH:mm") : undefined
                }
                icon={<IconClockCircleOutlined />}
            />
            <SettingsField
                label="Mise à jour"
                value={
                    order.updatedAt ? dayjs(order.updatedAt).format("DD/MM/YYYY HH:mm") : undefined
                }
                icon={<IconCalendarOutlined />}
            />
        </div>
    </Card>
);

export default OrderHeaderCard;
