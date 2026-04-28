import type { FormInstance } from "antd";
import { Form } from "antd";
import { useEffect, useState } from "react";
import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";
import type { IUpdateCategoryCredentials } from "@/modules/catalog/presentation/model/IUpdateCategoryCredentials";
import { updateCategoryAction } from "@/modules/catalog/presentation/store/updatecategory.action";
import { CategoriesNotification } from "@/modules/catalog/presentation/utils/notification/catalog.categories.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";
import { generateSlug } from "@/shared/presentation/utils/slug/slug.utils";

const { useForm } = Form;

/**
 * Return type for the update category hook.
 *
 * @interface IUseUpdateCategory
 */
interface IUseUpdateCategory {
    form: FormInstance<IUpdateCategoryCredentials>;
    loading: boolean;
    error: Failure | null | undefined;
    success: string | null;
    onSubmit: (values: IUpdateCategoryCredentials) => Promise<void>;
    resetUpdate: () => void;
}

/**
 * Custom hook for the edit category form logic.
 *
 * @description
 * Manages form state, pre-population from initial values,
 * submission, and success feedback for updating a category.
 *
 * @param category - The category to edit (used for pre-population and ID)
 * @returns Form instance, loading/error state, success message, and submit handler
 */
export const useUpdateCategory = (
    category: ICategoryEntity | null,
    onSuccess?: () => void
): IUseUpdateCategory => {
    const dispatch = useAppDispatch();
    const [form] = useForm<IUpdateCategoryCredentials>();
    const [success, setSuccess] = useState<string | null>(null);

    const { loading, error } = useAppSelector(({ catalog: { updateCategory } }) => updateCategory);

    useEffect(() => {
        if (category) {
            form.setFieldsValue({
                name: category.name
            });
        }
    }, [category, form]);

    const onSubmit = async (values: IUpdateCategoryCredentials): Promise<void> => {
        if (!category) return;

        const result = await dispatch(
            updateCategoryAction({
                id: category.id,
                data: {
                    name: values.name,
                    slug: generateSlug(values.name),
                    description: values.description
                }
            })
        );

        if (updateCategoryAction.fulfilled.match(result)) {
            setSuccess(CategoriesNotification.updateSuccess.description);
            showNotification(CategoriesNotification.updateSuccess);
            onSuccess?.();
        }
    };

    const resetUpdate = () => {
        setSuccess(null);
        form.resetFields();
    };

    return { form, loading, error, success, onSubmit, resetUpdate };
};
