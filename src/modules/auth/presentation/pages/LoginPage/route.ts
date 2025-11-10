import { lazy } from "react";
import { LOGIN_PATH } from "@/shared/lib/constants/paths";

const LoginPage = lazy(() => import("."));

/**
 * Login page route configuration.
 *
 * @description
 * Defines the route for the login page with lazy loading.
 * Configured for public access (isLoggedIn: false).
 */
const route = [
    {
        path: LOGIN_PATH,
        name: "Connexion",
        component: LoginPage,
        exact: true,
        extraProps: {
            isLoggedIn: false
        }
    }
];

export default route;
