import { EditOutlined } from "@ant-design/icons";
import { Button, Card, Typography } from "antd";
import type { FC, ReactNode } from "react";
import styles from "./index.module.scss";

const { Title } = Typography;

interface ISettingsCardProps {
    title: string;
    onEdit?: () => void;
    editLabel?: string;
    children: ReactNode;
}

const SettingsCard: FC<ISettingsCardProps> = ({
    title,
    onEdit,
    editLabel = "Modifier",
    children
}) => {
    return (
        <Card className={styles.card}>
            <div className={styles.header}>
                <Title level={5} className={styles.title}>
                    {title}
                </Title>
                {onEdit && (
                    <Button type="link" icon={<EditOutlined />} onClick={onEdit}>
                        {editLabel}
                    </Button>
                )}
            </div>
            {children}
        </Card>
    );
};

export default SettingsCard;
