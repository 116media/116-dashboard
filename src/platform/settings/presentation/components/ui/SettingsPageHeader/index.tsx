import { Typography } from "antd";
import type { FC, ReactNode } from "react";
import styles from "./index.module.scss";

const { Title, Text } = Typography;

/**
 * Props for the SettingsPageHeader component.
 *
 * @interface ISettingsPageHeaderProps
 * @property {ReactNode} icon - Icon displayed in the header
 * @property {string} title - Page title
 * @property {string} description - Description text below the title
 */
interface ISettingsPageHeaderProps {
    icon: ReactNode;
    title: string;
    description: string;
}

/**
 * Page header for each settings tab with icon, title, and description.
 *
 * @component
 */
const SettingsPageHeader: FC<ISettingsPageHeaderProps> = ({ icon, title, description }) => {
    return (
        <div className={styles.pageHeader}>
            <div className={styles.pageHeader__icon}>{icon}</div>
            <div className={styles.pageHeader__text}>
                <Title level={4} className={styles.pageHeader__title}>
                    {title}
                </Title>
                <Text type="secondary">{description}</Text>
            </div>
        </div>
    );
};

export default SettingsPageHeader;
