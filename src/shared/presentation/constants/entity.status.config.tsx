import {
    IconCheckCircleOutlined,
    IconCloseCircleOutlined,
    IconExclamationCircleOutlined
} from "@/shared/presentation/ui/Icons";
import type { IStatusConfig } from "@/shared/presentation/ui/StatusTag";

/**
 * Status configuration for entity active/inactive/deleted states.
 *
 * @description
 * Used by roles, permissions, lookup tables, and any entity
 * with a simple active/inactive/deleted lifecycle.
 */
export const ENTITY_STATUS_CONFIG: Record<string, IStatusConfig> = {
    active: { label: "actif", color: "success", icon: <IconCheckCircleOutlined /> },
    inactive: { label: "inactif", color: "warning", icon: <IconExclamationCircleOutlined /> },
    deleted: { label: "supprimé", color: "error", icon: <IconCloseCircleOutlined /> }
};
