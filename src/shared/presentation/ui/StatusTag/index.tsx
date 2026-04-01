import { Tag } from "antd";
import type { FC } from "react";
import {
    IconCheckCircleOutlined,
    IconCloseCircleOutlined,
    IconExclamationCircleOutlined
} from "@/shared/presentation/ui/Icons";
import { TextTransform } from "@/shared/presentation/utils/text-transform/text-transform.utils";
import styles from "./index.module.scss";

type EntityStatus = "active" | "inactive" | "deleted";

const STATUS_CONFIG: Record<EntityStatus, { label: string; color: string; icon: FC }> = {
    active: { label: "Actif", color: "success", icon: IconCheckCircleOutlined },
    inactive: { label: "Inactif", color: "warning", icon: IconExclamationCircleOutlined },
    deleted: { label: "Supprimé", color: "error", icon: IconCloseCircleOutlined }
};

interface IStatusTagProps {
    status: EntityStatus;
}

/**
 * Consistent status tag for active/inactive/deleted entities.
 *
 * @component
 *
 * @description
 * Renders a colored outlined Tag with an icon and French label.
 * Used across roles, permissions, and settings for uniform status display.
 */
const StatusTag: FC<IStatusTagProps> = ({ status }) => {
    const { label, color, icon: Icon } = STATUS_CONFIG[status];

    return (
        <Tag color={color} variant="outlined" icon={<Icon />} className={styles.tag}>
            {TextTransform.noCase(label)}
        </Tag>
    );
};

export default StatusTag;
