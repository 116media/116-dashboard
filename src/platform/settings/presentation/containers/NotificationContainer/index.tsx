import type { FC } from "react";
import ComingSoon from "@/platform/settings/presentation/components/ui/ComingSoon";
import { IconBellOutlined } from "@/shared/presentation/ui/Icons";
import PageHeader from "@/shared/presentation/ui/PageHeader";

/**
 * Container for the Notification tab in Settings.
 *
 * @component
 *
 * @description
 * Placeholder for notification preferences. Currently displays
 * a "coming soon" message.
 */
const NotificationContainer: FC = () => {
    return (
        <div>
            <PageHeader
                icon={<IconBellOutlined />}
                title="Notifications"
                subtitle="Configurez vos préférences de notifications."
            />
            <ComingSoon />
        </div>
    );
};

export default NotificationContainer;
