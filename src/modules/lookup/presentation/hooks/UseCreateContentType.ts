import type { FormInstance } from "antd";
import { Form } from "antd";
import { useState } from "react";
import type { ICreateContentTypeCredentials } from "@/modules/lookup/presentation/model/ICreateContentTypeCredentials";
import {
    createContentTypeAction,
    resetCreateContentTypeAction
} from "@/modules/lookup/presentation/store/createcontenttype.action";
import { ContentTypesNotification } from "@/modules/lookup/presentation/utils/notification/lookup.content-types.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

const { useForm } = Form;

/**
 * Return type for the create content type hook.
 *
 * @interface IUseCreateContentType
 */
interface IUseCreateContentType {
    form: FormInstance<ICreateContentTypeCredentials>;
    loading: boolean;
    error: Failure | null | undefined;
    success: string | null;
    onSubmit: (values: ICreateContentTypeCredentials) => Promise<void>;
    resetCreate: () => void;
}

/**
 * Custom hook for the create content type form logic.
 *
 * @description
 * Manages form state, submission, and success feedback for
 * creating a new content type. On success, sets a success message
 * and shows a toast notification.
 *
 * @returns Form instance, loading/error state, success message, and submit handler
 */
export const useCreateContentType = (onSuccess?: () => void): IUseCreateContentType => {
    const dispatch = useAppDispatch();
    const [form] = useForm<ICreateContentTypeCredentials>();
    const [success, setSuccess] = useState<string | null>(null);

    const { loading, error } = useAppSelector(
        ({ lookup: { createContentType } }) => createContentType
    );

    const onSubmit = async (values: ICreateContentTypeCredentials): Promise<void> => {
        const result = await dispatch(createContentTypeAction(values));

        if (createContentTypeAction.fulfilled.match(result)) {
            setSuccess(ContentTypesNotification.createSuccess.description);
            showNotification(ContentTypesNotification.createSuccess);
            form.resetFields();
            onSuccess?.();
        }
    };

    const resetCreate = () => {
        setSuccess(null);
        form.resetFields();
        dispatch(resetCreateContentTypeAction());
    };

    return { form, loading, error, success, onSubmit, resetCreate };
};
