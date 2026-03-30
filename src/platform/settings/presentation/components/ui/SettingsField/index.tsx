import { Flex, Typography } from "antd";
import type { FC, ReactNode } from "react";
import styles from "./index.module.scss";

const { Text } = Typography;

/**
 * Props for the SettingsField component.
 *
 * @interface ISettingsFieldProps
 * @property {string} label - Field label displayed above the value
 * @property {string | null} [value] - Field value to display
 * @property {string} [fallback] - Fallback text when value is empty (defaults to "Non renseigné")
 * @property {ReactNode} [icon] - Icon displayed on the left side
 */
interface ISettingsFieldProps {
    label: string;
    value?: string | null;
    fallback?: string;
    icon?: ReactNode;
}

/**
 * Read-only label/value field for displaying profile information.
 *
 * @component
 *
 * @description
 * Renders a row with an optional icon, label/value pair, and a
 * chevron indicator. Includes a hover effect for visual feedback.
 */
const SettingsField: FC<ISettingsFieldProps> = ({
    label,
    value,
    fallback = "Non renseigné",
    icon
}) => {
    return (
        <Flex align="center" gap={12} className={styles.settingsField}>
            {icon && <div className={styles.settingsField__icon}>{icon}</div>}
            <Flex orientation="vertical" flex={1} justify="space-evenly">
                <Text type="secondary" className={styles.settingsField__label}>
                    {label}
                </Text>
                <Text type={value ? undefined : "secondary"}>{value || fallback}</Text>
            </Flex>
        </Flex>
    );
};

export default SettingsField;
