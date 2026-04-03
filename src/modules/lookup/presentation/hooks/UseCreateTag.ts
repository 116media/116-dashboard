import type { FormInstance } from "antd";
import { Form } from "antd";
import { useState } from "react";
import type { ICreateTagCredentials } from "@/modules/lookup/presentation/model/ICreateTagCredentials";
import { createTagAction } from "@/modules/lookup/presentation/store/createtag.action";
import { TagsNotification } from "@/modules/lookup/presentation/utils/notification/lookup.tags.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

const { useForm } = Form;

/**
 * Return type for the create tag hook.
 *
 * @interface IUseCreateTag
 */
interface IUseCreateTag {
    form: FormInstance<ICreateTagCredentials>;
    loading: boolean;
    error: Failure | null | undefined;
    success: string | null;
    onSubmit: (values: ICreateTagCredentials) => Promise<void>;
    resetCreate: () => void;
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
export const useCreateTag = (): IUseCreateTag => {
    const dispatch = useAppDispatch();
    const [form] = useForm<ICreateTagCredentials>();
    const [success, setSuccess] = useState<string | null>(null);

    const { loading, error } = useAppSelector(({ lookup: { createTag } }) => createTag);

    const onSubmit = async (values: ICreateTagCredentials): Promise<void> => {
        const result = await dispatch(createTagAction(values));

        if (createTagAction.fulfilled.match(result)) {
            setSuccess(TagsNotification.createSuccess.description);
            showNotification(TagsNotification.createSuccess);
            form.resetFields();
        }
    };

    const resetCreate = () => {
        setSuccess(null);
    };

    return { form, loading, error, success, onSubmit, resetCreate };
};
