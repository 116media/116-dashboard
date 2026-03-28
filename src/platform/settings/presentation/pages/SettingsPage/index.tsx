import type { FC } from "react";
import { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import SettingsSidebar, {
    type SettingsTab
} from "@/platform/settings/presentation/components/ui/SettingsSidebar";
import AccountContainer from "@/platform/settings/presentation/containers/AccountContainer";
import NotificationContainer from "@/platform/settings/presentation/containers/NotificationContainer";
import ProfileContainer from "@/platform/settings/presentation/containers/ProfileContainer";
import SecurityContainer from "@/platform/settings/presentation/containers/SecurityContainer";
import { APP_NAME } from "@/shared/infrastructure/constants/common";
import styles from "./index.module.scss";

const containerMap: Record<SettingsTab, FC> = {
    profile: ProfileContainer,
    security: SecurityContainer,
    notification: NotificationContainer,
    account: AccountContainer
};

const SettingsPage: FC = () => {
    const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
    const ActiveContainer = containerMap[activeTab];

    return (
        <HelmetProvider>
            <Helmet>
                <title>Paramètres | {APP_NAME}</title>
            </Helmet>
            <div className={styles.page}>
                <SettingsSidebar activeTab={activeTab} onChange={setActiveTab} />
                <div className={styles.content}>
                    <ActiveContainer />
                </div>
            </div>
        </HelmetProvider>
    );
};

export default SettingsPage;
