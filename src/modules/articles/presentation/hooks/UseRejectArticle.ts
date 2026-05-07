import type { FormInstance } from "antd";
import { Form } from "antd";
import { useState } from "react";
import type { IRejectArticleCredentials } from "@/modules/articles/presentation/model/IRejectArticleCredentials";
import { rejectArticleAction } from "@/modules/articles/presentation/store/rejectarticle.action";
import { ArticlesNotification } from "@/modules/articles/presentation/utils/notification/articles.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

const { useForm } = Form;

/**
 * Return type for the reject article hook.
 *
 * @interface IUseRejectArticle
 */
interface IUseRejectArticle {
    form: FormInstance<IRejectArticleCredentials>;
    loading: boolean;
    error: Failure | null | undefined;
    success: string | null;
    onSubmit: (id: string, values: IRejectArticleCredentials) => Promise<void>;
    resetReject: () => void;
}

/**
 * Custom hook for the reject article form logic.
 *
 * @description
 * Manages form state, submission, and success feedback for
 * rejecting an article with a reason. On success, sets a
 * success message and shows a toast notification.
 *
 * @returns Form instance, loading/error state, success message, and submit handler
 */
export const useRejectArticle = (): IUseRejectArticle => {
    const dispatch = useAppDispatch();
    const [form] = useForm<IRejectArticleCredentials>();
    const [success, setSuccess] = useState<string | null>(null);

    const { loading, error } = useAppSelector(({ articles: { rejectArticle } }) => rejectArticle);

    const onSubmit = async (id: string, values: IRejectArticleCredentials): Promise<void> => {
        const result = await dispatch(
            rejectArticleAction({
                id,
                data: { rejectionReason: values.rejectionReason }
            })
        );

        if (rejectArticleAction.fulfilled.match(result)) {
            setSuccess(ArticlesNotification.rejectSuccess.description);
            showNotification(ArticlesNotification.rejectSuccess);
            form.resetFields();
        }
    };

    const resetReject = () => {
        setSuccess(null);
    };

    return { form, loading, error, success, onSubmit, resetReject };
};
