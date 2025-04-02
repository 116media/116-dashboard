import { Button, Card, Flex, Typography } from "antd";
import type { FC } from "react";
import { useSignOut } from "@/modules/auth/presentation/hooks/UseSignOut";
import { useSignOutAll } from "@/modules/auth/presentation/hooks/UseSignOutAll";
import SettingsCard from "@/platform/settings/presentation/components/ui/SettingsCard";
import {
    IconExclamationCircleOutlined,
    IconLogoutOutlined,
    IconSettingOutlined
} from "@/shared/presentation/ui/Icons";
import PageHeader from "@/shared/presentation/ui/PageHeader";
import styles from "./index.module.scss";

const { Text } = Typography;

/**
 * Container for the Account tab in Settings.
 *
 * @component
 *
 * @description
 * Provides sign-out actions: sign out from the current device
 * or sign out from all devices at once.
 */
const AccountContainer: FC = () => {
    const { loading: signOutLoading, onSignOut } = useSignOut();
    const { loading: signOutAllLoading, onSignOutAll } = useSignOutAll();

    return (
        <div>
            <PageHeader
                icon={<IconSettingOutlined />}
                title="Compte"
                subtitle="Gérez la déconnexion de vos appareils."
            />
            <SettingsCard title="Déconnexion" subtitle="Gérez vos sessions de connexion">
                <Flex vertical gap={16}>
                    <Card>
                        <Flex align="center" gap={12}>
                            <div className={styles.account__icon}>
                                <IconLogoutOutlined />
                            </div>
                            <div className={styles.account__info}>
                                <Text strong>Se déconnecter</Text>
                                <div>
                                    <Text type="secondary">Se déconnecter de cet appareil.</Text>
                                </div>
                            </div>
                            <Button
                                danger
                                variant="outlined"
                                loading={signOutLoading}
                                onClick={onSignOut}
                            >
                                Se déconnecter
                            </Button>
                        </Flex>
                    </Card>
                    <Card>
                        <Flex gap={12} align="center">
                            <div
                                className={`${styles.account__icon} ${styles.account__icon__danger}`}
                            >
                                <IconExclamationCircleOutlined />
                            </div>
                            <div className={styles.account__info}>
                                <Text strong>Déconnexion de tous les appareils</Text>
                                <div>
                                    <Text type="secondary">
                                        Vous serez déconnecté de tous les appareils.
                                    </Text>
                                </div>
                            </div>
                            <Button
                                danger
                                type="primary"
                                loading={signOutAllLoading}
                                onClick={onSignOutAll}
                            >
                                Se déconnecter
                            </Button>
                        </Flex>
                    </Card>
                </Flex>
            </SettingsCard>
        </div>
    );
};

export default AccountContainer;
