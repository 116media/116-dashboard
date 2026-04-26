import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IArticleActionResponse } from "@/modules/articles/domain/entities/IArticleActionResponse";
import { articlesSlice } from "@/modules/articles/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetPublishArticleAction = () =>
    articlesSlice.actions.clear({ context: ActionType.PublishArticle });

/**
 * Async thunk to publish an approved article.
 *
 * @description
 * Dispatches `publishArticleUseCase` with the article ID.
 * On success, stores the result in `articles.publishArticle.data`.
 * On failure, stores the backend `Failure` in `articles.publishArticle.error`.
 */
export const publishArticleAction = createAsyncThunk<
    IArticleActionResponse,
    string,
    { rejectValue: Failure }
>(ActionType.PublishArticle, async (id, { rejectWithValue }) => {
    const result = await container.cradle.publishArticleUseCase.execute(id);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
