import { Button, Card, Descriptions, Image, Space, Typography } from "antd";
import type { FC } from "react";
import type { IPaymentEntity } from "@/modules/commerce/domain/entities/IPaymentEntity";
import OrderStatusTag from "@/modules/commerce/presentation/components/ui/OrderStatusTag";

const { Title, Text } = Typography;

/**
 * Props for the PaymentSection component.
 *
 * @interface IPaymentSectionProps
 *
 * @property {IPaymentEntity | null} payment - Payment record, or null if none exists
 * @property {boolean} loading - Whether the payment record is loading
 * @property {boolean} isPendingPayment - Whether the order is in PendingPayment status
 * @property {() => void} onAttachProof - Handler to open the proof-upload modal
 * @property {() => void} onVerify - Handler to verify the payment
 * @property {() => void} onReject - Handler to reject the payment
 */
interface IPaymentSectionProps {
    payment: IPaymentEntity | null;
    loading: boolean;
    isPendingPayment: boolean;
    onAttachProof: () => void;
    onVerify: () => void;
    onReject: () => void;
}

/**
 * Payment section within the order detail view.
 *
 * @component
 *
 * @description
 * Renders payment status, details card, proof preview, and
 * verify/reject action buttons. Shows contextual messages
 * based on the order and payment state (e.g. "attach proof"
 * when no proof exists, "verify/reject" when proof is uploaded).
 *
 * @param {IPaymentSectionProps} props - Component props
 * @returns {JSX.Element} The payment section card
 */
const PaymentSection: FC<IPaymentSectionProps> = ({
    payment,
    loading,
    isPendingPayment,
    onAttachProof,
    onVerify,
    onReject
}) => {
    if (loading) {
        return (
            <Card loading>
                <Title level={5}>Paiement</Title>
            </Card>
        );
    }

    if (!payment) {
        return (
            <Card>
                <Space orientation="vertical">
                    <Title level={5} style={{ margin: 0 }}>
                        Paiement
                    </Title>
                    <Text type="secondary">
                        {isPendingPayment
                            ? "Aucun paiement enregistré."
                            : "Le paiement sera disponible après soumission de la commande."}
                    </Text>
                    {isPendingPayment && (
                        <Button type="primary" onClick={onAttachProof}>
                            Attacher une preuve
                        </Button>
                    )}
                </Space>
            </Card>
        );
    }

    const isPending = payment.status === "Pending";

    return (
        <Card>
            <Space orientation="vertical" size="middle" style={{ width: "100%" }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >
                    <Title level={5} style={{ margin: 0 }}>
                        Paiement
                    </Title>
                    <OrderStatusTag status={payment.status} />
                </div>

                <Descriptions column={2} size="small" bordered>
                    <Descriptions.Item label="Montant">
                        ${payment.amountUsd.toFixed(2)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Mode de paiement">
                        {payment.paymentMethod ?? "—"}
                    </Descriptions.Item>
                    {payment.receiptUrl && (
                        <Descriptions.Item label="Reçu">
                            <a href={payment.receiptUrl} target="_blank" rel="noopener noreferrer">
                                Voir le reçu
                            </a>
                        </Descriptions.Item>
                    )}
                    {payment.verifiedAt && (
                        <Descriptions.Item label="Vérifié le">
                            {new Date(payment.verifiedAt).toLocaleString("fr-FR")}
                        </Descriptions.Item>
                    )}
                </Descriptions>

                {payment.paymentProof && (
                    <div>
                        <Text strong>Preuve de paiement :</Text>
                        <div style={{ marginTop: 8 }}>
                            <Image
                                width={200}
                                src={payment.paymentProof.storageUrl}
                                alt={payment.paymentProof.fileName}
                                fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                            />
                        </div>
                    </div>
                )}

                {isPending && isPendingPayment && (
                    <Space>
                        {!payment.paymentProof && (
                            <Button onClick={onAttachProof}>Attacher une preuve</Button>
                        )}
                        {payment.paymentProof && (
                            <>
                                <Button type="primary" onClick={onVerify}>
                                    Vérifier le paiement
                                </Button>
                                <Button danger onClick={onReject}>
                                    Rejeter
                                </Button>
                            </>
                        )}
                    </Space>
                )}
            </Space>
        </Card>
    );
};

export default PaymentSection;
