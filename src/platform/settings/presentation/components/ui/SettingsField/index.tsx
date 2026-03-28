import { Typography } from "antd";
import type { FC } from "react";
import styles from "./index.module.scss";

const { Text } = Typography;

interface ISettingsFieldProps {
    label: string;
    value?: string | null;
    fallback?: string;
}

const SettingsField: FC<ISettingsFieldProps> = ({ label, value, fallback = "—" }) => {
    return (
        <div className={styles.field}>
            <Text type="secondary" className={styles.label}>
                {label}
            </Text>
            <Text>{value || fallback}</Text>
        </div>
    );
};

export default SettingsField;
