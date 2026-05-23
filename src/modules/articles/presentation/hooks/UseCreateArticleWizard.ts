import type { FormInstance } from "antd";
import { Form } from "antd";
import { useCallback, useState } from "react";
import type { IArticleEntity } from "@/modules/articles/domain/entities/IArticleEntity";
import { ArticleImageType } from "@/modules/articles/domain/enums/article-image-type.enum";
import type { ICreateArticleCredentials } from "@/modules/articles/presentation/model/ICreateArticleCredentials";
import type { IUpdateArticleSeoCredentials } from "@/modules/articles/presentation/model/IUpdateArticleSeoCredentials";
import type { IWizardStep2Credentials } from "@/modules/articles/presentation/model/IWizardStep2Credentials";
import { createArticleAction } from "@/modules/articles/presentation/store/createarticle.action";
import { getArticleByIdAction } from "@/modules/articles/presentation/store/getarticlebyid.action";
import { submitArticleAction } from "@/modules/articles/presentation/store/submitarticle.action";
import { updateArticleAction } from "@/modules/articles/presentation/store/updatearticle.action";
import { updateArticleSeoAction } from "@/modules/articles/presentation/store/updatearticleseo.action";
import { updateArticleTagsAction } from "@/modules/articles/presentation/store/updatearticletags.action";
import { uploadArticleImageAction } from "@/modules/articles/presentation/store/uploadarticleimage.action";
import { ArticlesNotification } from "@/modules/articles/presentation/utils/notification/articles.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";
import { generateSlug } from "@/shared/presentation/utils/slug/slug.utils";

const { useForm } = Form;

interface IUseCreateArticleWizard {
    currentStep: number;
    articleId: string | null;
    article: IArticleEntity | null;
    loading: boolean;
    error: Failure | null | undefined;
    step1Form: FormInstance<ICreateArticleCredentials>;
    step2Form: FormInstance<IWizardStep2Credentials>;
    seoForm: FormInstance<IUpdateArticleSeoCredentials>;
    tagNames: string[];
    onTagsChange: (names: string[]) => void;
    onImageUpload: (file: File) => Promise<string>;
    onCoverUpload: (file: File) => Promise<string>;
    goNext: () => Promise<void>;
    goBack: () => void;
    onSubmit: () => Promise<void>;
    reset: () => void;
}

/**
 * Manages the 4-step article creation wizard lifecycle.
 *
 * @description
 * Orchestrates form instances, API calls, and step navigation
 * for the article creation wizard. Step 1 creates the draft,
 * Step 2 updates content, Step 3 sets tags + SEO, Step 4 submits.
 *
 * @param onSuccess - Called after final submission
 */
export const useCreateArticleWizard = (onSuccess: () => void): IUseCreateArticleWizard => {
    const dispatch = useAppDispatch();
    const [currentStep, setCurrentStep] = useState(0);
    const [articleId, setArticleId] = useState<string | null>(null);
    const [article, setArticle] = useState<IArticleEntity | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Failure | null | undefined>(null);
    const [tagNames, setTagNames] = useState<string[]>([]);

    const [step1Form] = useForm<ICreateArticleCredentials>();
    const [step2Form] = useForm<IWizardStep2Credentials>();
    const [seoForm] = useForm<IUpdateArticleSeoCredentials>();

    const fetchArticle = useCallback(
        async (id: string) => {
            const result = await dispatch(getArticleByIdAction(id));
            if (getArticleByIdAction.fulfilled.match(result)) {
                setArticle(result.payload);
            }
        },
        [dispatch]
    );

    const onImageUpload = useCallback(
        async (file: File): Promise<string> => {
            if (!articleId) throw new Error("Article not created yet");

            const result = await dispatch(
                uploadArticleImageAction({
                    id: articleId,
                    data: { file, imageType: ArticleImageType.Body }
                })
            );

            if (uploadArticleImageAction.fulfilled.match(result)) {
                return result.payload.url;
            }
            throw new Error("Upload failed");
        },
        [dispatch, articleId]
    );

    const onCoverUpload = useCallback(
        async (file: File): Promise<string> => {
            if (!articleId) throw new Error("Article not created yet");

            const result = await dispatch(
                uploadArticleImageAction({
                    id: articleId,
                    data: { file, imageType: ArticleImageType.Cover }
                })
            );

            if (uploadArticleImageAction.fulfilled.match(result)) {
                return result.payload.url;
            }
            throw new Error("Upload failed");
        },
        [dispatch, articleId]
    );

    const handleStep1 = async () => {
        const values = await step1Form.validateFields();

        // Draft already created — just advance
        if (articleId) {
            setCurrentStep(1);
            return;
        }

        setLoading(true);
        setError(null);

        const result = await dispatch(
            createArticleAction({
                ...values,
                slug: generateSlug(values.title, { unique: true })
            })
        );

        if (createArticleAction.fulfilled.match(result)) {
            const created = result.payload;
            setArticleId(created.id);
            setArticle(created);
            setLoading(false);
            setCurrentStep(1);
        } else if (createArticleAction.rejected.match(result)) {
            setError(result.payload);
            setLoading(false);
        }
    };

    const handleStep2 = async () => {
        const values = await step2Form.validateFields();
        if (!articleId || !article) return;

        setLoading(true);
        setError(null);

        const result = await dispatch(
            updateArticleAction({
                id: articleId,
                data: {
                    categoryId: article.categoryId,
                    title: article.title,
                    slug: article.slug,
                    headline: values.headline,
                    body: values.body,
                    coverImageUrl: values.coverImageUrl,
                    socialBoost: step1Form.getFieldValue("socialBoost") ?? false,
                    isFeatured: step1Form.getFieldValue("isFeatured") ?? false,
                    featuredUntil: step1Form.getFieldValue("featuredUntil") ?? null
                }
            })
        );

        if (updateArticleAction.fulfilled.match(result)) {
            await fetchArticle(articleId);
            setLoading(false);
            setCurrentStep(2);
        } else if (updateArticleAction.rejected.match(result)) {
            setError(result.payload);
            setLoading(false);
        }
    };

    const handleStep3 = async () => {
        if (!articleId) return;

        setLoading(true);
        setError(null);

        if (tagNames.length > 0) {
            await dispatch(updateArticleTagsAction({ id: articleId, data: { tagNames } }));
        }

        try {
            const seoValues = await seoForm.validateFields();
            await dispatch(updateArticleSeoAction({ id: articleId, data: seoValues }));
        } catch {
            // SEO is optional — skip if form not filled
        }

        await fetchArticle(articleId);
        setLoading(false);
        setCurrentStep(3);
    };

    const goNext = async () => {
        switch (currentStep) {
            case 0:
                await handleStep1();
                break;
            case 1:
                await handleStep2();
                break;
            case 2:
                await handleStep3();
                break;
        }
    };

    const goBack = () => {
        setCurrentStep((prev) => Math.max(0, prev - 1));
    };

    const onSubmitFinal = async () => {
        if (!articleId) return;

        setLoading(true);
        setError(null);

        const result = await dispatch(submitArticleAction(articleId));

        if (submitArticleAction.fulfilled.match(result)) {
            showNotification(ArticlesNotification.submitSuccess);
            setLoading(false);
            onSuccess();
        } else if (submitArticleAction.rejected.match(result)) {
            setError(result.payload);
            setLoading(false);
        }
    };

    const reset = () => {
        setCurrentStep(0);
        setArticleId(null);
        setArticle(null);
        setLoading(false);
        setError(null);
        setTagNames([]);
        step1Form.resetFields();
        step2Form.resetFields();
        seoForm.resetFields();
    };

    return {
        currentStep,
        articleId,
        article,
        loading,
        error,
        step1Form,
        step2Form,
        seoForm,
        tagNames,
        onTagsChange: setTagNames,
        onImageUpload,
        onCoverUpload,
        goNext,
        goBack,
        onSubmit: onSubmitFinal,
        reset
    };
};
