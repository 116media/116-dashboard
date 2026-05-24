import { Flex, Typography } from "antd";
import type { ReactNode } from "react";
import styles from "./index.module.scss";

const { Text } = Typography;

/**
 * Select option render function: label on the left, secondary text on the right.
 *
 * @description
 * Used for customer selects (company), video selects (category), and
 * any dropdown where options need a subtle right-aligned annotation.
 * Pass directly to Ant Design Select's `optionRender` prop.
 */
const SelectOptionDetail = (option: { label?: ReactNode; data: { secondary?: string } }) => (
    <Flex justify="space-between" align="center" className={styles.selectOption__row}>
        <span className={styles.selectOption__label}>{option.label}</span>
        {option.data.secondary && (
            <Text ellipsis type="secondary" className={styles.selectOption__secondary}>
                {option.data.secondary}
            </Text>
        )}
    </Flex>
);

export default SelectOptionDetail;
