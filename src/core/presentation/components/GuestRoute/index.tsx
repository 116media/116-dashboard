import type { FC } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthStorageService } from "@/modules/auth/infrastructure/storage/authstorage.service";
import { OVERVIEW_PATH } from "@/shared/lib/constants/paths";

/**
 * Route guard for guest-only (unauthenticated) pages.
 *
 * @component
 *
 * @description
 * Inverse of ProtectedRoute. Checks for a valid auth token via AuthStorageService.
 * Redirects authenticated users to the overview page.
 * Renders child routes via Outlet when not authenticated.
 *
 * Used to prevent logged-in users from accessing login or forgot-password pages.
 *
 * @returns Child routes or a redirect to overview
 */
export const GuestRoute: FC = () => {
    const token = AuthStorageService.getToken();

    if (token) {
        return <Navigate to={OVERVIEW_PATH} replace />;
    }

    return <Outlet />;
};
