import { Typography } from "antd";
import type { FC } from "react";
import { IconBellOutlined } from "@/shared/presentation/ui/Icons";
import styles from "./index.module.scss";

const { Title, Paragraph } = Typography;

const ComingSoon: FC = () => {
    return (
        <div className={styles.container}>
            <IconBellOutlined className={styles.icon} />
            <Title level={4}>Bientôt disponible</Title>
            <Paragraph type="secondary">
                Cette fonctionnalité est en cours de développement. Revenez bientôt !
            </Paragraph>
        </div>
    );
};

export default ComingSoon;
