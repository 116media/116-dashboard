import type { FC } from "react";
import { useNavigate, useParams } from "react-router";
import SettingsSidebar, {
    type SettingsTab
} from "@/platform/settings/presentation/components/ui/SettingsSidebar";
import AccountContainer from "@/platform/settings/presentation/containers/AccountContainer";
import NotificationContainer from "@/platform/settings/presentation/containers/NotificationContainer";
import ProfileContainer from "@/platform/settings/presentation/containers/ProfileContainer";
import SecurityContainer from "@/platform/settings/presentation/containers/SecurityContainer";
import { APP_NAME } from "@/shared/infrastructure/constants/common";
import { SETTING_PATH } from "@/shared/presentation/constants/paths";
import { TextTransform } from "@/shared/presentation/utils/text-transform/text-transform.utils";
import styles from "./index.module.scss";

/**
 * Maps each settings tab key to its container component.
 */
const containerMap: Record<SettingsTab, FC> = {
    profile: ProfileContainer,
    security: SecurityContainer,
    notification: NotificationContainer,
    account: AccountContainer
};

/**
 * Valid tab keys used to validate the URL param.
 */
const VALID_TABS: SettingsTab[] = ["profile", "security", "notification", "account"];

/**
 * Main settings page with URL-driven tab navigation.
 *
 * @component
 *
 * @description
 * Reads the active tab from the URL param (`/settings/:tab`).
 * Defaults to "profile" if the param is missing or invalid.
 * Sidebar clicks update the URL, keeping browser history in sync.
 */
const SettingsPage: FC = () => {
    const { tab } = useParams<{ tab: string }>();
    const navigate = useNavigate();

    const activeTab: SettingsTab = VALID_TABS.includes(tab as SettingsTab)
        ? (tab as SettingsTab)
        : "profile";

    const handleTabChange = (newTab: SettingsTab) => {
        navigate(`${SETTING_PATH}/${newTab}`, { replace: true });
    };

    const ActiveContainer = containerMap[activeTab];

    return (
        <div className={styles.page}>
            <title>{`Paramètres - ${TextTransform.capitalCase(activeTab)} | ${APP_NAME}`}</title>

            <SettingsSidebar activeTab={activeTab} onChange={handleTabChange} />
            <div className={styles.page__content}>
                <ActiveContainer />
            </div>
        </div>
    );
};

export default SettingsPage;
