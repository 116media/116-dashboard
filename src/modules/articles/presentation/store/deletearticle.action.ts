import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IArticleActionResponse } from "@/modules/articles/domain/entities/IArticleActionResponse";
import { articlesSlice } from "@/modules/articles/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetDeleteArticleAction = () =>
    articlesSlice.actions.clear({ context: ActionType.DeleteArticle });

/**
 * Async thunk to delete an article.
 *
 * @description
 * Dispatches `deleteArticleUseCase` with the article ID.
 * On success, stores the result in `articles.deleteArticle.data`.
 * On failure, stores the backend `Failure` in `articles.deleteArticle.error`.
 */
export const deleteArticleAction = createAsyncThunk<
    IArticleActionResponse,
    string,
    { rejectValue: Failure }
>(ActionType.DeleteArticle, async (id, { rejectWithValue }) => {
    const result = await container.cradle.deleteArticleUseCase.execute(id);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
