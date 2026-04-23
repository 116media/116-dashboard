import { Col, Row } from "antd";
import type { FC } from "react";
import type { IPaymentEntity } from "@/modules/commerce/domain/entities/IPaymentEntity";
import DetailField from "@/shared/presentation/ui/DetailField";
import {
    IconClockCircleOutlined,
    IconCreditCardOutlined,
    IconDollarOutlined,
    IconTeamOutlined,
    IconUserOutlined
} from "@/shared/presentation/ui/Icons";
import { dayjs } from "@/shared/presentation/utils/dayjs/dayjs.utils";

const PAYMENT_METHOD_LABELS: Record<string, string> = {
    Cash: "Cash",
    MobileMoney: "Mobile Money",
    BankTransfer: "Virement bancaire"
};

/**
 * Props for the PaymentDetailsGrid component.
 *
 * @interface IPaymentDetailsGridProps
 *
 * @property {IPaymentEntity} payment - The payment record to display
 * @property {string} [customerName] - Customer name from the order
 */
interface IPaymentDetailsGridProps {
    customerName?: string;
    payment: IPaymentEntity;
}

/**
 * Grid of SettingsField cards showing payment metadata.
 *
 * @component
 *
 * @description
 * Renders amount, payment method, verification info, and customer
 * name in a responsive two-column grid using Ant Design Row/Col.
 *
 * @param {IPaymentDetailsGridProps} props - Component props
 * @returns {JSX.Element} The payment details grid
 */
const PaymentDetailsGrid: FC<IPaymentDetailsGridProps> = ({ payment, customerName }) => (
    <Row gutter={[12, 12]}>
        <Col xs={24} sm={12}>
            <DetailField
                label="Montant"
                icon={<IconDollarOutlined />}
                value={`$${(payment.amountUsd ?? 0).toFixed(2)}`}
            />
        </Col>
        <Col xs={24} sm={12}>
            <DetailField
                label="Mode de paiement"
                icon={<IconCreditCardOutlined />}
                value={
                    payment.paymentMethod
                        ? (PAYMENT_METHOD_LABELS[payment.paymentMethod] ?? payment.paymentMethod)
                        : undefined
                }
            />
        </Col>
        {payment.verifiedAt && (
            <Col xs={24} sm={12}>
                <DetailField
                    label="Vérifié le"
                    icon={<IconClockCircleOutlined />}
                    value={dayjs(payment.verifiedAt).format("DD/MM/YYYY HH:mm")}
                />
            </Col>
        )}
        {payment.verifiedBy && (
            <Col xs={24} sm={12}>
                <DetailField
                    label="Vérifié par"
                    icon={<IconUserOutlined />}
                    value={payment.verifiedByUserName ?? payment.verifiedBy}
                />
            </Col>
        )}
        {customerName && (
            <Col xs={24} sm={12}>
                <DetailField label="Client" value={customerName} icon={<IconTeamOutlined />} />
            </Col>
        )}
    </Row>
);

export default PaymentDetailsGrid;
