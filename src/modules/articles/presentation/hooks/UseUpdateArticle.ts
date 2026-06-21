import type { FormInstance } from "antd";
import { Form } from "antd";

import { useEffect, useState } from "react";
import type { IArticleEntity } from "@/modules/articles/domain/entities/IArticleEntity";
import type { IArticleSummaryEntity } from "@/modules/articles/domain/entities/IArticleSummaryEntity";
import { ArticleImageType } from "@/modules/articles/domain/enums/article-image-type.enum";
import { useUploadArticleImage } from "@/modules/articles/presentation/hooks/UseUploadArticleImage";
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
    coverImageUrl: string | null | undefined;
    coverFile: File | null;
    setCoverFile: (file: File | null) => void;
    orderItems: ReturnType<typeof usePaidOrderItems>;
    onSubmit: (values: IUpdateArticleCredentials) => Promise<void>;
    resetUpdate: () => void;
}

/**
 * Custom hook for the edit article form logic.
 *
 * @description
 * Fetches the full article detail (including body) when the selected article changes, then
 * pre-populates the form. The cover image is captured locally and uploaded on save (deferred),
 * while inline body images keep uploading immediately as they are inserted in the editor.
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
    const [coverImageUrl, setCoverImageUrl] = useState<string | null | undefined>(undefined);
    const [coverFile, setCoverFile] = useState<File | null>(null);
    const orderItems = usePaidOrderItems("article");
    const uploadImage = useUploadArticleImage();

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
                    socialBoost: detail.socialBoost,
                    metaTitle: detail.metaTitle,
                    metaDescription: detail.metaDescription
                });
                setCoverImageUrl(detail.coverImageUrl);

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
        const orderItemsReady = !orderItems.loading && orderItems.options.length > 0;
        const canPrefillOrderItem = Boolean(fetchedDetail?.orderItemId) && orderItemsReady;

        if (!canPrefillOrderItem) return;

        form.setFieldValue("orderItemId", fetchedDetail?.orderItemId);
    }, [fetchedDetail, orderItems.options, orderItems.loading, form]);

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

        if (!updateArticleAction.fulfilled.match(result)) return;

        if (coverFile) {
            const url = await uploadImage.onUpload(article.id, coverFile, ArticleImageType.Cover);
            if (url === null) return;
            setCoverImageUrl(url);
        }

        setSuccess(ArticlesNotification.updateSuccess.description);
        showNotification(ArticlesNotification.updateSuccess);
        setCoverFile(null);
        onSuccess?.();
    };

    const resetUpdate = () => {
        setSuccess(null);
        setFetchedDetail(null);
        setCoverImageUrl(undefined);
        setCoverFile(null);
        form.resetFields();
        dispatch(resetUpdateArticleAction());
    };

    return {
        form,
        loading: loading || uploadImage.loading,
        detailLoading,
        error,
        success,
        coverImageUrl,
        coverFile,
        setCoverFile,
        orderItems,
        onSubmit,
        resetUpdate
    };
};
