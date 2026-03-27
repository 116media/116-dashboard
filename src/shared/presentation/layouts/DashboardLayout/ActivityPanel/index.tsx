import { Avatar, Divider, Flex, Layout, List, Typography } from "antd";
import type { FC } from "react";
import { useAppSelector } from "@/shared/presentation/store/store";
import { IconUserOutlined } from "@/shared/presentation/ui/Icons";

import styles from "./index.module.scss";

const { Sider } = Layout;
const { Text, Title } = Typography;

/**
 * Placeholder upcoming events data.
 *
 * @description
 * Static placeholder items displayed in the ActivityPanel.
 * Will be replaced with real data from the API.
 */
const PLACEHOLDER_EVENTS = [
    { id: 1, title: "Réunion avec un client", time: "10:00 - 11:00" },
    { id: 2, title: "Discussion projet", time: "14:00 - 15:00" },
    { id: 3, title: "Analyse données financières", time: "16:00 - 17:00" }
];

/**
 * Props for the ActivityPanel component.
 *
 * @interface IActivityPanelProps
 * @property {boolean} collapsed - Whether the sidebar is collapsed (hidden)
 */
interface IActivityPanelProps {
    collapsed: boolean;
}

/**
 * Collapsible contextual sidebar panel with user info and widgets.
 *
 * @component
 *
 * @description
 * Displays contextual information visible on all authenticated pages:
 * - User welcome section with avatar and username
 * - Upcoming events list (placeholder data)
 * - Conversion history section (placeholder)
 *
 * Toggled via the Navbar hamburger menu with a slide animation.
 *
 * @returns The activity panel
 */
export const ActivityPanel: FC<IActivityPanelProps> = ({ collapsed }) => {
    const { userName, avatar } = useAppSelector(({ auth: { login } }) => login.data?.user);

    return (
        <Sider
            width={280}
            trigger={null}
            collapsedWidth={0}
            collapsed={collapsed}
            className={styles.activityPanel}
        >
            <Flex vertical className={styles.activityPanel__inner}>
                <Flex vertical align="center" className={styles.activityPanel__welcome}>
                    <Avatar
                        size={56}
                        src={avatar?.storageUrl}
                        icon={!avatar?.storageUrl && <IconUserOutlined />}
                        className={styles.activityPanel__welcome__avatar}
                    />
                    <Text type="secondary">Bienvenue,</Text>
                    <Title level={4} className={styles.activityPanel__username}>
                        {userName}
                    </Title>
                </Flex>

                <Divider />

                <div className={styles.activityPanel__section}>
                    <Text strong>Événements à venir</Text>
                    <List
                        size="small"
                        dataSource={PLACEHOLDER_EVENTS}
                        renderItem={(item) => (
                            <List.Item key={item.id}>
                                <List.Item.Meta title={item.title} description={item.time} />
                            </List.Item>
                        )}
                    />
                </div>

                <Divider />

                <div className={styles.activityPanel__section}>
                    <Text strong>Historique de conversion</Text>
                    <Flex
                        align="center"
                        justify="center"
                        className={styles.activityPanel__chartPlaceholder}
                    >
                        <Text type="secondary">Graphique à venir</Text>
                    </Flex>
                </div>
            </Flex>
        </Sider>
    );
};
