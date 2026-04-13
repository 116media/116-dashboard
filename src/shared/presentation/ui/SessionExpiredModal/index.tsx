import { Modal } from "antd";
import { type FC, useCallback, useEffect, useState } from "react";
import { LOGIN_PATH } from "@/shared/infrastructure/constants/paths";
import { REFRESH_TOKEN_EXPIRED_EVENT } from "@/shared/infrastructure/interceptors/refresh-token-expiry.interceptor";
import { persistor } from "@/shared/presentation/store/store";

/**
 * Modal displayed when the user's refresh token has expired.
 *
 * @component
 *
 * @description
 * Listens for the {@link REFRESH_TOKEN_EXPIRED_EVENT} custom DOM event
 * dispatched by the token expiry interceptors, then shows a
 * non-dismissible modal informing the user their session has expired.
 *
 * On OK, Redux state is purged and the user is redirected to the login page.
 *
 * @remarks
 * - Mount this component once at the app root so it is always active.
 * - The modal cannot be closed by clicking outside or pressing Escape.
 * - Only one instance of the modal is shown even if multiple requests fail.
 */
const SessionExpiredModal: FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSessionExpired = useCallback(() => {
        setIsOpen(true);
    }, []);

    useEffect(() => {
        window.addEventListener(REFRESH_TOKEN_EXPIRED_EVENT, handleSessionExpired);
        return () => {
            window.removeEventListener(REFRESH_TOKEN_EXPIRED_EVENT, handleSessionExpired);
        };
    }, [handleSessionExpired]);

    const handleOk = () => {
        setIsOpen(false);
        persistor.purge();
        window.location.href = LOGIN_PATH;
    };

    return (
        <Modal
            open={isOpen}
            centered
            closable={false}
            mask={{ closable: false }}
            keyboard={false}
            title="Session expirée"
            okText="OK"
            cancelButtonProps={{ style: { display: "none" } }}
            onOk={handleOk}
        >
            Votre session a expiré. Veuillez vous reconnecter pour continuer.
        </Modal>
    );
};

export default SessionExpiredModal;
