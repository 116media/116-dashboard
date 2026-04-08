import type { FormInstance } from "antd";
import { Form } from "antd";
import { useState } from "react";
import type { ICreateCategoryCredentials } from "@/modules/catalog/presentation/model/ICreateCategoryCredentials";
import { createCategoryAction } from "@/modules/catalog/presentation/store/createcategory.action";
import { CategoriesNotification } from "@/modules/catalog/presentation/utils/notification/catalog.categories.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";
import { generateSlug } from "@/shared/presentation/utils/slug/slug.utils";

const { useForm } = Form;

/**
 * Return type for the create category hook.
 *
 * @interface IUseCreateCategory
 */
interface IUseCreateCategory {
    form: FormInstance<ICreateCategoryCredentials>;
    loading: boolean;
    error: Failure | null | undefined;
    success: string | null;
    onSubmit: (values: ICreateCategoryCredentials) => Promise<void>;
    resetCreate: () => void;
}

/**
 * Custom hook for the create category form logic.
 *
 * @description
 * Manages form state, submission, and success feedback for
 * creating a new category. On success, sets a success message
 * and shows a toast notification.
 *
 * @returns Form instance, loading/error state, success message, and submit handler
 */
export const useCreateCategory = (onSuccess?: () => void): IUseCreateCategory => {
    const dispatch = useAppDispatch();
    const [form] = useForm<ICreateCategoryCredentials>();
    const [success, setSuccess] = useState<string | null>(null);

    const { loading, error } = useAppSelector(({ catalog: { createCategory } }) => createCategory);

    const onSubmit = async (values: ICreateCategoryCredentials): Promise<void> => {
        const slug = generateSlug(values.name);
        const result = await dispatch(
            createCategoryAction({
                slug,
                name: values.name,
                isFree: values.isFree,
                description: values.description,
                contentTypeId: values.contentTypeId
            })
        );

        if (createCategoryAction.fulfilled.match(result)) {
            setSuccess(CategoriesNotification.createSuccess.description);
            showNotification(CategoriesNotification.createSuccess);
            form.resetFields();
            onSuccess?.();
        }
    };

    const resetCreate = () => {
        setSuccess(null);
    };

    return { form, loading, error, success, onSubmit, resetCreate };
};
