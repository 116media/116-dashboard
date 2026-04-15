import { Button, Flex } from "antd";
import type { FC } from "react";
import type { IPaymentEntity } from "@/modules/commerce/domain/entities/IPaymentEntity";
import { IconFileTextOutlined } from "@/shared/presentation/ui/Icons";
import styles from "../PaymentSection/index.module.scss";

/**
 * Props for the PaymentActions component.
 *
 * @interface IPaymentActionsProps
 *
 * @property {IPaymentEntity} payment - The payment record
 * @property {boolean} isPendingPayment - Whether the order is in PendingPayment status
 * @property {() => void} onAttachProof - Handler to open the proof-upload modal
 * @property {() => void} onVerify - Handler to verify the payment
 * @property {() => void} onReject - Handler to reject the payment
 */
interface IPaymentActionsProps {
    payment: IPaymentEntity;
    isPendingPayment: boolean;
    onAttachProof: () => void;
    onVerify: () => void;
    onReject: () => void;
}

/**
 * Action buttons for payment verification workflow.
 *
 * @component
 *
 * @description
 * Renders the receipt link, and when the payment is pending,
 * shows attach proof, verify, or reject buttons depending
 * on whether a proof file is already attached.
 *
 * @param {IPaymentActionsProps} props - Component props
 * @returns {JSX.Element} The payment action buttons
 */
const PaymentActions: FC<IPaymentActionsProps> = ({
    onReject,
    onVerify,
    payment,
    onAttachProof,
    isPendingPayment
}) => {
    const isPending = payment.status === "Pending";

    return (
        <>
            {payment.receiptUrl && (
                <Flex gap={8} align="flex-end">
                    <Button
                        type="dashed"
                        target="_blank"
                        href={payment.receiptUrl}
                        icon={<IconFileTextOutlined />}
                    >
                        Voir le reçu
                    </Button>
                </Flex>
            )}

            {isPending && isPendingPayment && (
                <Flex gap={8} className={styles.payment__actions}>
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
                </Flex>
            )}
        </>
    );
};

export default PaymentActions;
