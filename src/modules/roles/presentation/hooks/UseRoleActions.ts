import type { AsyncThunk } from "@reduxjs/toolkit";
import { activateRoleAction } from "@/modules/roles/presentation/store/activate.action";
import { deactivateRoleAction } from "@/modules/roles/presentation/store/deactivate.action";
import { hardDeleteRoleAction } from "@/modules/roles/presentation/store/harddelete.action";
import { restoreRoleAction } from "@/modules/roles/presentation/store/restore.action";
import { softDeleteRoleAction } from "@/modules/roles/presentation/store/softdelete.action";
import { RolesNotification } from "@/modules/roles/presentation/utils/notification/roles.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

/**
 * Return type for the role actions hook.
 *
 * @interface IUseRoleActions
 */
interface IUseRoleActions {
    loading: boolean;
    error: Failure | null | undefined;
    onActivate: (id: string) => Promise<void>;
    onDeactivate: (id: string) => Promise<void>;
    onSoftDelete: (id: string) => Promise<void>;
    onHardDelete: (id: string) => Promise<void>;
    onRestore: (id: string) => Promise<void>;
}

/**
 * Custom hook for role status change and deletion actions.
 *
 * @description
 * Provides handlers for activate, deactivate, soft-delete,
 * hard-delete, and restore operations. Shows a success notification
 * on fulfilled and a backend error toast on rejection. Calls
 * `reload` after each successful action to refresh the table.
 *
 * @param reload - Callback to refresh the roles list after a successful action
 * @returns Action handlers, aggregate loading, and error state
 */
export const useRoleActions = (reload: () => void): IUseRoleActions => {
    const dispatch = useAppDispatch();

    const activateState = useAppSelector(({ roles: { activate } }) => activate);
    const deactivateState = useAppSelector(({ roles: { deactivate } }) => deactivate);
    const softDeleteState = useAppSelector(({ roles: { softDelete } }) => softDelete);
    const hardDeleteState = useAppSelector(({ roles: { hardDelete } }) => hardDelete);
    const restoreState = useAppSelector(({ roles: { restore } }) => restore);

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
        notification: typeof RolesNotification.activateSuccess
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
        dispatchAction(activateRoleAction, id, RolesNotification.activateSuccess);

    const onDeactivate = (id: string) =>
        dispatchAction(deactivateRoleAction, id, RolesNotification.deactivateSuccess);

    const onSoftDelete = (id: string) =>
        dispatchAction(softDeleteRoleAction, id, RolesNotification.softDeleteSuccess);

    const onHardDelete = (id: string) =>
        dispatchAction(hardDeleteRoleAction, id, RolesNotification.hardDeleteSuccess);

    const onRestore = (id: string) =>
        dispatchAction(restoreRoleAction, id, RolesNotification.restoreSuccess);

    return { loading, error, onActivate, onDeactivate, onSoftDelete, onHardDelete, onRestore };
};
