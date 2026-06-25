import type { FormInstance } from "antd";
import { Form } from "antd";
import { useState } from "react";
import { useUploadCategoryPoster } from "@/modules/catalog/presentation/hooks/UseUploadCategoryPoster";
import type { ICreateCategoryCredentials } from "@/modules/catalog/presentation/model/ICreateCategoryCredentials";
import {
    createCategoryAction,
    resetCreateCategoryAction
} from "@/modules/catalog/presentation/store/createcategory.action";
import { CategoriesNotification } from "@/modules/catalog/presentation/utils/notification/catalog.categories.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";
import { generateSlug } from "@/shared/presentation/utils/slug/slug.utils";

const { useForm } = Form;

/**
 * Return type for the create category hook.
 *
 * @interface IUseCreateCategory
 */
interface IUseCreateCategory {
    form: FormInstance<ICreateCategoryCredentials>;
    loading: boolean;
    error: Failure | null | undefined;
    success: string | null;
    posterFile: File | null;
    setPosterFile: (file: File | null) => void;
    onSubmit: (values: ICreateCategoryCredentials) => Promise<void>;
    resetCreate: () => void;
}

/**
 * Custom hook for the create category form logic.
 *
 * @description
 * Creates the category from the JSON form, then — if a poster was selected — uploads it to the
 * newly created category via the dedicated endpoint. The poster file is captured locally and
 * uploaded on save, so cancelling creates nothing.
 *
 * @returns Form instance, loading/error state, success message, captured poster, and handlers
 */
export const useCreateCategory = (onSuccess?: () => void): IUseCreateCategory => {
    const dispatch = useAppDispatch();
    const [form] = useForm<ICreateCategoryCredentials>();
    const [success, setSuccess] = useState<string | null>(null);
    const [posterFile, setPosterFile] = useState<File | null>(null);
    const { onUpload: uploadPoster, loading: posterUploading } = useUploadCategoryPoster();

    const { loading, error } = useAppSelector(({ catalog: { createCategory } }) => createCategory);

    const onSubmit = async (values: ICreateCategoryCredentials): Promise<void> => {
        const slug = generateSlug(values.name);
        const result = await dispatch(
            createCategoryAction({
                slug,
                name: values.name,
                isFree: values.isFree,
                isGossip: values.isGossip ?? false,
                isExclusive: values.isExclusive ?? false,
                description: values.description,
                contentTypeId: values.contentTypeId
            })
        );

        if (!createCategoryAction.fulfilled.match(result)) return;

        if (posterFile) {
            const url = await uploadPoster(result.payload.id, posterFile);
            if (url === null) return;
        }

        setSuccess(CategoriesNotification.createSuccess.description);
        showNotification(CategoriesNotification.createSuccess);
        form.resetFields();
        setPosterFile(null);
        onSuccess?.();
    };

    const resetCreate = () => {
        setSuccess(null);
        setPosterFile(null);
        form.resetFields();
        dispatch(resetCreateCategoryAction());
    };

    return {
        form,
        loading: loading || posterUploading,
        error,
        success,
        posterFile,
        setPosterFile,
        onSubmit,
        resetCreate
    };
};
