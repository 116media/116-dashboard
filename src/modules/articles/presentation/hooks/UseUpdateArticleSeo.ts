import type { FormInstance } from "antd";
import { Form } from "antd";
import { useEffect, useState } from "react";
import type { IArticleEntity } from "@/modules/articles/domain/entities/IArticleEntity";
import type { IArticleSummaryEntity } from "@/modules/articles/domain/entities/IArticleSummaryEntity";
import type { IUpdateArticleSeoCredentials } from "@/modules/articles/presentation/model/IUpdateArticleSeoCredentials";
import { getArticleByIdAction } from "@/modules/articles/presentation/store/getarticlebyid.action";
import {
    resetUpdateArticleSeoAction,
    updateArticleSeoAction
} from "@/modules/articles/presentation/store/updatearticleseo.action";
import { ArticlesNotification } from "@/modules/articles/presentation/utils/notification/articles.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

const { useForm } = Form;

/**
 * Return type for the update article SEO hook.
 *
 * @interface IUseUpdateArticleSeo
 */
interface IUseUpdateArticleSeo {
    form: FormInstance<IUpdateArticleSeoCredentials>;
    loading: boolean;
    error: Failure | null | undefined;
    success: string | null;
    onSubmit: (values: IUpdateArticleSeoCredentials) => Promise<void>;
    resetSeo: () => void;
}

/**
 * Custom hook for the article SEO metadata form logic.
 *
 * @description
 * Manages form state, pre-population of metaTitle and metaDescription
 * from the article entity, submission, and success feedback for
 * updating an article's SEO metadata.
 *
 * @param article - The article whose SEO to edit (used for pre-population and ID)
 * @param onSuccess - Optional callback invoked after successful update
 * @returns Form instance, loading/error state, success message, and submit handler
 */
export const useUpdateArticleSeo = (
    article: IArticleSummaryEntity | null,
    onSuccess?: () => void
): IUseUpdateArticleSeo => {
    const dispatch = useAppDispatch();
    const [form] = useForm<IUpdateArticleSeoCredentials>();
    const [success, setSuccess] = useState<string | null>(null);

    const { loading, error } = useAppSelector(
        ({ articles: { updateArticleSeo } }) => updateArticleSeo
    );

    useEffect(() => {
        if (!article?.id) return;

        const fetchDetail = async () => {
            const result = await dispatch(getArticleByIdAction(article.id));
            if (getArticleByIdAction.fulfilled.match(result)) {
                const detail = result.payload as IArticleEntity;
                form.setFieldsValue({
                    metaTitle: detail.metaTitle ?? "",
                    metaDescription: detail.metaDescription ?? ""
                });
            }
        };

        fetchDetail();
    }, [article, dispatch, form]);

    const onSubmit = async (values: IUpdateArticleSeoCredentials): Promise<void> => {
        if (!article) return;

        const result = await dispatch(
            updateArticleSeoAction({
                id: article.id,
                data: values
            })
        );

        if (updateArticleSeoAction.fulfilled.match(result)) {
            setSuccess(ArticlesNotification.updateSeoSuccess.description);
            showNotification(ArticlesNotification.updateSeoSuccess);
            onSuccess?.();
        }
    };

    const resetSeo = () => {
        setSuccess(null);
        form.resetFields();
        dispatch(resetUpdateArticleSeoAction());
        form.resetFields();
    };

    return { form, loading, error, success, onSubmit, resetSeo };
};
