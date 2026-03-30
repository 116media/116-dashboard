import { Modal } from "antd";
import { useCallback } from "react";
import type { ISession } from "@/platform/session/domain/entities/ISession";
import {
    getSessionsAction,
    revokeSessionAction
} from "@/platform/session/presentation/store/session.action";
import { SettingsNotification } from "@/platform/settings/presentation/utils/notification/settings.notification";
import type { IApiProblemDetails } from "@/shared/infrastructure/api/type";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

interface IUseSessions {
    sessions: ISession[];
    loading: boolean;
    error: IApiProblemDetails | null | undefined;
    revokeLoading: boolean;
    fetchSessions: () => void;
    onRevoke: (sessionId: string) => void;
}

/**
 * Custom hook for managing login sessions.
 *
 * @description
 * Fetches the user's sessions and provides a revoke action with
 * a confirmation modal. Refreshes the session list after a
 * successful revoke and shows a success notification.
 *
 * @returns Session list, loading/error state, and revoke handler
 */
export const useSessions = (): IUseSessions => {
    const dispatch = useAppDispatch();
    const {
        data: sessions,
        loading,
        error
    } = useAppSelector(({ session: { sessions } }) => sessions);
    const { loading: revokeLoading } = useAppSelector(
        ({ session: { revokeSession } }) => revokeSession
    );

    const fetchSessions = useCallback(() => {
        dispatch(getSessionsAction());
    }, [dispatch]);

    const onRevoke = useCallback(
        (sessionId: string) => {
            Modal.confirm({
                title: "Révoquer la session",
                content:
                    "Êtes-vous sûr de vouloir révoquer cette session ? L'appareil sera déconnecté immédiatement.",
                okText: "Révoquer",
                okButtonProps: { danger: true },
                cancelText: "Annuler",
                async onOk() {
                    const result = await dispatch(revokeSessionAction(sessionId));
                    if (revokeSessionAction.fulfilled.match(result)) {
                        dispatch(getSessionsAction());
                        showNotification(SettingsNotification.sessionRevokeSuccess);
                    }
                }
            });
        },
        [dispatch]
    );

    return {
        error,
        loading,
        onRevoke,
        revokeLoading,
        fetchSessions,
        sessions: Array.isArray(sessions) ? sessions : []
    };
};
