import type { FormInstance } from "antd";
import { Form } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import type { IArticleEntity } from "@/modules/articles/domain/entities/IArticleEntity";
import type { IArticleSummaryEntity } from "@/modules/articles/domain/entities/IArticleSummaryEntity";
import type { IUpdateArticleCredentials } from "@/modules/articles/presentation/model/IUpdateArticleCredentials";
import { getArticleByIdAction } from "@/modules/articles/presentation/store/getarticlebyid.action";
import {
    resetUpdateArticleAction,
    updateArticleAction
} from "@/modules/articles/presentation/store/updatearticle.action";
import { ArticlesNotification } from "@/modules/articles/presentation/utils/notification/articles.notification";
import { usePaidOrderItems } from "@/modules/commerce/presentation/hooks/UsePaidOrderItems";
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
    orderItems: ReturnType<typeof usePaidOrderItems>;
    onSubmit: (values: IUpdateArticleCredentials) => Promise<void>;
    resetUpdate: () => void;
}

/**
 * Custom hook for the edit article form logic.
 *
 * @description
 * Fetches the full article detail (including body) when the
 * selected article changes, then pre-populates the form.
 * When the article has a customerId, order items are fetched
 * for that customer so the orderItemId select displays correctly.
 */
export const useUpdateArticle = (
    article: IArticleSummaryEntity | null,
    onSuccess?: () => void
): IUseUpdateArticle => {
    const dispatch = useAppDispatch();
    const [form] = useForm<IUpdateArticleCredentials>();
    const [success, setSuccess] = useState<string | null>(null);
    const [detailLoading, setDetailLoading] = useState(false);
    const [fetchedDetail, setFetchedDetail] = useState<IArticleEntity | null>(null);
    const orderItems = usePaidOrderItems("article");

    const { loading, error } = useAppSelector(({ articles: { updateArticle } }) => updateArticle);

    useEffect(() => {
        if (!article?.id) return;

        const fetchDetail = async () => {
            setDetailLoading(true);
            const result = await dispatch(getArticleByIdAction(article.id));

            if (getArticleByIdAction.fulfilled.match(result)) {
                const detail = result.payload as IArticleEntity;
                setFetchedDetail(detail);
                form.setFieldsValue({
                    categoryId: detail.categoryId,
                    title: detail.title,
                    headline: detail.headline,
                    body: detail.body,
                    coverImageUrl: detail.coverImageUrl,
                    socialBoost: detail.socialBoost,
                    isFeatured: detail.isFeatured,
                    featuredUntil: detail.featuredUntil ? dayjs(detail.featuredUntil) : null,
                    metaTitle: detail.metaTitle,
                    metaDescription: detail.metaDescription
                });

                if (detail.customerId) {
                    form.setFieldValue("customerId", detail.customerId);
                    orderItems.fetchByCustomer(detail.customerId);
                }
            }
            setDetailLoading(false);
        };

        fetchDetail();
    }, [article, dispatch, form, orderItems.fetchByCustomer]);

    useEffect(() => {
        if (!fetchedDetail?.orderItemId || orderItems.loading || orderItems.options.length === 0)
            return;
        form.setFieldValue("orderItemId", fetchedDetail.orderItemId);
    }, [fetchedDetail, orderItems.options, orderItems.loading, form]);

    const onSubmit = async (values: IUpdateArticleCredentials): Promise<void> => {
        if (!article) return;

        const { featuredUntil, ...rest } = values;
        const result = await dispatch(
            updateArticleAction({
                id: article.id,
                data: {
                    ...rest,
                    slug: generateSlug(values.title, { unique: true }),
                    featuredUntil: featuredUntil ? dayjs(featuredUntil).toISOString() : null
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
        setFetchedDetail(null);
        form.resetFields();
        dispatch(resetUpdateArticleAction());
        form.resetFields();
    };

    return { form, loading, detailLoading, error, success, orderItems, onSubmit, resetUpdate };
};
