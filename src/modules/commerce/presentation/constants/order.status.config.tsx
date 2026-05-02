import { OrderStatus } from "@/shared/domain/enums/order-status.enum";
import { PaymentStatus } from "@/shared/domain/enums/payment-status.enum";
import {
    IconCheckCircleOutlined,
    IconClockCircleOutlined,
    IconCloseCircleOutlined,
    IconEditOutlined
} from "@/shared/presentation/ui/Icons";
import type { IStatusConfig } from "@/shared/presentation/ui/StatusTag";

/**
 * Status configuration for order lifecycle states.
 */
export const ORDER_STATUS_CONFIG: Record<string, IStatusConfig> = {
    [OrderStatus.Draft]: { label: "brouillon", color: "default", icon: <IconEditOutlined /> },
    [OrderStatus.PendingPayment]: {
        label: "en attente",
        color: "warning",
        icon: <IconClockCircleOutlined />
    },
    [OrderStatus.Paid]: { label: "payé", color: "success", icon: <IconCheckCircleOutlined /> },
    [OrderStatus.Cancelled]: {
        label: "annulé",
        color: "error",
        icon: <IconCloseCircleOutlined />
    }
};

/**
 * Status configuration for payment verification states.
 */
export const PAYMENT_STATUS_CONFIG: Record<string, IStatusConfig> = {
    [PaymentStatus.Pending]: {
        label: "en attente",
        color: "warning",
        icon: <IconClockCircleOutlined />
    },
    [PaymentStatus.Verified]: {
        label: "vérifié",
        color: "success",
        icon: <IconCheckCircleOutlined />
    },
    [PaymentStatus.Rejected]: {
        label: "rejeté",
        color: "error",
        icon: <IconCloseCircleOutlined />
    }
};
