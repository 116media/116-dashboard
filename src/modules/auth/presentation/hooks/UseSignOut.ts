import { Modal } from "antd";
import { useNavigate } from "react-router";
import { signOutAction } from "@/modules/auth/presentation/store/signout.action";
import { SettingsNotification } from "@/platform/settings/presentation/utils/notification/settings.notification";
import { LOGIN_PATH } from "@/shared/infrastructure/constants/paths";
import { persistor, useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

interface IUseSignOut {
    loading: boolean;
    onSignOut: () => void;
}

/**
 * Custom hook for signing out from the current device.
 *
 * @description
 * Shows a confirmation modal before dispatching the sign-out action.
 * Purges persisted Redux state and redirects to login regardless
 * of whether the API call succeeds (graceful logout).
 *
 * @returns Loading state and sign-out handler
 */
export const useSignOut = (): IUseSignOut => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector(({ auth: { signOut } }) => signOut);

    const performLogout = () => {
        persistor.purge();
        navigate(LOGIN_PATH, { replace: true });
    };

    const onSignOut = () => {
        Modal.confirm({
            title: "Déconnexion",
            content: "Êtes-vous sûr de vouloir vous déconnecter ?",
            okText: "Se déconnecter",
            cancelText: "Annuler",
            async onOk() {
                try {
                    await dispatch(signOutAction());
                } catch {
                    showNotification(SettingsNotification.signOutError);
                } finally {
                    performLogout();
                }
            }
        });
    };

    return { loading, onSignOut };
};
