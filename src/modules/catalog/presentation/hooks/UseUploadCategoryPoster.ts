import { uploadCategoryPosterAction } from "@/modules/catalog/presentation/store/uploadcategoryposter.action";
import { CategoriesNotification } from "@/modules/catalog/presentation/utils/notification/catalog.categories.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

/**
 * Return type for the upload category poster hook.
 *
 * @interface IUseUploadCategoryPoster
 */
interface IUseUploadCategoryPoster {
    loading: boolean;
    error: Failure | null | undefined;
    onUpload: (id: string, file: File) => Promise<string | null>;
}

/**
 * Custom hook for uploading a category poster image.
 *
 * @description
 * Dispatches `uploadCategoryPosterAction` with the category ID and file via the dedicated poster
 * endpoint, decoupled from create/update — mirroring how the article cover image is uploaded.
 * Shows a success or error notification and returns the resolved poster URL.
 *
 * @returns Loading/error state and upload handler
 */
export const useUploadCategoryPoster = (): IUseUploadCategoryPoster => {
    const dispatch = useAppDispatch();

    const { loading, error } = useAppSelector(
        ({ catalog: { uploadCategoryPoster } }) => uploadCategoryPoster
    );

    const onUpload = async (id: string, file: File): Promise<string | null> => {
        const result = await dispatch(uploadCategoryPosterAction({ id, data: { file } }));

        if (uploadCategoryPosterAction.fulfilled.match(result)) {
            showNotification(CategoriesNotification.uploadPosterSuccess);
            return result.payload.posterUrl;
        }

        if (uploadCategoryPosterAction.rejected.match(result) && result.payload) {
            showNotification({
                type: "error",
                title: result.payload.title,
                description: result.payload.detail
            });
        }

        return null;
    };

    return { loading, error, onUpload };
};
