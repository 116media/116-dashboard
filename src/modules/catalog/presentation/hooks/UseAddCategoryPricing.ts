import type { FormInstance } from "antd";
import { Form } from "antd";
import { useState } from "react";
import type { IAddCategoryPricingCredentials } from "@/modules/catalog/presentation/model/IAddCategoryPricingCredentials";
import {
    addCategoryPricingAction,
    resetAddCategoryPricingAction
} from "@/modules/catalog/presentation/store/addcategorypricing.action";
import { CategoriesNotification } from "@/modules/catalog/presentation/utils/notification/catalog.categories.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

const { useForm } = Form;

/**
 * Return type for the add category pricing hook.
 *
 * @interface IUseAddCategoryPricing
 */
interface IUseAddCategoryPricing {
    form: FormInstance<IAddCategoryPricingCredentials>;
    loading: boolean;
    error: Failure | null | undefined;
    success: string | null;
    onSubmit: (values: IAddCategoryPricingCredentials) => Promise<void>;
    resetAdd: () => void;
}

/**
 * Custom hook for the add category pricing form logic.
 *
 * @description
 * Manages form state, submission, and success feedback for
 * adding a pricing tier to a category. On success, sets a
 * success message and shows a toast notification.
 *
 * @param categoryId - The category to add pricing to
 * @returns Form instance, loading/error state, success message, and submit handler
 */
export const useAddCategoryPricing = (
    categoryId: string | null,
    onSuccess?: () => void
): IUseAddCategoryPricing => {
    const dispatch = useAppDispatch();
    const [form] = useForm<IAddCategoryPricingCredentials>();
    const [success, setSuccess] = useState<string | null>(null);

    const { loading, error } = useAppSelector(
        ({ catalog: { addCategoryPricing } }) => addCategoryPricing
    );

    const onSubmit = async (values: IAddCategoryPricingCredentials): Promise<void> => {
        if (!categoryId) return;

        const result = await dispatch(addCategoryPricingAction({ categoryId, data: values }));

        if (addCategoryPricingAction.fulfilled.match(result)) {
            setSuccess(CategoriesNotification.addPricingSuccess.description);
            showNotification(CategoriesNotification.addPricingSuccess);
            form.resetFields();
            onSuccess?.();
        }
    };

    const resetAdd = () => {
        setSuccess(null);
        form.resetFields();
        dispatch(resetAddCategoryPricingAction());
    };

    return { form, loading, error, success, onSubmit, resetAdd };
};
