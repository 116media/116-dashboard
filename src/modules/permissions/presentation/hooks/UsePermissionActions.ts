import type { AsyncThunk } from "@reduxjs/toolkit";
import {
    activatePermissionAction,
    resetActivatePermissionAction
} from "@/modules/permissions/presentation/store/activate.action";
import {
    deactivatePermissionAction,
    resetDeactivatePermissionAction
} from "@/modules/permissions/presentation/store/deactivate.action";
import {
    hardDeletePermissionAction,
    resetHardDeletePermissionAction
} from "@/modules/permissions/presentation/store/harddelete.action";
import {
    resetRestorePermissionAction,
    restorePermissionAction
} from "@/modules/permissions/presentation/store/restore.action";
import {
    resetSoftDeletePermissionAction,
    softDeletePermissionAction
} from "@/modules/permissions/presentation/store/softdelete.action";
import { PermissionsNotification } from "@/modules/permissions/presentation/utils/notification/permissions.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

/**
 * Return type for the permission actions hook.
 *
 * @interface IUsePermissionActions
 */
interface IUsePermissionActions {
    loading: boolean;
    error: Failure | null | undefined;
    onActivate: (id: string) => Promise<void>;
    onDeactivate: (id: string) => Promise<void>;
    onSoftDelete: (id: string) => Promise<void>;
    onHardDelete: (id: string) => Promise<void>;
    onRestore: (id: string) => Promise<void>;
    resetActionError: () => void;
}

/**
 * Custom hook for permission status change and deletion actions.
 *
 * @description
 * Provides handlers for activate, deactivate, soft-delete,
 * hard-delete, and restore operations. Shows a success notification
 * on fulfilled and a backend error toast on rejection.
 *
 * @param reload - Callback to refresh the permissions list after a successful action
 * @returns Action handlers, aggregate loading, and error state
 */
export const usePermissionActions = (reload: () => void): IUsePermissionActions => {
    const dispatch = useAppDispatch();

    const activateState = useAppSelector(({ permissions: { activate } }) => activate);
    const deactivateState = useAppSelector(({ permissions: { deactivate } }) => deactivate);
    const softDeleteState = useAppSelector(({ permissions: { softDelete } }) => softDelete);
    const hardDeleteState = useAppSelector(({ permissions: { hardDelete } }) => hardDelete);
    const restoreState = useAppSelector(({ permissions: { restore } }) => restore);

    const loading =
        activateState.loading ||
        deactivateState.loading ||
        softDeleteState.loading ||
        hardDeleteState.loading ||
        restoreState.loading;

    const error =
        activateState.error ||
        deactivateState.error ||
        softDeleteState.error ||
        hardDeleteState.error ||
        restoreState.error;

    const dispatchAction = async <T>(
        thunk: AsyncThunk<T, string, { rejectValue: Failure }>,
        id: string,
        notification: typeof PermissionsNotification.activateSuccess
    ) => {
        const result = await dispatch(thunk(id));

        if (thunk.fulfilled.match(result)) {
            showNotification(notification);
            reload();
        } else if (thunk.rejected.match(result) && result.payload) {
            showNotification({
                type: "error",
                title: result.payload.title,
                description: result.payload.detail
            });
        }
    };

    const onActivate = (id: string) =>
        dispatchAction(activatePermissionAction, id, PermissionsNotification.activateSuccess);

    const onDeactivate = (id: string) =>
        dispatchAction(deactivatePermissionAction, id, PermissionsNotification.deactivateSuccess);

    const onSoftDelete = (id: string) =>
        dispatchAction(softDeletePermissionAction, id, PermissionsNotification.softDeleteSuccess);

    const onHardDelete = (id: string) =>
        dispatchAction(hardDeletePermissionAction, id, PermissionsNotification.hardDeleteSuccess);

    const onRestore = (id: string) =>
        dispatchAction(restorePermissionAction, id, PermissionsNotification.restoreSuccess);

    const resetActionError = () => {
        dispatch(resetActivatePermissionAction());
        dispatch(resetDeactivatePermissionAction());
        dispatch(resetSoftDeletePermissionAction());
        dispatch(resetHardDeletePermissionAction());
        dispatch(resetRestorePermissionAction());
    };

    return {
        loading,
        error,
        onActivate,
        onDeactivate,
        onSoftDelete,
        onHardDelete,
        onRestore,
        resetActionError
    };
};
