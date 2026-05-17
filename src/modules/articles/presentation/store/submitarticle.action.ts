import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IArticleActionResponse } from "@/modules/articles/domain/entities/IArticleActionResponse";
import { articlesSlice } from "@/modules/articles/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetSubmitArticleAction = () =>
    articlesSlice.actions.clear({ context: ActionType.SubmitArticle });

/**
 * Async thunk to submit an article for review.
 *
 * @description
 * Dispatches `submitArticleUseCase` with the article ID.
 * On success, stores the result in `articles.submitArticle.data`.
 * On failure, stores the backend `Failure` in `articles.submitArticle.error`.
 */
export const submitArticleAction = createAsyncThunk<
    IArticleActionResponse,
    string,
    { rejectValue: Failure }
>(ActionType.SubmitArticle, async (id, { rejectWithValue }) => {
    const result = await container.cradle.submitArticleUseCase.execute(id);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
