import { Typography } from "antd";
import type { FC, ReactNode } from "react";
import styles from "./index.module.scss";

const { Title, Text } = Typography;

interface ISettingsPageHeaderProps {
    icon: ReactNode;
    title: string;
    description: string;
}

const SettingsPageHeader: FC<ISettingsPageHeaderProps> = ({ icon, title, description }) => {
    return (
        <div className={styles.header}>
            <div className={styles.icon}>{icon}</div>
            <div className={styles.text}>
                <Title level={4} className={styles.title}>
                    {title}
                </Title>
                <Text type="secondary">{description}</Text>
            </div>
        </div>
    );
};

export default SettingsPageHeader;
