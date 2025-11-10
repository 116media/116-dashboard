import { lazy } from "react";
import { FORGOT_PASSWORD_PATH } from "@/shared/lib/constants/paths";

const ForgotPasswordPage = lazy(() => import("."));

/**
 * Forgot password page route configuration.
 *
 * @description
 * Defines the route for the forgot password page with lazy loading.
 * Configured for public access (isLoggedIn: false).
 */
const route = [
    {
        path: FORGOT_PASSWORD_PATH,
        name: "Mot De Passe Oublié",
        component: ForgotPasswordPage,
        exact: true,
        extraProps: {
            isLoggedIn: false
        }
    }
];

export default route;
