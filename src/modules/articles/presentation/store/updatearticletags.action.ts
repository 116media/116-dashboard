import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IArticleActionResponse } from "@/modules/articles/domain/entities/IArticleActionResponse";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

/**
 * Async thunk to update tags for an article.
 *
 * @description
 * Dispatches `updateArticleTagsUseCase` with the article ID and tag IDs.
 * On success, stores the result in `articles.updateArticleTags.data`.
 * On failure, stores the backend `Failure` in `articles.updateArticleTags.error`.
 */
export const updateArticleTagsAction = createAsyncThunk<
    IArticleActionResponse,
    { id: string; data: { tagIds: string[] } },
    { rejectValue: Failure }
>(ActionType.UpdateArticleTags, async (params, { rejectWithValue }) => {
    const result = await container.cradle.updateArticleTagsUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
