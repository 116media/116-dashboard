import type { FormInstance } from "antd";
import { Form } from "antd";
import { useState } from "react";
import type { ICreateTagCredentials } from "@/modules/lookup/presentation/model/ICreateTagCredentials";
import { createTagAction } from "@/modules/lookup/presentation/store/createtag.action";
import { TagsNotification } from "@/modules/lookup/presentation/utils/notification/lookup.tags.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";
import { generateSlug } from "@/shared/presentation/utils/slug/slug.utils";

const { useForm } = Form;

/**
 * Return type for the create tag hook.
 *
 * @interface IUseCreateTag
 */
interface IUseCreateTag {
    form: FormInstance<ICreateTagCredentials>;
    loading: boolean;
    success: string | null;
    resetCreate: () => void;
    error: Failure | null | undefined;
    onSubmit: (values: ICreateTagCredentials) => Promise<void>;
}

/**
 * Custom hook for the create tag form logic.
 *
 * @description
 * Manages form state, submission, and success feedback for
 * creating a new tag. On success, sets a success message
 * and shows a toast notification.
 *
 * @returns Form instance, loading/error state, success message, and submit handler
 */
export const useCreateTag = (onSuccess?: () => void): IUseCreateTag => {
    const dispatch = useAppDispatch();
    const [form] = useForm<ICreateTagCredentials>();
    const [success, setSuccess] = useState<string | null>(null);

    const { loading, error } = useAppSelector(({ lookup: { createTag } }) => createTag);

    const onSubmit = async (values: ICreateTagCredentials): Promise<void> => {
        const slug = generateSlug(values.name, { unique: true });
        const result = await dispatch(createTagAction({ ...values, slug }));

        if (createTagAction.fulfilled.match(result)) {
            setSuccess(TagsNotification.createSuccess.description);
            showNotification(TagsNotification.createSuccess);
            form.resetFields();
            onSuccess?.();
        }
    };

    const resetCreate = () => {
        setSuccess(null);
    };

    return { form, loading, error, success, onSubmit, resetCreate };
};
