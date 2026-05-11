import type { FormInstance } from "antd";
import { Form } from "antd";
import { useEffect, useState } from "react";
import type { IArticleEntity } from "@/modules/articles/domain/entities/IArticleEntity";
import type { IArticleSummaryEntity } from "@/modules/articles/domain/entities/IArticleSummaryEntity";
import type { IUpdateArticleCredentials } from "@/modules/articles/presentation/model/IUpdateArticleCredentials";
import { getArticleByIdAction } from "@/modules/articles/presentation/store/getarticlebyid.action";
import { updateArticleAction } from "@/modules/articles/presentation/store/updatearticle.action";
import { ArticlesNotification } from "@/modules/articles/presentation/utils/notification/articles.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";
import { generateSlug } from "@/shared/presentation/utils/slug/slug.utils";

const { useForm } = Form;

interface IUseUpdateArticle {
    form: FormInstance<IUpdateArticleCredentials>;
    loading: boolean;
    detailLoading: boolean;
    error: Failure | null | undefined;
    success: string | null;
    onSubmit: (values: IUpdateArticleCredentials) => Promise<void>;
    resetUpdate: () => void;
}

/**
 * Custom hook for the edit article form logic.
 *
 * @description
 * Fetches the full article detail (including body) when the
 * selected article changes, then pre-populates the form.
 * The list only provides summary data without body content.
 */
export const useUpdateArticle = (
    article: IArticleSummaryEntity | null,
    onSuccess?: () => void
): IUseUpdateArticle => {
    const dispatch = useAppDispatch();
    const [form] = useForm<IUpdateArticleCredentials>();
    const [success, setSuccess] = useState<string | null>(null);
    const [detailLoading, setDetailLoading] = useState(false);

    const { loading, error } = useAppSelector(({ articles: { updateArticle } }) => updateArticle);

    useEffect(() => {
        if (!article?.id) return;

        const fetchDetail = async () => {
            setDetailLoading(true);
            const result = await dispatch(getArticleByIdAction(article.id));

            if (getArticleByIdAction.fulfilled.match(result)) {
                const detail = result.payload as IArticleEntity;
                form.setFieldsValue({
                    categoryId: detail.categoryId,
                    title: detail.title,
                    headline: detail.headline,
                    body: detail.body,
                    coverImageUrl: detail.coverImageUrl,
                    socialBoost: false,
                    isFeatured: detail.isFeatured,
                    featuredUntil: detail.featuredUntil,
                    metaTitle: detail.metaTitle,
                    metaDescription: detail.metaDescription
                });
            }
            setDetailLoading(false);
        };

        fetchDetail();
    }, [article, dispatch, form]);

    const onSubmit = async (values: IUpdateArticleCredentials): Promise<void> => {
        if (!article) return;

        const result = await dispatch(
            updateArticleAction({
                id: article.id,
                data: {
                    ...values,
                    slug: generateSlug(values.title, { unique: true })
                }
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

    return { form, loading, detailLoading, error, success, onSubmit, resetUpdate };
};
