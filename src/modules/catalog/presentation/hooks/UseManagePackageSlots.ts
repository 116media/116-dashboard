import { removePackageSlotAction } from "@/modules/catalog/presentation/store/removepackageslot.action";
import { PackagesNotification } from "@/modules/catalog/presentation/utils/notification/catalog.packages.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

/**
 * Return type for the manage package slots hook.
 *
 * @interface IUseManagePackageSlots
 */
interface IUseManagePackageSlots {
    removeLoading: boolean;
    removeError: Failure | null | undefined;
    onRemoveSlot: (slotId: string) => Promise<void>;
}

/**
 * Custom hook for managing package slots (remove only).
 *
 * @description
 * Provides a handler for removing a slot from a package.
 * Shows a success notification on fulfilled and a backend error
 * toast on rejection. Calls `onSuccess` after a successful removal.
 *
 * @param packageId - The package whose slots are being managed
 * @param onSuccess - Optional callback invoked after a successful removal
 * @returns Loading/error state and remove handler
 */
export const useManagePackageSlots = (
    packageId: string | null,
    onSuccess?: () => void
): IUseManagePackageSlots => {
    const dispatch = useAppDispatch();

    const removeState = useAppSelector(({ catalog: { removePackageSlot } }) => removePackageSlot);

    const onRemoveSlot = async (slotId: string): Promise<void> => {
        if (!packageId) return;

        const result = await dispatch(removePackageSlotAction({ packageId, slotId }));

        if (removePackageSlotAction.fulfilled.match(result)) {
            showNotification(PackagesNotification.removeSlotSuccess);
            onSuccess?.();
        } else if (removePackageSlotAction.rejected.match(result) && result.payload) {
            showNotification({
                type: "error",
                title: result.payload.title,
                description: result.payload.detail
            });
        }
    };

    return {
        removeLoading: removeState.loading,
        removeError: removeState.error,
        onRemoveSlot
    };
};
