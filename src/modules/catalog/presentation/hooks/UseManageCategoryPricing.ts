import type { FormInstance } from "antd";
import { Form } from "antd";
import type { IUpdateCategoryPricingCredentials } from "@/modules/catalog/presentation/model/IUpdateCategoryPricingCredentials";
import { removeCategoryPricingAction } from "@/modules/catalog/presentation/store/removecategorypricing.action";
import { updateCategoryPricingAction } from "@/modules/catalog/presentation/store/updatecategorypricing.action";
import { CategoriesNotification } from "@/modules/catalog/presentation/utils/notification/catalog.categories.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

const { useForm } = Form;

/**
 * Return type for the manage category pricing hook.
 *
 * @interface IUseManageCategoryPricing
 */
interface IUseManageCategoryPricing {
    updateForm: FormInstance<IUpdateCategoryPricingCredentials>;
    updateLoading: boolean;
    updateError: Failure | null | undefined;
    onUpdatePricing: (
        pricingId: string,
        values: IUpdateCategoryPricingCredentials
    ) => Promise<void>;
    removeLoading: boolean;
    removeError: Failure | null | undefined;
    onRemovePricing: (pricingId: string) => Promise<void>;
}

/**
 * Custom hook for managing category pricing (update and remove).
 *
 * @description
 * Provides handlers for updating and removing pricing entries
 * on a category. Shows success notifications on fulfilled actions
 * and backend error toasts on rejection.
 *
 * @param categoryId - The category whose pricing is being managed
 * @param onSuccess - Optional callback invoked after a successful action
 * @returns Update form, loading/error states, and action handlers
 */
export const useManageCategoryPricing = (
    categoryId: string | null,
    onSuccess?: () => void
): IUseManageCategoryPricing => {
    const dispatch = useAppDispatch();
    const [updateForm] = useForm<IUpdateCategoryPricingCredentials>();

    const updateState = useAppSelector(
        ({ catalog: { updateCategoryPricing } }) => updateCategoryPricing
    );
    const removeState = useAppSelector(
        ({ catalog: { removeCategoryPricing } }) => removeCategoryPricing
    );

    const onUpdatePricing = async (
        pricingId: string,
        values: IUpdateCategoryPricingCredentials
    ): Promise<void> => {
        if (!categoryId) return;

        const result = await dispatch(
            updateCategoryPricingAction({ categoryId, pricingId, data: values })
        );

        if (updateCategoryPricingAction.fulfilled.match(result)) {
            showNotification(CategoriesNotification.updatePricingSuccess);
            onSuccess?.();
        } else if (updateCategoryPricingAction.rejected.match(result) && result.payload) {
            showNotification({
                type: "error",
                title: result.payload.title,
                description: result.payload.detail
            });
        }
    };

    const onRemovePricing = async (pricingId: string): Promise<void> => {
        if (!categoryId) return;

        const result = await dispatch(removeCategoryPricingAction({ categoryId, pricingId }));

        if (removeCategoryPricingAction.fulfilled.match(result)) {
            showNotification(CategoriesNotification.removePricingSuccess);
            onSuccess?.();
        } else if (removeCategoryPricingAction.rejected.match(result) && result.payload) {
            showNotification({
                type: "error",
                title: result.payload.title,
                description: result.payload.detail
            });
        }
    };

    return {
        updateForm,
        updateLoading: updateState.loading,
        updateError: updateState.error,
        onUpdatePricing,
        removeLoading: removeState.loading,
        removeError: removeState.error,
        onRemovePricing
    };
};
