import { SettingOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import type { FC } from "react";
import { useSignOut } from "@/modules/auth/presentation/hooks/UseSignOut";
import { useSignOutAll } from "@/modules/auth/presentation/hooks/UseSignOutAll";
import SettingsCard from "@/platform/settings/presentation/components/ui/SettingsCard";
import SettingsPageHeader from "@/platform/settings/presentation/components/ui/SettingsPageHeader";

const { Text } = Typography;

const AccountContainer: FC = () => {
    const { loading: signOutLoading, onSignOut } = useSignOut();
    const { loading: signOutAllLoading, onSignOutAll } = useSignOutAll();

    return (
        <div>
            <SettingsPageHeader
                icon={<SettingOutlined />}
                title="Compte"
                description="Gérez la déconnexion de vos appareils."
            />
            <SettingsCard title="Déconnexion">
                <Text type="secondary">Se déconnecter de cet appareil.</Text>
                <div style={{ marginTop: 16 }}>
                    <Button loading={signOutLoading} onClick={onSignOut}>
                        Se déconnecter
                    </Button>
                </div>
            </SettingsCard>

            <SettingsCard title="Déconnexion de tous les appareils">
                <Text type="secondary">
                    Vous serez déconnecté de tous les appareils sur lesquels vous êtes actuellement
                    connecté.
                </Text>
                <div style={{ marginTop: 16 }}>
                    <Button danger loading={signOutAllLoading} onClick={onSignOutAll}>
                        Se déconnecter de tous les appareils
                    </Button>
                </div>
            </SettingsCard>
        </div>
    );
};

export default AccountContainer;
