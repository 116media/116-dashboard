import { EnumContentStatus } from "@/shared/infrastructure/api/generated/116.api";
import {
    IconCheckCircleOutlined,
    IconClockCircleOutlined,
    IconEditOutlined,
    IconExclamationCircleOutlined,
    IconSaveOutlined
} from "@/shared/presentation/ui/Icons";
import type { IStatusConfig } from "@/shared/presentation/ui/StatusTag";

/**
 * Status configuration for content editorial workflow states.
 *
 * @description
 * Used by articles and videos modules for the 7-step editorial
 * workflow: Draft → PendingPayment → PendingReview → Approved
 * → Published / Rejected / Archived.
 */
export const CONTENT_STATUS_CONFIG: Record<string, IStatusConfig> = {
    [EnumContentStatus.Draft]: { label: "brouillon", color: "default", icon: <IconEditOutlined /> },
    [EnumContentStatus.PendingPayment]: {
        label: "paiement en cours",
        color: "warning",
        icon: <IconClockCircleOutlined />
    },
    [EnumContentStatus.PendingReview]: {
        label: "en attente de revue",
        color: "processing",
        icon: <IconClockCircleOutlined />
    },
    [EnumContentStatus.Approved]: {
        label: "approuvé",
        color: "cyan",
        icon: <IconCheckCircleOutlined />
    },
    [EnumContentStatus.Published]: {
        label: "publié",
        color: "success",
        icon: <IconCheckCircleOutlined />
    },
    [EnumContentStatus.Rejected]: {
        label: "rejeté",
        color: "error",
        icon: <IconExclamationCircleOutlined />
    },
    [EnumContentStatus.Archived]: {
        label: "archivé",
        color: "default",
        icon: <IconSaveOutlined />
    }
};
