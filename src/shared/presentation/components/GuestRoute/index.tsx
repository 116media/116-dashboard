import type { FC } from "react";
import { Navigate, Outlet } from "react-router";
import { OVERVIEW_PATH } from "@/shared/infrastructure/constants/paths";
import { useAppSelector } from "@/shared/presentation/store/store";

/**
 * Route guard for guest-only (unauthenticated) pages.
 *
 * @component
 *
 * @description
 * Inverse of ProtectedRoute. Checks for an authenticated user in Redux state.
 * Redirects authenticated users to the overview page.
 * Renders child routes via Outlet when not authenticated.
 *
 * Used to prevent logged-in users from accessing login or forgot-password pages.
 *
 * @returns Child routes or a redirect to overview
 */
export const GuestRoute: FC = () => {
    const user = useAppSelector(({ auth: { login } }) => login.data?.user);

    if (user) {
        return <Navigate to={OVERVIEW_PATH} replace />;
    }

    return <Outlet />;
};
