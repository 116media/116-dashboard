import type { FormInstance } from "antd";
import { Form } from "antd";
import { useState } from "react";
import type { ICreateArticleCredentials } from "@/modules/articles/presentation/model/ICreateArticleCredentials";
import {
    createArticleAction,
    resetCreateArticleAction
} from "@/modules/articles/presentation/store/createarticle.action";
import { ArticlesNotification } from "@/modules/articles/presentation/utils/notification/articles.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";
import { generateSlug } from "@/shared/presentation/utils/slug/slug.utils";

const { useForm } = Form;

/**
 * Return type for the create article hook.
 *
 * @interface IUseCreateArticle
 */
interface IUseCreateArticle {
    form: FormInstance<ICreateArticleCredentials>;
    loading: boolean;
    error: Failure | null | undefined;
    success: string | null;
    onSubmit: (values: ICreateArticleCredentials) => Promise<void>;
    resetCreate: () => void;
}

/**
 * Custom hook for the create article form logic.
 *
 * @description
 * Manages form state, submission, and success feedback for
 * creating a new article. On success, sets a success message
 * and shows a toast notification.
 *
 * @param onSuccess - Optional callback invoked after successful creation
 * @returns Form instance, loading/error state, success message, and submit handler
 */
export const useCreateArticle = (onSuccess?: () => void): IUseCreateArticle => {
    const dispatch = useAppDispatch();
    const [form] = useForm<ICreateArticleCredentials>();
    const [success, setSuccess] = useState<string | null>(null);

    const { loading, error } = useAppSelector(({ articles: { createArticle } }) => createArticle);

    const onSubmit = async (values: ICreateArticleCredentials): Promise<void> => {
        const result = await dispatch(
            createArticleAction({
                categoryId: values.categoryId,
                title: values.title,
                slug: generateSlug(values.title, { unique: true }),
                customerId: values.customerId,
                orderItemId: values.orderItemId
            })
        );

        if (createArticleAction.fulfilled.match(result)) {
            setSuccess(ArticlesNotification.createSuccess.description);
            showNotification(ArticlesNotification.createSuccess);
            form.resetFields();
            onSuccess?.();
        }
    };

    const resetCreate = () => {
        setSuccess(null);
        form.resetFields();
        dispatch(resetCreateArticleAction());
    };

    return { form, loading, error, success, onSubmit, resetCreate };
};
