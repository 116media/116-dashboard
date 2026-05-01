import { Button, Descriptions, Space, Table, Typography } from "antd";
import type { FC } from "react";
import type { IOrderDetailEntity } from "@/modules/commerce/domain/entities/IOrderDetailEntity";
import type { IPaymentEntity } from "@/modules/commerce/domain/entities/IPaymentEntity";
import { orderItemsTableColumns } from "@/modules/commerce/presentation/components/tables/OrderItemsTable/columns";
import OrderStatusTag from "@/modules/commerce/presentation/components/ui/OrderStatusTag";
import PaymentSection from "@/modules/commerce/presentation/components/ui/PaymentSection";

const { Title, Text } = Typography;

/**
 * Props for the OrderDetailView component.
 *
 * @interface IOrderDetailViewProps
 *
 * @property {IOrderDetailEntity} order - The order to display
 * @property {IPaymentEntity | null} payment - Associated payment record
 * @property {boolean} loadingPayment - Whether the payment record is loading
 * @property {() => void} onSubmitOrder - Handler to submit the order for payment
 * @property {() => void} onCancelOrder - Handler to cancel the order
 * @property {() => void} onAddItem - Handler to open the add-item modal
 * @property {() => void} onAttachProof - Handler to open the payment-proof modal
 * @property {() => void} onVerifyPayment - Handler to verify the payment
 * @property {() => void} onRejectPayment - Handler to reject the payment
 * @property {boolean} actionsLoading - Whether an order action is in progress
 */
interface IOrderDetailViewProps {
    order: IOrderDetailEntity;
    payment: IPaymentEntity | null;
    loadingPayment: boolean;
    onSubmitOrder: () => void;
    onCancelOrder: () => void;
    onAddItem: () => void;
    onAttachProof: () => void;
    onVerifyPayment: () => void;
    onRejectPayment: () => void;
    actionsLoading: boolean;
}

/**
 * Detail view for a single order with items and payment.
 *
 * @component
 *
 * @description
 * Renders the full order detail page including a header with
 * customer name, status badge, total amount, and action buttons.
 * Below the header it shows the order items table and the
 * payment section with proof upload and verify/reject controls.
 *
 * @param {IOrderDetailViewProps} props - Component props
 * @returns {JSX.Element} The order detail view
 */
const OrderDetailView: FC<IOrderDetailViewProps> = ({
    order,
    payment,
    loadingPayment,
    onSubmitOrder,
    onCancelOrder,
    onAddItem,
    onAttachProof,
    onVerifyPayment,
    onRejectPayment,
    actionsLoading
}) => {
    const isDraft = order.status === "Draft";
    const isPendingPayment = order.status === "PendingPayment";

    return (
        <div>
            <Space orientation="vertical" size="large" style={{ width: "100%" }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >
                    <Space orientation="vertical" size="small">
                        <Title level={4} style={{ margin: 0 }}>
                            {order.customerName}
                        </Title>
                        <Space>
                            <OrderStatusTag status={order.status} />
                            <Text type="secondary">Total: ${order.totalAmountUsd.toFixed(2)}</Text>
                        </Space>
                    </Space>

                    <Space>
                        {isDraft && (
                            <>
                                <Button onClick={onAddItem}>Ajouter un article</Button>
                                <Button
                                    type="primary"
                                    loading={actionsLoading}
                                    onClick={onSubmitOrder}
                                >
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
                </div>

                <Descriptions column={2} size="small" bordered>
                    <Descriptions.Item label="ID">
                        <Text copyable>{order.id}</Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="Créée le">
                        {order.createdAt ? new Date(order.createdAt).toLocaleString("fr-FR") : "—"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Mise à jour">
                        {order.updatedAt ? new Date(order.updatedAt).toLocaleString("fr-FR") : "—"}
                    </Descriptions.Item>
                </Descriptions>

                <div>
                    <Title level={5}>Articles ({order.items.length})</Title>
                    <Table
                        rowKey="id"
                        size="small"
                        pagination={false}
                        columns={orderItemsTableColumns()}
                        dataSource={order.items}
                    />
                </div>

                <PaymentSection
                    payment={payment}
                    loading={loadingPayment}
                    isPendingPayment={isPendingPayment}
                    onAttachProof={onAttachProof}
                    onVerify={onVerifyPayment}
                    onReject={onRejectPayment}
                />
            </Space>
        </div>
    );
};

export default OrderDetailView;
