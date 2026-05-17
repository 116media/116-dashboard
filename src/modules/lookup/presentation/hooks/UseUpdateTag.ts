import type { FormInstance } from "antd";
import { Form } from "antd";
import { useEffect, useState } from "react";
import type { ITagEntity } from "@/modules/lookup/domain/entities/ITagEntity";
import type { IUpdateTagCredentials } from "@/modules/lookup/presentation/model/IUpdateTagCredentials";
import {
    resetUpdateTagAction,
    updateTagAction
} from "@/modules/lookup/presentation/store/updatetag.action";
import { TagsNotification } from "@/modules/lookup/presentation/utils/notification/lookup.tags.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";
import { generateSlug } from "@/shared/presentation/utils/slug/slug.utils";

const { useForm } = Form;

/**
 * Return type for the update tag hook.
 *
 * @interface IUseUpdateTag
 */
interface IUseUpdateTag {
    form: FormInstance<IUpdateTagCredentials>;
    loading: boolean;
    error: Failure | null | undefined;
    success: string | null;
    onSubmit: (values: IUpdateTagCredentials) => Promise<void>;
    resetUpdate: () => void;
}

/**
 * Custom hook for the edit tag form logic.
 *
 * @description
 * Manages form state, pre-population from initial values,
 * submission, and success feedback for updating a tag.
 * Auto-generates the slug from the name using `generateSlug`
 * with a unique suffix before dispatching the update action.
 *
 * @param tag - The tag to edit (used for pre-population and ID)
 * @returns Form instance, loading/error state, success message, and submit handler
 */
export const useUpdateTag = (tag: ITagEntity | null, onSuccess?: () => void): IUseUpdateTag => {
    const dispatch = useAppDispatch();
    const [form] = useForm<IUpdateTagCredentials>();
    const [success, setSuccess] = useState<string | null>(null);

    const { loading, error } = useAppSelector(({ lookup: { updateTag } }) => updateTag);

    useEffect(() => {
        if (tag) {
            form.setFieldsValue({
                name: tag.name
            });
        }
    }, [tag, form]);

    const onSubmit = async (values: IUpdateTagCredentials): Promise<void> => {
        if (!tag) return;

        const slug = generateSlug(values.name, { unique: true });

        const result = await dispatch(
            updateTagAction({ id: tag.id, data: { name: values.name, slug } })
        );

        if (updateTagAction.fulfilled.match(result)) {
            setSuccess(TagsNotification.updateSuccess.description);
            showNotification(TagsNotification.updateSuccess);
            onSuccess?.();
        }
    };

    const resetUpdate = () => {
        setSuccess(null);
        form.resetFields();
        dispatch(resetUpdateTagAction());
        form.resetFields();
    };

    return { form, loading, error, success, onSubmit, resetUpdate };
};
