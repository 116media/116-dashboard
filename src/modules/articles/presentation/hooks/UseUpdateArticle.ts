import type { FormInstance } from "antd";
import { Form } from "antd";
import { useEffect, useState } from "react";
import type { IArticleEntity } from "@/modules/articles/domain/entities/IArticleEntity";
import type { IUpdateArticleCredentials } from "@/modules/articles/presentation/model/IUpdateArticleCredentials";
import { updateArticleAction } from "@/modules/articles/presentation/store/updatearticle.action";
import { ArticlesNotification } from "@/modules/articles/presentation/utils/notification/articles.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

const { useForm } = Form;

/**
 * Return type for the update article hook.
 *
 * @interface IUseUpdateArticle
 */
interface IUseUpdateArticle {
    form: FormInstance<IUpdateArticleCredentials>;
    loading: boolean;
    error: Failure | null | undefined;
    success: string | null;
    onSubmit: (values: IUpdateArticleCredentials) => Promise<void>;
    resetUpdate: () => void;
}

/**
 * Custom hook for the edit article form logic.
 *
 * @description
 * Manages form state, pre-population from initial values,
 * submission, and success feedback for updating an article.
 *
 * @param article - The article to edit (used for pre-population and ID)
 * @param onSuccess - Optional callback invoked after successful update
 * @returns Form instance, loading/error state, success message, and submit handler
 */
export const useUpdateArticle = (
    article: IArticleEntity | null,
    onSuccess?: () => void
): IUseUpdateArticle => {
    const dispatch = useAppDispatch();
    const [form] = useForm<IUpdateArticleCredentials>();
    const [success, setSuccess] = useState<string | null>(null);

    const { loading, error } = useAppSelector(({ articles: { updateArticle } }) => updateArticle);

    useEffect(() => {
        if (article) {
            form.setFieldsValue({
                categoryId: article.categoryId,
                title: article.title,
                slug: article.slug,
                headline: article.headline,
                body: article.body,
                coverImageUrl: article.coverImageUrl,
                customerId: undefined,
                orderItemId: undefined,
                socialBoost: false,
                isFeatured: article.isFeatured,
                featuredUntil: article.featuredUntil,
                metaTitle: article.metaTitle,
                metaDescription: article.metaDescription
            });
        }
    }, [article, form]);

    const onSubmit = async (values: IUpdateArticleCredentials): Promise<void> => {
        if (!article) return;

        const result = await dispatch(
            updateArticleAction({
                id: article.id,
                data: values
            })
        );

        if (updateArticleAction.fulfilled.match(result)) {
            setSuccess(ArticlesNotification.updateSuccess.description);
            showNotification(ArticlesNotification.updateSuccess);
            onSuccess?.();
        }
    };

    const resetUpdate = () => {
        setSuccess(null);
        form.resetFields();
    };

    return { form, loading, error, success, onSubmit, resetUpdate };
};
