import type { FormInstance } from "antd";
import { Form } from "antd";
import { useEffect, useState } from "react";
import type { IContentTypeEntity } from "@/modules/lookup/domain/entities/IContentTypeEntity";
import type { IUpdateContentTypeCredentials } from "@/modules/lookup/presentation/model/IUpdateContentTypeCredentials";
import { updateContentTypeAction } from "@/modules/lookup/presentation/store/updatecontenttype.action";
import { ContentTypesNotification } from "@/modules/lookup/presentation/utils/notification/lookup.content-types.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

const { useForm } = Form;

/**
 * Return type for the update content type hook.
 *
 * @interface IUseUpdateContentType
 */
interface IUseUpdateContentType {
    form: FormInstance<IUpdateContentTypeCredentials>;
    loading: boolean;
    error: Failure | null | undefined;
    success: string | null;
    onSubmit: (values: IUpdateContentTypeCredentials) => Promise<void>;
    resetUpdate: () => void;
}

/**
 * Custom hook for the edit content type form logic.
 *
 * @description
 * Manages form state, pre-population from initial values,
 * submission, and success feedback for updating a content type.
 *
 * @param contentType - The content type to edit (used for pre-population and ID)
 * @returns Form instance, loading/error state, success message, and submit handler
 */
export const useUpdateContentType = (
    contentType: IContentTypeEntity | null
): IUseUpdateContentType => {
    const dispatch = useAppDispatch();
    const [form] = useForm<IUpdateContentTypeCredentials>();
    const [success, setSuccess] = useState<string | null>(null);

    const { loading, error } = useAppSelector(
        ({ lookup: { updateContentType } }) => updateContentType
    );

    useEffect(() => {
        if (contentType) {
            form.setFieldsValue({
                name: contentType.name
            });
        }
    }, [contentType, form]);

    const onSubmit = async (values: IUpdateContentTypeCredentials): Promise<void> => {
        if (!contentType) return;

        const result = await dispatch(
            updateContentTypeAction({ id: contentType.id, data: values })
        );

        if (updateContentTypeAction.fulfilled.match(result)) {
            setSuccess(ContentTypesNotification.updateSuccess.description);
            showNotification(ContentTypesNotification.updateSuccess);
        }
    };

    const resetUpdate = () => {
        setSuccess(null);
        form.resetFields();
    };

    return { form, loading, error, success, onSubmit, resetUpdate };
};
