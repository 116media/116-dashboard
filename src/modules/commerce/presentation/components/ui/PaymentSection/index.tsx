import { Card, Flex, Typography } from "antd";
import type { FC } from "react";
import type { IPaymentEntity } from "@/modules/commerce/domain/entities/IPaymentEntity";
import OrderStatusTag from "@/modules/commerce/presentation/components/ui/OrderStatusTag";
import PaymentActions from "@/modules/commerce/presentation/components/ui/PaymentActions";
import PaymentDetailsGrid from "@/modules/commerce/presentation/components/ui/PaymentDetailsGrid";
import PaymentEmptyState from "@/modules/commerce/presentation/components/ui/PaymentEmptyState";
import PaymentProofPreview from "@/modules/commerce/presentation/components/ui/PaymentProofPreview";
import styles from "./index.module.scss";

const { Title, Text } = Typography;

/**
 * Props for the PaymentSection component.
 *
 * @interface IPaymentSectionProps
 *
 * @property {IPaymentEntity | null} payment - Payment record, or null if none exists
 * @property {boolean} loading - Whether the payment record is loading
 * @property {boolean} isPendingPayment - Whether the order is in PendingPayment status
 * @property {string} [customerName] - Customer name from the order
 * @property {() => void} onAttachProof - Handler to open the proof-upload modal
 * @property {() => void} onVerify - Handler to verify the payment
 * @property {() => void} onReject - Handler to reject the payment
 */
interface IPaymentSectionProps {
    loading: boolean;
    onVerify: () => void;
    onReject: () => void;
    customerName?: string;
    isPendingPayment: boolean;
    onAttachProof: () => void;
    payment: IPaymentEntity | null;
}

/**
 * Payment section within the order detail view.
 *
 * @component
 *
 * @description
 * Orchestrates the payment card layout with loading, empty,
 * and detail states. Delegates rendering to PaymentEmptyState,
 * PaymentDetailsGrid, PaymentActions, and PaymentProofPreview.
 *
 * @param {IPaymentSectionProps} props - Component props
 * @returns {JSX.Element} The payment section card
 */
const PaymentSection: FC<IPaymentSectionProps> = ({
    payment,
    loading,
    isPendingPayment,
    customerName,
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
            <PaymentEmptyState isPendingPayment={isPendingPayment} onAttachProof={onAttachProof} />
        );
    }

    const proofUrl = payment.paymentProof?.storageUrl;
    const proofFileName = payment.paymentProof?.fileName ?? "";
    const hasProof = !!payment.paymentProof && !!proofUrl;

    return (
        <Card>
            <Flex justify="space-between" align="center" className={styles.payment__header}>
                <Title level={5} className={styles.payment__title}>
                    Paiement
                </Title>
                <OrderStatusTag status={payment.status} />
            </Flex>

            <Flex gap={12} align="stretch">
                <div className={styles.payment__details}>
                    <Text type="secondary" strong className={styles.payment__sectionLabel}>
                        Détails du paiement
                    </Text>

                    <PaymentDetailsGrid payment={payment} customerName={customerName} />
                    <br />
                    <PaymentActions
                        payment={payment}
                        isPendingPayment={isPendingPayment}
                        onAttachProof={onAttachProof}
                        onVerify={onVerify}
                        onReject={onReject}
                    />
                </div>

                {hasProof && <PaymentProofPreview proofUrl={proofUrl} fileName={proofFileName} />}
            </Flex>
        </Card>
    );
};

export default PaymentSection;
