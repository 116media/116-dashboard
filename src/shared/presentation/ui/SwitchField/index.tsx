import { Flex, Switch, Typography } from "antd";
import type { FC, ReactNode } from "react";
import styles from "./index.module.scss";

const { Text } = Typography;

interface ISwitchFieldProps {
    title: string;
    icon: ReactNode;
    checked?: boolean;
    disabled?: boolean;
    description: string;
    onChange?: (checked: boolean) => void;
}

/**
 * Switch toggle with icon, title, and description.
 *
 * @component
 *
 * @description
 * Renders a row with an icon, title, and description on the left
 * and a Switch toggle on the right. Used for boolean form fields
 * like social boost, featured, etc.
 */
const SwitchField: FC<ISwitchFieldProps> = ({
    icon,
    title,
    description,
    checked,
    onChange,
    disabled
}) => (
    <Flex align="center" justify="space-between" className={styles.switchField}>
        <Flex gap={12} align="center">
            <span className={styles.switchField__icon}>{icon}</span>
            <div>
                <Text strong>{title}</Text>
                <br />
                <Text type="secondary" className={styles.switchField__description}>
                    {description}
                </Text>
            </div>
        </Flex>
        <Switch checked={checked} onChange={onChange} disabled={disabled} />
    </Flex>
);

export default SwitchField;
