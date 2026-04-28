import type { AsyncThunk } from "@reduxjs/toolkit";
import { activatePackageAction } from "@/modules/catalog/presentation/store/activatepackage.action";
import { deactivatePackageAction } from "@/modules/catalog/presentation/store/deactivatepackage.action";
import { PackagesNotification } from "@/modules/catalog/presentation/utils/notification/catalog.packages.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

/**
 * Return type for the package actions hook.
 *
 * @interface IUsePackageActions
 */
interface IUsePackageActions {
    loading: boolean;
    error: Failure | null | undefined;
    onActivate: (id: string) => Promise<void>;
    onDeactivate: (id: string) => Promise<void>;
}

/**
 * Custom hook for package activate and deactivate actions.
 *
 * @description
 * Provides handlers for activate and deactivate operations.
 * Shows a success notification on fulfilled and a backend error
 * toast on rejection. Calls `reload` after each successful
 * action to refresh the table.
 *
 * @param reload - Callback to refresh the packages list after a successful action
 * @returns Action handlers, aggregate loading, and error state
 */
export const usePackageActions = (reload: () => void): IUsePackageActions => {
    const dispatch = useAppDispatch();

    const activateState = useAppSelector(({ catalog: { activatePackage } }) => activatePackage);
    const deactivateState = useAppSelector(
        ({ catalog: { deactivatePackage } }) => deactivatePackage
    );

    const loading = activateState.loading || deactivateState.loading;
    const error = activateState.error || deactivateState.error;

    const dispatchAction = async <T>(
        thunk: AsyncThunk<T, string, { rejectValue: Failure }>,
        id: string,
        notification: typeof PackagesNotification.activateSuccess
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

    const onActivate = (id: string) => {
        return dispatchAction(activatePackageAction, id, PackagesNotification.activateSuccess);
    };

    const onDeactivate = (id: string) => {
        return dispatchAction(deactivatePackageAction, id, PackagesNotification.deactivateSuccess);
    };

    return { loading, error, onActivate, onDeactivate };
};
