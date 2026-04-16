import { useCallback } from "react";
import type { IRoleWithPermissions } from "@/platform/settings/domain/entities/IRoleWithPermissions";
import { getRolesAction } from "@/platform/settings/presentation/store/security.action";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";

interface IUseRoles {
    roles: IRoleWithPermissions[];
    loading: boolean;
    error: Failure | null | undefined;
    fetchRoles: () => void;
}

/**
 * Custom hook for fetching and accessing the user's roles and permissions.
 *
 * @description
 * Dispatches the roles fetch action on demand. Returns the list
 * of roles with their permissions, loading, and error state.
 *
 * @returns Roles data and fetch utilities
 */
export const useRoles = (): IUseRoles => {
    const dispatch = useAppDispatch();
    const { data: roles, loading, error } = useAppSelector(({ settings: { roles } }) => roles);

    const fetchRoles = useCallback(() => {
        dispatch(getRolesAction());
    }, [dispatch]);

    return { roles: Array.isArray(roles) ? roles : [], loading, error, fetchRoles };
};
