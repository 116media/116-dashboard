import type { FormInstance } from "antd";
import { Form } from "antd";
import { useEffect, useState } from "react";
import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";
import { useUploadCategoryPoster } from "@/modules/catalog/presentation/hooks/UseUploadCategoryPoster";
import type { IUpdateCategoryCredentials } from "@/modules/catalog/presentation/model/IUpdateCategoryCredentials";
import {
    resetUpdateCategoryAction,
    updateCategoryAction
} from "@/modules/catalog/presentation/store/updatecategory.action";
import { CategoriesNotification } from "@/modules/catalog/presentation/utils/notification/catalog.categories.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";
import { generateSlug } from "@/shared/presentation/utils/slug/slug.utils";

const { useForm } = Form;

/**
 * Return type for the update category hook.
 *
 * @interface IUseUpdateCategory
 */
interface IUseUpdateCategory {
    form: FormInstance<IUpdateCategoryCredentials>;
    loading: boolean;
    error: Failure | null | undefined;
    success: string | null;
    posterUrl: string | null | undefined;
    posterFile: File | null;
    setPosterFile: (file: File | null) => void;
    onSubmit: (values: IUpdateCategoryCredentials) => Promise<void>;
    resetUpdate: () => void;
}

/**
 * Custom hook for the edit category form logic.
 *
 * @description
 * Pre-populates the form from the selected category, then on submit updates the JSON metadata and,
 * only if a new poster was selected, uploads it via the dedicated endpoint. The poster file is
 * captured locally and uploaded on save, so cancelling leaves no orphaned upload.
 *
 * @param category - The category to edit (used for pre-population and ID)
 * @param onSuccess - Optional callback invoked after a successful update
 * @returns Form instance, loading/error state, current poster URL, captured file, and handlers
 */
export const useUpdateCategory = (
    category: ICategoryEntity | null,
    onSuccess?: () => void
): IUseUpdateCategory => {
    const dispatch = useAppDispatch();
    const [form] = useForm<IUpdateCategoryCredentials>();
    const [success, setSuccess] = useState<string | null>(null);
    const [posterUrl, setPosterUrl] = useState<string | null | undefined>(undefined);
    const [posterFile, setPosterFile] = useState<File | null>(null);
    const { onUpload: uploadPoster, loading: posterUploading } = useUploadCategoryPoster();

    const { loading, error } = useAppSelector(({ catalog: { updateCategory } }) => updateCategory);

    useEffect(() => {
        if (category) {
            form.setFieldsValue({
                name: category.name,
                description: category.description,
                isGossip: category.isGossip,
                isExclusive: category.isExclusive
            });
            setPosterUrl(category.posterUrl);
        }
    }, [category, form]);

    const onSubmit = async (values: IUpdateCategoryCredentials): Promise<void> => {
        if (!category) return;

        const result = await dispatch(
            updateCategoryAction({
                id: category.id,
                data: {
                    name: values.name,
                    slug: generateSlug(values.name),
                    description: values.description,
                    isGossip: values.isGossip ?? false,
                    isExclusive: values.isExclusive ?? false
                }
            })
        );

        if (!updateCategoryAction.fulfilled.match(result)) return;

        if (posterFile) {
            const url = await uploadPoster(category.id, posterFile);
            if (url === null) return;
            setPosterUrl(url);
        }

        setSuccess(CategoriesNotification.updateSuccess.description);
        showNotification(CategoriesNotification.updateSuccess);
        setPosterFile(null);
        onSuccess?.();
    };

    const resetUpdate = () => {
        setSuccess(null);
        setPosterUrl(undefined);
        setPosterFile(null);
        form.resetFields();
        dispatch(resetUpdateCategoryAction());
    };

    return {
        form,
        loading: loading || posterUploading,
        error,
        success,
        posterUrl,
        posterFile,
        setPosterFile,
        onSubmit,
        resetUpdate
    };
};
