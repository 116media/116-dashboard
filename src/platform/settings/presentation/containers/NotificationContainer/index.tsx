import type { FC } from "react";
import ComingSoon from "@/platform/settings/presentation/components/ui/ComingSoon";
import SettingsPageHeader from "@/platform/settings/presentation/components/ui/SettingsPageHeader";
import { IconBellOutlined } from "@/shared/presentation/ui/Icons";

const NotificationContainer: FC = () => {
    return (
        <div>
            <SettingsPageHeader
                icon={<IconBellOutlined />}
                title="Notifications"
                description="Configurez vos préférences de notifications."
            />
            <ComingSoon />
        </div>
    );
};

export default NotificationContainer;
