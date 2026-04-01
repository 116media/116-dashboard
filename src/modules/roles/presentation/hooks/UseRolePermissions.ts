import { useCallback } from "react";
import type { IPermissionEntity } from "@/modules/permissions/domain/entities/IPermission";
import { getAllPermissionsAction } from "@/modules/permissions/presentation/store/getall.action";
import type { IRoleWithPermissions } from "@/modules/roles/domain/entities/IRoleWithPermissions";
import { assignPermissionAction } from "@/modules/roles/presentation/store/assignpermission.action";
import { getRoleByIdAction } from "@/modules/roles/presentation/store/getbyid.action";
import { removePermissionAction } from "@/modules/roles/presentation/store/removepermission.action";
import { RolesNotification } from "@/modules/roles/presentation/utils/notification/roles.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

/**
 * Return type for the role permissions hook.
 *
 * @interface IUseRolePermissions
 */
interface IUseRolePermissions {
    role: IRoleWithPermissions | null;
    allPermissions: IPermissionEntity[];
    roleLoading: boolean;
    permissionsLoading: boolean;
    assignLoading: boolean;
    removeLoading: boolean;
    assignError: Failure | null | undefined;
    removeError: Failure | null | undefined;
    fetchRole: (roleId: string) => void;
    fetchAllPermissions: () => void;
    onAssign: (roleId: string, permissionId: string) => Promise<void>;
    onRemove: (roleId: string, permissionId: string) => Promise<void>;
}

/**
 * Custom hook for assigning and removing permissions from a role.
 *
 * @description
 * Provides handlers to fetch a role with its permissions, fetch
 * all available permissions, and assign or remove a single
 * permission. Shows success or backend error notifications
 * and calls `reload` to refresh the roles table.
 *
 * @param reload - Callback to refresh the roles list after a successful action
 * @returns Role data, permissions list, loading/error states, and action handlers
 */
export const useRolePermissions = (reload: () => void): IUseRolePermissions => {
    const dispatch = useAppDispatch();

    const getByIdState = useAppSelector(({ roles: { getById } }) => getById);
    const getAllState = useAppSelector(({ permissions: { getAll } }) => getAll);
    const assignState = useAppSelector(({ roles: { assignPermission } }) => assignPermission);
    const removeState = useAppSelector(({ roles: { removePermission } }) => removePermission);

    const fetchRole = useCallback(
        (roleId: string) => {
            dispatch(getRoleByIdAction(roleId));
        },
        [dispatch]
    );

    const fetchAllPermissions = useCallback(() => {
        dispatch(
            getAllPermissionsAction({
                pageIndex: 0,
                pageSize: 1000,
                isActive: true,
                isDeleted: false
            })
        );
    }, [dispatch]);

    const onAssign = async (roleId: string, permissionId: string) => {
        const result = await dispatch(assignPermissionAction({ roleId, permissionId }));

        if (assignPermissionAction.fulfilled.match(result)) {
            showNotification(RolesNotification.assignPermissionSuccess);
            reload();
        } else if (assignPermissionAction.rejected.match(result) && result.payload) {
            showNotification({
                type: "error",
                title: result.payload.title,
                description: result.payload.detail
            });
        }
    };

    const onRemove = async (roleId: string, permissionId: string) => {
        const result = await dispatch(removePermissionAction({ roleId, permissionId }));

        if (removePermissionAction.fulfilled.match(result)) {
            showNotification(RolesNotification.removePermissionSuccess);
            reload();
        } else if (removePermissionAction.rejected.match(result) && result.payload) {
            showNotification({
                type: "error",
                title: result.payload.title,
                description: result.payload.detail
            });
        }
    };

    return {
        role: getByIdState.data,
        allPermissions: getAllState.data?.items ?? [],
        roleLoading: getByIdState.loading,
        permissionsLoading: getAllState.loading,
        assignLoading: assignState.loading,
        removeLoading: removeState.loading,
        assignError: assignState.error,
        removeError: removeState.error,
        fetchRole,
        fetchAllPermissions,
        onAssign,
        onRemove
    };
};
