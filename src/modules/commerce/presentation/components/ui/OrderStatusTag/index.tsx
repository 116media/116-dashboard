import { Tag } from "antd";
import type { FC, ReactNode } from "react";
import { EnumOrderStatus, EnumPaymentStatus } from "@/shared/infrastructure/api/generated/116.api";
import {
    IconCheckCircleOutlined,
    IconClockCircleOutlined,
    IconCloseCircleOutlined,
    IconEditOutlined
} from "@/shared/presentation/ui/Icons";

interface IStatusConfig {
    label: string;
    color: string;
    icon: ReactNode;
}

/**
 * Merged status configuration for both order and payment lifecycle states.
 */
const STATUS_CONFIG: Record<string, IStatusConfig> = {
    [EnumOrderStatus.Draft]: { label: "brouillon", color: "default", icon: <IconEditOutlined /> },
    [EnumOrderStatus.PendingPayment]: {
        label: "en attente",
        color: "warning",
        icon: <IconClockCircleOutlined />
    },
    [EnumOrderStatus.Paid]: { label: "payé", color: "success", icon: <IconCheckCircleOutlined /> },
    [EnumOrderStatus.Cancelled]: {
        label: "annulé",
        color: "error",
        icon: <IconCloseCircleOutlined />
    },
    [EnumPaymentStatus.Pending]: {
        label: "en attente",
        color: "warning",
        icon: <IconClockCircleOutlined />
    },
    [EnumPaymentStatus.Verified]: {
        label: "vérifié",
        color: "success",
        icon: <IconCheckCircleOutlined />
    },
    [EnumPaymentStatus.Rejected]: {
        label: "rejeté",
        color: "error",
        icon: <IconCloseCircleOutlined />
    }
};

const DEFAULT_CONFIG: IStatusConfig = { label: "inconnu", color: "default", icon: null };

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
    const config = STATUS_CONFIG[status] ?? DEFAULT_CONFIG;

    return (
        <Tag color={config.color} icon={config.icon} variant="outlined">
            {config.label}
        </Tag>
    );
};

export default OrderStatusTag;
