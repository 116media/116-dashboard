import { Flex, Typography } from "antd";
import type { ReactNode } from "react";
import styles from "./index.module.scss";

const { Text } = Typography;

/**
 * Select option render function: code badge + label on the left, secondary text on the right.
 *
 * @description
 * Used for order item selects where each option shows a short ID badge,
 * the item label, and an optional customer name on the right.
 * Pass directly to Ant Design Select's `optionRender` prop.
 */
const SelectOptionBadged = (option: {
    label?: ReactNode;
    data: { code?: string; secondary?: string };
}) => (
    <Flex justify="space-between" align="center" gap={16} className={styles.selectOption__row}>
        <Flex gap={8} align="center">
            <Text code className={styles.selectOption__code}>
                {option.data.code}
            </Text>
            <span>{option.label}</span>
        </Flex>
        {option.data.secondary && (
            <Text type="secondary" className={styles.selectOption__secondary}>
                {option.data.secondary}
            </Text>
        )}
    </Flex>
);

export default SelectOptionBadged;
