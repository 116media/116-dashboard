import { Modal } from "antd";
import { signOutAction } from "@/modules/auth/presentation/store/signout.action";
import { LOGIN_PATH } from "@/shared/presentation/constants/paths";
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
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector(({ auth: { signOut } }) => signOut);

    // Purge persisted state, then hard-replace to login. A soft `navigate` leaves the
    // in-memory Redux store intact (only localStorage is purged), so the user stayed
    // "logged in" until a manual refresh. A full reload rehydrates from the now-empty
    // store — matching the session-expiry / decryption-failure logout paths.
    const performLogout = async () => {
        await persistor.purge();
        window.location.replace(LOGIN_PATH);
    };

    const onSignOut = () => {
        Modal.confirm({
            title: "Déconnexion",
            content: "Êtes-vous sûr de vouloir vous déconnecter ?",
            okText: "Se déconnecter",
            cancelText: "Annuler",
            async onOk() {
                const result = await dispatch(signOutAction());
                if (signOutAction.rejected.match(result) && result.payload) {
                    showNotification({
                        type: "error",
                        title: result.payload.title,
                        description: result.payload.detail
                    });
                }
                await performLogout();
            }
        });
    };

    return { loading, onSignOut };
};
