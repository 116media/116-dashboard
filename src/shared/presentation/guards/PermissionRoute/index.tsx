import type { FC } from "react";
import { Navigate, Outlet } from "react-router";
import {
    type PermissionCheck,
    useAuthorization
} from "@/modules/auth/presentation/hooks/UseAuthorization";
import { NOT_FOUND_PATH } from "@/shared/presentation/constants/paths";

/**
 * Props for the PermissionRoute component.
 *
 * @interface IPermissionRouteProps
 * @property {PermissionCheck[]} permissions - Required permissions to access child routes
 * @property {"every" | "some"} [mode] - "every" = AND (all required), "some" = OR (any one)
 */
interface IPermissionRouteProps {
    mode?: "every" | "some";
    permissions: PermissionCheck[];
}

/**
 * Route-level guard that gates access based on permissions.
 *
 * @component
 *
 * @description
 * Wraps child routes and checks the current user's permissions
 * via `useAuthorization`. If the check fails, redirects to 404
 * (not 403) to prevent information leakage about route existence.
 *
 * SuperAdmin bypass is handled inside `useAuthorization` — this
 * component does not need any SuperAdmin-specific logic.
 *
 * @param {IPermissionRouteProps} props - Component props
 * @returns {JSX.Element} Child routes or redirect to 404
 *
 * @example
 * ```tsx
 * // Single permission (AND is default)
 * <PermissionRoute permissions={[{ resource: "roles", action: "read" }]}>
 *     <Route path="/roles" element={<RolesPage />} />
 * </PermissionRoute>
 *
 * // Multiple permissions with OR logic
 * <PermissionRoute
 *     permissions={[
 *         { resource: "ads_banners", action: "read" },
 *         { resource: "ads_stories", action: "read" }
 *     ]}
 *     mode="some"
 * >
 *     <Route path="/ads" element={<AdsPage />} />
 * </PermissionRoute>
 * ```
 */
export const PermissionRoute: FC<IPermissionRouteProps> = ({ permissions, mode = "every" }) => {
    const { hasEvery, hasSome } = useAuthorization();

    const check = mode === "every" ? hasEvery : hasSome;

    if (!check(permissions)) {
        return <Navigate to={NOT_FOUND_PATH} replace />;
    }

    return <Outlet />;
};
