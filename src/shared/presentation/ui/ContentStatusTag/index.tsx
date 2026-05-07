import { Tag } from "antd";
import type { FC, ReactNode } from "react";
import { EnumContentStatus } from "@/shared/infrastructure/api/generated/116.api";
import {
    IconCheckCircleOutlined,
    IconClockCircleOutlined,
    IconEditOutlined,
    IconExclamationCircleOutlined,
    IconSaveOutlined
} from "@/shared/presentation/ui/Icons";

interface IStatusConfig {
    label: string;
    color: string;
    icon: ReactNode;
}

/**
 * Status configuration for content editorial workflow states.
 */
const STATUS_CONFIG: Record<string, IStatusConfig> = {
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

const DEFAULT_CONFIG: IStatusConfig = { label: "inconnu", color: "default", icon: null };

/**
 * Props for the ContentStatusTag component.
 *
 * @interface IContentStatusTagProps
 *
 * @property {EnumContentStatus} status - The content status value to display
 */
interface IContentStatusTagProps {
    status: EnumContentStatus;
}

/**
 * Status tag for content editorial workflow states.
 *
 * @component
 *
 * @description
 * Renders a colored Tag with a French label and icon matching the
 * editorial content status. Used by articles and videos modules.
 *
 * @param {IContentStatusTagProps} props - Component props
 * @returns {JSX.Element} The content status tag
 */
const ContentStatusTag: FC<IContentStatusTagProps> = ({ status }) => {
    const config = STATUS_CONFIG[status] ?? DEFAULT_CONFIG;

    return (
        <Tag color={config.color} icon={config.icon} variant="outlined">
            {config.label}
        </Tag>
    );
};

export default ContentStatusTag;
