import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IArticleImageEntity } from "@/modules/articles/domain/entities/IArticleImageEntity";
import type { ArticleImageType } from "@/modules/articles/domain/enums/article-image-type.enum";
import { articlesSlice } from "@/modules/articles/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetUploadArticleImageAction = () =>
    articlesSlice.actions.clear({ context: ActionType.UploadArticleImage });

/**
 * Async thunk to upload an image for an article.
 *
 * @description
 * Dispatches `uploadArticleImageUseCase` with the article ID, file, and image type.
 * On success, stores the image metadata in `articles.uploadArticleImage.data`.
 * On failure, stores the backend `Failure` in `articles.uploadArticleImage.error`.
 */
export const uploadArticleImageAction = createAsyncThunk<
    IArticleImageEntity,
    { id: string; data: { file: File; imageType: ArticleImageType } },
    { rejectValue: Failure }
>(ActionType.UploadArticleImage, async (params, { rejectWithValue }) => {
    const result = await container.cradle.uploadArticleImageUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
