import { Tag } from "antd";
import type { FC } from "react";
import { EnumOrderStatus, EnumPaymentStatus } from "@/shared/infrastructure/api/generated/116.api";

/**
 * Status configuration for order lifecycle states.
 */
const ORDER_STATUS_CONFIG: Record<EnumOrderStatus, { label: string; color: string }> = {
    [EnumOrderStatus.Draft]: { label: "Brouillon", color: "default" },
    [EnumOrderStatus.PendingPayment]: { label: "En attente", color: "warning" },
    [EnumOrderStatus.Paid]: { label: "Payé", color: "success" },
    [EnumOrderStatus.Cancelled]: { label: "Annulé", color: "error" }
};

/**
 * Status configuration for payment verification states.
 */
const PAYMENT_STATUS_CONFIG: Record<EnumPaymentStatus, { label: string; color: string }> = {
    [EnumPaymentStatus.Pending]: { label: "En attente", color: "warning" },
    [EnumPaymentStatus.Verified]: { label: "Vérifié", color: "success" },
    [EnumPaymentStatus.Rejected]: { label: "Rejeté", color: "error" }
};

/**
 * Props for the OrderStatusTag component.
 *
 * @interface IOrderStatusTagProps
 *
 * @property {EnumOrderStatus | EnumPaymentStatus} status - The status value to display
 */
interface IOrderStatusTagProps {
    status: EnumOrderStatus | EnumPaymentStatus;
}

/**
 * Status tag for order and payment lifecycle states.
 *
 * @component
 *
 * @description
 * Renders a colored Tag with a French label matching the
 * order or payment status. Supports both `EnumOrderStatus` and
 * `EnumPaymentStatus` values.
 *
 * @param {IOrderStatusTagProps} props - Component props
 * @returns {JSX.Element} The status tag
 */
const OrderStatusTag: FC<IOrderStatusTagProps> = ({ status }) => {
    const config = (ORDER_STATUS_CONFIG as Record<string, { label: string; color: string }>)[
        status
    ] ??
        (PAYMENT_STATUS_CONFIG as Record<string, { label: string; color: string }>)[status] ?? {
            label: status,
            color: "default"
        };

    return (
        <Tag color={config.color} variant="outlined">
            {config.label}
        </Tag>
    );
};

export default OrderStatusTag;
