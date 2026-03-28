import { BellOutlined } from "@ant-design/icons";
import type { FC } from "react";
import ComingSoon from "@/platform/settings/presentation/components/ui/ComingSoon";
import SettingsPageHeader from "@/platform/settings/presentation/components/ui/SettingsPageHeader";

const NotificationContainer: FC = () => {
    return (
        <div>
            <SettingsPageHeader
                icon={<BellOutlined />}
                title="Notifications"
                description="Configurez vos préférences de notifications."
            />
            <ComingSoon />
        </div>
    );
};

export default NotificationContainer;
