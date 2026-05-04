import { Button, Card, Space, Typography } from "antd";
import type { FC } from "react";
import styles from "../PaymentSection/index.module.scss";

const { Title, Text } = Typography;

/**
 * Props for the PaymentEmptyState component.
 *
 * @interface IPaymentEmptyStateProps
 *
 * @property {boolean} isPendingPayment - Whether the order is in PendingPayment status
 * @property {() => void} onAttachProof - Handler to open the proof-upload modal
 */
interface IPaymentEmptyStateProps {
    isPendingPayment: boolean;
    onAttachProof: () => void;
}

/**
 * Empty state card shown when no payment record exists.
 *
 * @component
 *
 * @description
 * Displays a message indicating no payment is available,
 * with an optional button to attach proof when the order
 * is in PendingPayment status.
 *
 * @param {IPaymentEmptyStateProps} props - Component props
 * @returns {JSX.Element} The empty state card
 */
const PaymentEmptyState: FC<IPaymentEmptyStateProps> = ({ isPendingPayment, onAttachProof }) => (
    <Card>
        <Space orientation="vertical">
            <Title level={5} className={styles.payment__title}>
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

export default PaymentEmptyState;
