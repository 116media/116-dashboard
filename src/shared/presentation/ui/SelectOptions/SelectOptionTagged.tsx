import { Flex, Tag, Typography } from "antd";
import type { ReactNode } from "react";
import styles from "./index.module.scss";

const { Text } = Typography;

/**
 * Select option render function: colored tag on the left, label in the middle, secondary text on the right.
 *
 * @description
 * Used for selects where each option carries a human-readable tag
 * (e.g. duration label) rather than a raw code badge.
 * Pass directly to Ant Design Select's `optionRender` prop.
 */
const SelectOptionTagged = (option: {
    label?: ReactNode;
    data: { tag?: string; secondary?: string };
}) => (
    <Flex justify="space-between" align="center" gap={16} className={styles.selectOption__row}>
        <Flex gap={8} align="center">
            {option.data.tag && <Tag color="purple-inverse">{option.data.tag}</Tag>}
            <span>{option.label}</span>
        </Flex>
        {option.data.secondary && (
            <Text type="secondary" className={styles.selectOption__secondary}>
                {option.data.secondary}
            </Text>
        )}
    </Flex>
);

export default SelectOptionTagged;
