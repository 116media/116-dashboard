import { Modal } from "antd";
import { useNavigate } from "react-router";
import { signOutAllAction } from "@/modules/auth/presentation/store/signoutall.action";
import { SettingsNotification } from "@/platform/settings/presentation/utils/notification/settings.notification";
import { LOGIN_PATH } from "@/shared/infrastructure/constants/paths";
import { persistor, useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

interface IUseSignOutAll {
    loading: boolean;
    onSignOutAll: () => void;
}

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
                } else {
                    showNotification(SettingsNotification.signOutError);
                }
            }
        });
    };

    return { loading, onSignOutAll };
};
