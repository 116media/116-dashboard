import { Card } from "antd";
import type { FC } from "react";
import FormHeader from "@/modules/auth/presentation/components/ui/FormHeader";
import { LoginContainer } from "@/modules/auth/presentation/containers/LoginContainer";
import { Logo } from "@/shared/presentation/ui/Logo";

import styles from "./index.module.scss";

/**
 * Login page component for admin authentication.
 *
 * @component
 *
 * @description
 * Main login page displaying the application logo and login form
 * in a centered card layout.
 *
 * @returns The login page
 */
const LoginPage: FC = () => {
    return (
        <div className={styles.login}>
            <Card hoverable={false} variant="borderless" className={styles.login__card}>
                <Logo canRedirect={false} className={styles.login__card__logo} />
                <FormHeader
                    title="Bon retour"
                    subtitle="Ah, vous voilà! Remplissez vos informations."
                />
                <LoginContainer />
            </Card>
        </div>
    );
};

export default LoginPage;
