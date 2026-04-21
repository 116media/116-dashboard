import type { FC } from "react";
import { Navigate, Outlet } from "react-router";
import { LOGIN_PATH, OVERVIEW_PATH } from "@/shared/presentation/constants/paths";
import { useAppSelector } from "@/shared/presentation/store/store";

type GuardType = "guest" | "protected";

interface IRouteGuardProps {
    type: GuardType;
}

const REDIRECT_PATH: Record<GuardType, string> = {
    guest: OVERVIEW_PATH,
    protected: LOGIN_PATH
};

/**
 * Unified route guard for guest and protected routes.
 *
 * @component
 *
 * @description
 * Controls access based on authentication state.
 * - `"guest"`: redirects authenticated users to overview
 * - `"protected"`: redirects unauthenticated users to login
 */
export const RouteGuard: FC<IRouteGuardProps> = ({ type }) => {
    const user = useAppSelector(({ session: { currentUser } }) => currentUser.data);

    const isAuthenticated = !!user;
    const shouldRedirect = type === "guest" ? isAuthenticated : !isAuthenticated;

    if (shouldRedirect) return <Navigate to={REDIRECT_PATH[type]} replace />;
    return <Outlet />;
};
