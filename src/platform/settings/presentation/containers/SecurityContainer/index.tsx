import { Empty, Spin } from "antd";
import { type FC, useEffect } from "react";
import { useSessions } from "@/platform/session/presentation/hooks/UseSessions";
import ChangePasswordForm from "@/platform/settings/presentation/components/forms/ChangePasswordForm";
import RoleCard from "@/platform/settings/presentation/components/ui/RoleCard";
import SessionCard from "@/platform/settings/presentation/components/ui/SessionCard";
import SettingsCard from "@/platform/settings/presentation/components/ui/SettingsCard";
import SettingsPageHeader from "@/platform/settings/presentation/components/ui/SettingsPageHeader";
import { useChangePassword } from "@/platform/settings/presentation/hooks/UseChangePassword";
import { useRoles } from "@/platform/settings/presentation/hooks/UseRoles";
import { IconLockOutlined } from "@/shared/presentation/ui/Icons";

const SecurityContainer: FC = () => {
    const changePassword = useChangePassword();
    const { roles, loading: rolesLoading, fetchRoles } = useRoles();
    const {
        sessions,
        loading: sessionsLoading,
        revokeLoading,
        fetchSessions,
        onRevoke
    } = useSessions();

    useEffect(() => {
        fetchRoles();
        fetchSessions();
    }, [fetchRoles, fetchSessions]);

    return (
        <div>
            <SettingsPageHeader
                icon={<IconLockOutlined />}
                title="Sécurité"
                description="Gérez votre mot de passe, vos rôles et vos sessions actives."
            />
            <ChangePasswordForm
                form={changePassword.form}
                loading={changePassword.loading}
                error={changePassword.error}
                onSubmit={changePassword.onSubmit}
            />

            <SettingsCard title="Rôles & Permissions">
                {rolesLoading ? (
                    <Spin />
                ) : roles.length > 0 ? (
                    roles.map((role) => <RoleCard key={role.id} role={role} />)
                ) : (
                    <Empty description="Aucun rôle assigné" />
                )}
            </SettingsCard>

            <SettingsCard title="Sessions actives">
                {sessionsLoading ? (
                    <Spin />
                ) : sessions.length > 0 ? (
                    sessions.map((session) => (
                        <SessionCard
                            key={session.id}
                            session={session}
                            loading={revokeLoading}
                            onRevoke={onRevoke}
                        />
                    ))
                ) : (
                    <Empty description="Aucune session active" />
                )}
            </SettingsCard>
        </div>
    );
};

export default SecurityContainer;
