import { EnumOrderStatus, EnumPaymentStatus } from "@/shared/infrastructure/api/generated/116.api";
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
    }
};

/**
 * Status configuration for payment verification states.
 */
export const PAYMENT_STATUS_CONFIG: Record<string, IStatusConfig> = {
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
