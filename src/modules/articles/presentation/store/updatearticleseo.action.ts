import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IArticleEntity } from "@/modules/articles/domain/entities/IArticleEntity";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

/**
 * Async thunk to update SEO metadata for an article.
 *
 * @description
 * Dispatches `updateArticleSeoUseCase` with the article ID and SEO fields.
 * On success, stores the updated article in `articles.updateArticleSeo.data`.
 * On failure, stores the backend `Failure` in `articles.updateArticleSeo.error`.
 */
export const updateArticleSeoAction = createAsyncThunk<
    IArticleEntity,
    { id: string; data: { metaTitle: string; metaDescription: string } },
    { rejectValue: Failure }
>(ActionType.UpdateArticleSeo, async (params, { rejectWithValue }) => {
    const result = await container.cradle.updateArticleSeoUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
