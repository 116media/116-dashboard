import type { FC } from "react";
import { Navigate, Outlet } from "react-router";
import { LOGIN_PATH } from "@/shared/infrastructure/constants/paths";
import { useAppSelector } from "@/shared/presentation/store/store";

/**
 * Route guard for authenticated pages.
 *
 * @component
 *
 * @description
 * Checks for an authenticated user in Redux state.
 * Redirects unauthenticated users to the login page.
 * Renders child routes via Outlet when authenticated.
 *
 * @returns Child routes or a redirect to login
 */
export const ProtectedRoute: FC = () => {
    const user = useAppSelector(({ auth: { login } }) => login.data?.user);

    if (!user) {
        return <Navigate to={LOGIN_PATH} replace />;
    }

    return <Outlet />;
};
