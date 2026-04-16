import { Empty, Flex, Tag } from "antd";
import { type FC, useEffect } from "react";
import { useSessions } from "@/platform/session/presentation/hooks/UseSessions";
import ChangePasswordForm from "@/platform/settings/presentation/components/forms/ChangePasswordForm";
import RoleCard from "@/platform/settings/presentation/components/ui/RoleCard";
import SessionCard from "@/platform/settings/presentation/components/ui/SessionCard";
import SettingsCard from "@/platform/settings/presentation/components/ui/SettingsCard";
import SettingsPageHeader from "@/platform/settings/presentation/components/ui/SettingsPageHeader";
import { useChangePassword } from "@/platform/settings/presentation/hooks/UseChangePassword";
import { useRoles } from "@/platform/settings/presentation/hooks/UseRoles";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";
import { IconLockOutlined } from "@/shared/presentation/ui/Icons";
import StateRenderer from "@/shared/presentation/ui/StateRenderer";
import { RolesLoading, SessionsLoading } from "./SecurityContainer.Loading";

/**
 * Container for the Security tab in Settings.
 *
 * @component
 *
 * @description
 * Manages the security page layout including password change form,
 * roles & permissions display, and active sessions management.
 * Fetches roles and sessions on mount.
 */
const SecurityContainer: FC = () => {
    const changePassword = useChangePassword();
    const { roles, loading: rolesLoading, error: rolesError, fetchRoles } = useRoles();
    const {
        sessions,
        loading: sessionsLoading,
        error: sessionsError,
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

            <SettingsCard
                title="Rôles & Permissions"
                subtitle="Vos rôles assignés et les permissions associées"
            >
                <ErrorAlert banner showIcon closable error={rolesError} onClose={fetchRoles} />
                <StateRenderer
                    data={roles}
                    loading={rolesLoading}
                    skeleton={<RolesLoading />}
                    empty={<Empty description="Aucun rôle assigné" />}
                    render={(roles) => (
                        <Flex vertical gap={16}>
                            {roles.map((role, index) => (
                                <RoleCard key={role.id} role={role} defaultOpen={index === 0} />
                            ))}
                        </Flex>
                    )}
                />
            </SettingsCard>

            <SettingsCard
                title="Sessions actives"
                subtitle="Appareils actuellement connectés à votre compte"
                extra={
                    sessions.length > 0 && (
                        <Tag color="blue">
                            {sessions.length} session{sessions.length > 1 ? "s" : ""}
                        </Tag>
                    )
                }
            >
                <ErrorAlert
                    banner
                    showIcon
                    closable
                    error={sessionsError}
                    onClose={fetchSessions}
                />
                <StateRenderer
                    data={sessions}
                    loading={sessionsLoading}
                    skeleton={<SessionsLoading />}
                    empty={<Empty description="Aucune session active" />}
                    render={(sessions) => (
                        <Flex vertical gap={16}>
                            {sessions.map((session) => (
                                <SessionCard
                                    key={session.id}
                                    session={session}
                                    loading={revokeLoading}
                                    onRevoke={onRevoke}
                                />
                            ))}
                        </Flex>
                    )}
                />
            </SettingsCard>
        </div>
    );
};

export default SecurityContainer;
