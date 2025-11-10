import { Flex, Typography } from "antd";
import type { FC, ReactNode } from "react";

import styles from "./index.module.scss";

const { Title, Text } = Typography;

export interface IFormHeaderProps {
    title: string;
    subtitle: string | ReactNode;
}

/**
 * Form header component.
 *
 * @component
 *
 * @description
 * Renders a centered header for authentication forms with title and subtitle.
 * Displays title as h3 heading and subtitle with secondary styling.
 *
 * @param {IFormHeaderProps} props - Component props
 * @param {string} props.title - Main heading text
 * @param {string | ReactNode} props.subtitle - Subtitle text or React node
 *
 * @returns The form header component
 */
const FormHeader: FC<IFormHeaderProps> = ({ title, subtitle }) => {
    return (
        <Flex vertical align="center" className={styles.formHeader}>
            <Title level={3} className={styles.formHeader__title}>
                {title}
            </Title>
            <Text type="secondary" className={styles.formHeader__subtitle}>
                {subtitle}
            </Text>
        </Flex>
    );
};

export default FormHeader;
