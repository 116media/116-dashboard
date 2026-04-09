import { useMemo } from "react";
import type { IPermission } from "@/modules/auth/domain/entities/IPermission";
import { ECoreUserRole } from "@/modules/auth/domain/enums/ECoreUserRole";
import { useAppSelector } from "@/shared/presentation/store/store";

/**
 * Permission check descriptor.
 *
 * @description
 * Matches the backend `resource:action` format used in
 * `PermissionEntity.Resource` and `PermissionEntity.Action`.
 */
export type PermissionCheck = Pick<IPermission, "resource" | "action">;

/**
 * Return type for the authorization hook.
 *
 * @interface IUseAuthorization
 * @property {boolean} isSuperAdmin - Whether the user has the SuperAdmin role
 * @property {boolean} isAdmin - Whether the user has the Admin role
 * @property {boolean} isAdminOrSuperAdmin - Whether the user has Admin or SuperAdmin
 * @property {(check: PermissionCheck) => boolean} hasPermission - Checks a single permission
 * @property {(checks: PermissionCheck[]) => boolean} hasEvery - Checks all permissions (AND)
 * @property {(checks: PermissionCheck[]) => boolean} hasSome - Checks any permission (OR)
 */
interface IUseAuthorization {
    isSuperAdmin: boolean;
    isAdmin: boolean;
    isAdminOrSuperAdmin: boolean;
    hasPermission: (check: PermissionCheck) => boolean;
    hasEvery: (checks: PermissionCheck[]) => boolean;
    hasSome: (checks: PermissionCheck[]) => boolean;
}

/**
 * Single source of truth for all authorization decisions.
 *
 * @description
 * Reads the current user's roles and permissions from the session
 * store. Provides role flags and permission checkers that match
 * the backend RBAC model.
 *
 * The SuperAdmin bypass is encapsulated inside the returned
 * functions — consuming code never needs to write
 * `isSuperAdmin || hasPermission(...)`. When `isSuperAdmin`
 * is true, `hasPermission`, `hasEvery`, and `hasSome` all
 * return true without iterating permissions.
 *
 * @returns Role flags and permission checker functions
 *
 * @example
 * ```tsx
 * const { isSuperAdmin, hasPermission } = useAuthorization();
 *
 * // Hide create button for non-SuperAdmin
 * {isSuperAdmin && <Button>Créer</Button>}
 *
 * // Check a specific permission (SuperAdmin bypasses automatically)
 * {hasPermission({ resource: "articles", action: "create" }) && <Button>Publier</Button>}
 * ```
 */
export const useAuthorization = (): IUseAuthorization => {
    const user = useAppSelector(({ session: { currentUser } }) => currentUser.data);

    const isSuperAdmin = useMemo(
        () => user?.roles?.some((r) => r.name === ECoreUserRole.SuperAdmin) ?? false,
        [user?.roles]
    );

    const isAdmin = useMemo(
        () => user?.roles?.some((r) => r.name === ECoreUserRole.Admin) ?? false,
        [user?.roles]
    );

    const isAdminOrSuperAdmin = isSuperAdmin || isAdmin;

    const hasPermission = useMemo(() => {
        if (!user) return () => false;
        if (isSuperAdmin) return () => true;

        return ({ resource, action }: PermissionCheck) =>
            user.permissions?.some(
                (p) => p.resource === resource && p.action === action && p.isActive
            ) ?? false;
    }, [user, isSuperAdmin]);

    const hasEvery = useMemo(() => {
        if (isSuperAdmin) return () => true;
        return (checks: PermissionCheck[]) => checks.every(hasPermission);
    }, [hasPermission, isSuperAdmin]);

    const hasSome = useMemo(() => {
        if (isSuperAdmin) return () => true;
        return (checks: PermissionCheck[]) => checks.some(hasPermission);
    }, [hasPermission, isSuperAdmin]);

    return { isSuperAdmin, isAdmin, isAdminOrSuperAdmin, hasPermission, hasEvery, hasSome };
};
