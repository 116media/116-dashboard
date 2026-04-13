import { Button, Flex, Tag, Typography } from "antd";
import type { FC } from "react";
import type { ISession } from "@/platform/session/domain/entities/ISession";
import { ESessionDevice } from "@/platform/session/domain/enums/ESessionDevice";
import {
    IconApiOutlined,
    IconCarOutlined,
    IconClockCircleOutlined,
    IconDesktopOutlined,
    IconMobileOutlined,
    IconQuestionCircleOutlined,
    IconTabletOutlined
} from "@/shared/presentation/ui/Icons";
import { dayjs } from "@/shared/presentation/utils/dayjs/dayjs.utils";
import styles from "./index.module.scss";

const { Text } = Typography;

/**
 * Props for the SessionCard component.
 *
 * @interface ISessionCardProps
 * @property {ISession} session - Session data to display
 * @property {boolean} loading - Whether a revoke action is in progress
 * @property {(id: string) => void} onRevoke - Callback to revoke a session
 */
interface ISessionCardProps {
    session: ISession;
    loading: boolean;
    onRevoke: (id: string) => void;
}

/** Maps device types to their corresponding Ant Design icon components. */
const deviceIconMap: Record<ESessionDevice, FC> = {
    [ESessionDevice.Desktop]: IconDesktopOutlined,
    [ESessionDevice.Mobile]: IconMobileOutlined,
    [ESessionDevice.Tablet]: IconTabletOutlined,
    [ESessionDevice.Watch]: IconClockCircleOutlined,
    [ESessionDevice.Tv]: IconDesktopOutlined,
    [ESessionDevice.Console]: IconDesktopOutlined,
    [ESessionDevice.Car]: IconCarOutlined,
    [ESessionDevice.IoT]: IconApiOutlined,
    [ESessionDevice.Unknown]: IconQuestionCircleOutlined
};

/**
 * Card displaying a single login session with device info and actions.
 *
 * @component
 *
 * @description
 * Shows the device icon, device/browser/platform summary, IP address,
 * relative creation time, and a "Ce navigateur" tag for the current session.
 * Active sessions display a revoke button; expired sessions show an "Expiré" tag.
 */
const SessionCard: FC<ISessionCardProps> = ({ session, loading, onRevoke }) => {
    const DeviceIcon = deviceIconMap[session.device] ?? IconQuestionCircleOutlined;

    return (
        <Flex align="center" gap={12} className={styles.session}>
            <div className={styles.session__icon}>
                <DeviceIcon />
            </div>
            <div className={styles.session__info}>
                <Flex align="center" gap={8}>
                    <Text strong>
                        {session.device} - {session.browser} - {session.platform}
                    </Text>
                    {session.isCurrent && <Tag color="blue">Ce navigateur</Tag>}
                </Flex>
                <Flex gap={16} className={styles.session__meta}>
                    <Text type="secondary">IP : {session.ipAddress ?? "—"}</Text>
                    {session.createdAt && (
                        <Text type="secondary">
                            <Flex align="center" gap={4}>
                                <IconClockCircleOutlined /> {dayjs(session.createdAt).fromNow()}
                            </Flex>
                        </Text>
                    )}
                </Flex>
            </div>
            {session.isActive ? (
                <Button
                    color="danger"
                    variant="solid"
                    loading={loading}
                    onClick={() => onRevoke(session.id)}
                >
                    Révoquer
                </Button>
            ) : (
                <Tag color="default">Expiré</Tag>
            )}
        </Flex>
    );
};

export default SessionCard;
