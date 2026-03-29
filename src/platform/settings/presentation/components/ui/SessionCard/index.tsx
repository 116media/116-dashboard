import { Button, Tag, Typography } from "antd";
import type { FC } from "react";
import type { ISession, SessionDevice } from "@/platform/session/domain/entities/ISession";
import {
    IconApiOutlined,
    IconCarOutlined,
    IconClockCircleOutlined,
    IconDesktopOutlined,
    IconMobileOutlined,
    IconQuestionCircleOutlined,
    IconTabletOutlined
} from "@/shared/presentation/ui/Icons";
import styles from "./index.module.scss";

const { Text } = Typography;

interface ISessionCardProps {
    session: ISession;
    loading: boolean;
    onRevoke: (id: string) => void;
}

const deviceIconMap: Record<SessionDevice, FC> = {
    Desktop: IconDesktopOutlined,
    Mobile: IconMobileOutlined,
    Tablet: IconTabletOutlined,
    Watch: IconClockCircleOutlined,
    Tv: IconDesktopOutlined,
    Console: IconDesktopOutlined,
    Car: IconCarOutlined,
    IoT: IconApiOutlined,
    Unknown: IconQuestionCircleOutlined
};

const SessionCard: FC<ISessionCardProps> = ({ session, loading, onRevoke }) => {
    const DeviceIcon = deviceIconMap[session.device] ?? IconQuestionCircleOutlined;

    return (
        <div className={styles.card}>
            <div className={styles.info}>
                <div className={styles.summary}>
                    <DeviceIcon />
                    <Text strong className={styles.summaryText}>
                        {session.device} · {session.browser} · {session.platform}
                    </Text>
                </div>
                <Text type="secondary">IP : {session.ipAddress ?? "—"}</Text>
                <div className={styles.meta}>
                    <Tag>{session.client}</Tag>
                    <Tag color={session.isActive ? "green" : "red"}>
                        {session.isActive ? "Actif" : "Expiré"}
                    </Tag>
                </div>
                {session.createdAt && (
                    <Text type="secondary" className={styles.date}>
                        Créé le{" "}
                        {new Date(session.createdAt).toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit"
                        })}
                    </Text>
                )}
            </div>
            {session.isActive && (
                <Button danger size="small" loading={loading} onClick={() => onRevoke(session.id)}>
                    Révoquer
                </Button>
            )}
        </div>
    );
};

export default SessionCard;
