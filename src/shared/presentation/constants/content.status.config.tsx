import { ContentStatus } from "@/shared/domain/enums/content-status.enum";
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
    [ContentStatus.Draft]: { label: "brouillon", color: "default", icon: <IconEditOutlined /> },
    [ContentStatus.PendingPayment]: {
        label: "paiement en cours",
        color: "warning",
        icon: <IconClockCircleOutlined />
    },
    [ContentStatus.PendingReview]: {
        label: "en attente de revue",
        color: "processing",
        icon: <IconClockCircleOutlined />
    },
    [ContentStatus.Approved]: {
        label: "approuvé",
        color: "cyan",
        icon: <IconCheckCircleOutlined />
    },
    [ContentStatus.Published]: {
        label: "publié",
        color: "success",
        icon: <IconCheckCircleOutlined />
    },
    [ContentStatus.Rejected]: {
        label: "rejeté",
        color: "error",
        icon: <IconExclamationCircleOutlined />
    },
    [ContentStatus.Archived]: {
        label: "archivé",
        color: "default",
        icon: <IconSaveOutlined />
    }
};
