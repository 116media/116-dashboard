import type { FC } from "react";
import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "@/core/presentation/store/store";
import { LOGIN_PATH } from "@/shared/lib/constants/paths";

/**
 * Route guard for authenticated pages.
 *
 * @component
 *
 * @description
 * Checks for a valid auth token via AuthStorageService.
 * Redirects unauthenticated users to the login page.
 * Renders child routes via Outlet when authenticated.
 *
 * @returns Child routes or a redirect to login
 */
export const ProtectedRoute: FC = () => {
    const token = useAppSelector(({ auth: { login } }) => login.data?.token);

    if (!token) {
        return <Navigate to={LOGIN_PATH} replace />;
    }

    return <Outlet />;
};
