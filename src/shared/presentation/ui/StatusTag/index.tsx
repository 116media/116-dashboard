import { Tag } from "antd";
import type { FC, ReactNode } from "react";

/**
 * Configuration for a single status value.
 *
 * @interface IStatusConfig
 * @property {string} label - French display label
 * @property {string} color - Ant Design Tag color
 * @property {ReactNode} icon - Icon element to display
 */
export interface IStatusConfig {
    label: string;
    color: string;
    icon: ReactNode;
}

const DEFAULT_CONFIG: IStatusConfig = { label: "inconnu", color: "default", icon: null };

interface IStatusTagProps {
    status: string;
    config: Record<string, IStatusConfig>;
}

/**
 * Generic status tag driven by an external configuration map.
 *
 * @component
 *
 * @description
 * Renders a colored outlined Tag with an icon and label based on
 * the provided config. Each module defines its own config map
 * (entity status, editorial workflow, order lifecycle, etc.)
 * and passes it alongside the status value.
 */
const StatusTag: FC<IStatusTagProps> = ({ status, config }) => {
    const { label, color, icon } = config[status] ?? DEFAULT_CONFIG;

    return (
        <Tag color={color} variant="outlined" icon={icon}>
            {label}
        </Tag>
    );
};

export default StatusTag;
