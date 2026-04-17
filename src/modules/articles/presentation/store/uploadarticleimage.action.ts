import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IArticleImageEntity } from "@/modules/articles/domain/entities/IArticleImageEntity";
import type { Failure } from "@/shared/domain/failures/failure";
import type { EnumArticleImageType } from "@/shared/infrastructure/api/generated/116.api";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

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
    { id: string; data: { file: File; imageType: EnumArticleImageType } },
    { rejectValue: Failure }
>(ActionType.UploadArticleImage, async (params, { rejectWithValue }) => {
    const result = await container.cradle.uploadArticleImageUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
