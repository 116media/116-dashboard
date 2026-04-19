import { Button, Flex, Typography } from "antd";
import type { FC, ReactNode } from "react";
import { IconPlusOutlined } from "@/shared/presentation/ui/Icons";

import styles from "./index.module.scss";

const { Title, Text } = Typography;

/**
 * Props for the PageHeader component.
 *
 * @interface IPageHeaderProps
 * @property {string} title - Page title displayed as heading
 * @property {string} [subtitle] - Muted description below the title
 * @property {ReactNode} [icon] - Icon displayed in the header
 * @property {() => void} [onCreate] - Opens the create modal (hidden for non-SuperAdmin)
 * @property {string} [createLabel] - Create button label (default: "Créer")
 * @property {ReactNode} [extra] - Additional action buttons
 */
export interface IPageHeaderProps {
    title: string;
    subtitle?: string;
    icon?: ReactNode;
    onCreate?: () => void;
    createLabel?: string;
    extra?: ReactNode;
}

/**
 * Page header with icon, title, subtitle, and optional create button.
 *
 * @component
 *
 * @description
 * Renders a page header with an optional icon, title, subtitle,
 * and action buttons. Used across settings pages and table pages.
 * The create button is only rendered when `onCreate` is provided.
 *
 * @param {IPageHeaderProps} props - Component props
 * @returns {JSX.Element} The page header
 */
const PageHeader: FC<IPageHeaderProps> = ({
    title,
    subtitle,
    icon,
    onCreate,
    createLabel = "Créer",
    extra
}) => {
    return (
        <div className={styles.pageHeader}>
            <Flex justify="space-between" align="center">
                <Flex gap={16} align="center">
                    {icon && <div className={styles.pageHeader__icon}>{icon}</div>}
                    <div>
                        <Title level={4} className={styles.pageHeader__title}>
                            {title}
                        </Title>
                        {subtitle && <Text type="secondary">{subtitle}</Text>}
                    </div>
                </Flex>
                <Flex gap={8}>
                    {extra}
                    {onCreate && (
                        <Button type="primary" icon={<IconPlusOutlined />} onClick={onCreate}>
                            {createLabel}
                        </Button>
                    )}
                </Flex>
            </Flex>
        </div>
    );
};

export default PageHeader;
