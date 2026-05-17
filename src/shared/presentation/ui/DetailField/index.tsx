import { Flex, message, Typography } from "antd";
import { type FC, type ReactNode, useCallback } from "react";
import styles from "./index.module.scss";

const { Text } = Typography;

/**
 * Props for the DetailField component.
 *
 * @interface IDetailFieldProps
 * @property {string} label - Field label displayed above the value
 * @property {string | null} [value] - Field value to display
 * @property {string} [fallback] - Fallback text when value is empty (defaults to "Non renseigné")
 * @property {ReactNode} [icon] - Icon displayed on the left side
 */
interface IDetailFieldProps {
    label: string;
    icon?: ReactNode;
    fallback?: string;
    copyable?: boolean;
    value?: string | null;
}

/**
 * Read-only label/value pair with an optional leading icon.
 *
 * @component
 *
 * @description
 * Shared display component for metadata across the application:
 * profile info, article sidebars, order details, payment grids, etc.
 * Shows a muted label above the value, with a fallback when empty.
 */
const DetailField: FC<IDetailFieldProps> = ({
    label,
    value,
    fallback = "Non renseigné",
    icon,
    copyable
}) => {
    const handleClick = useCallback(() => {
        if (!copyable || !value) return;
        navigator.clipboard.writeText(value);
        message.success("Copié dans le presse-papiers");
    }, [copyable, value]);

    return (
        <Flex
            gap={12}
            align="center"
            onClick={handleClick}
            className={`${styles.detailField} ${copyable && value ? styles.detailField__copyable : ""}`}
        >
            {icon && <div className={styles.detailField__icon}>{icon}</div>}
            <Flex orientation="vertical" flex={1} justify="space-evenly">
                <Text type="secondary" className={styles.detailField__label}>
                    {label}
                </Text>
                <Text type={value ? undefined : "secondary"} copyable={copyable && !!value}>
                    {value || fallback}
                </Text>
            </Flex>
        </Flex>
    );
};

export default DetailField;
