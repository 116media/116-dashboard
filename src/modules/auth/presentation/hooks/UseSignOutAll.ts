import { Modal } from "antd";
import { useNavigate } from "react-router";
import { signOutAllAction } from "@/modules/auth/presentation/store/signoutall.action";
import { LOGIN_PATH } from "@/shared/presentation/constants/paths";
import { persistor, useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

interface IUseSignOutAll {
    loading: boolean;
    onSignOutAll: () => void;
}

/**
 * Custom hook for signing out from all devices.
 *
 * @description
 * Shows a danger confirmation modal before dispatching the sign-out-all
 * action. On success, purges persisted Redux state and redirects to login.
 * On failure, shows an error notification without logging out.
 *
 * @returns Loading state and sign-out-all handler
 */
export const useSignOutAll = (): IUseSignOutAll => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector(({ auth: { signOutAll } }) => signOutAll);

    const performLogout = () => {
        persistor.purge();
        navigate(LOGIN_PATH, { replace: true });
    };

    const onSignOutAll = () => {
        Modal.confirm({
            title: "Déconnexion de tous les appareils",
            content:
                "Vous serez déconnecté de tous les appareils. Vous devrez vous reconnecter sur chaque appareil.",
            okText: "Confirmer",
            okButtonProps: { danger: true },
            cancelText: "Annuler",
            async onOk() {
                const result = await dispatch(signOutAllAction());
                if (signOutAllAction.fulfilled.match(result)) {
                    performLogout();
                } else if (signOutAllAction.rejected.match(result) && result.payload) {
                    showNotification({
                        type: "error",
                        title: result.payload.title,
                        description: result.payload.detail
                    });
                }
            }
        });
    };

    return { loading, onSignOutAll };
};
