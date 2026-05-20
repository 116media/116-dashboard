import type { ArticleImageType } from "@/modules/articles/domain/enums/article-image-type.enum";
import { uploadArticleImageAction } from "@/modules/articles/presentation/store/uploadarticleimage.action";
import { ArticlesNotification } from "@/modules/articles/presentation/utils/notification/articles.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

/**
 * Return type for the upload article image hook.
 *
 * @interface IUseUploadArticleImage
 */
interface IUseUploadArticleImage {
    loading: boolean;
    error: Failure | null | undefined;
    onUpload: (id: string, file: File, imageType: ArticleImageType) => Promise<string | null>;
}

/**
 * Custom hook for uploading an article image.
 *
 * @description
 * Dispatches `uploadArticleImageAction` with the article ID,
 * file, and image type. Shows a success or error notification
 * after the upload completes.
 *
 * @returns Loading/error state and upload handler
 */
export const useUploadArticleImage = (): IUseUploadArticleImage => {
    const dispatch = useAppDispatch();

    const { loading, error } = useAppSelector(
        ({ articles: { uploadArticleImage } }) => uploadArticleImage
    );

    const onUpload = async (
        id: string,
        file: File,
        imageType: ArticleImageType
    ): Promise<string | null> => {
        const result = await dispatch(uploadArticleImageAction({ id, data: { file, imageType } }));

        if (uploadArticleImageAction.fulfilled.match(result)) {
            showNotification(ArticlesNotification.uploadImageSuccess);
            return result.payload.url;
        }

        if (uploadArticleImageAction.rejected.match(result) && result.payload) {
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
