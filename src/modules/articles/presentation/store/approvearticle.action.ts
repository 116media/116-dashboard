import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IArticleActionResponse } from "@/modules/articles/domain/entities/IArticleActionResponse";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

/**
 * Async thunk to approve an article.
 *
 * @description
 * Dispatches `approveArticleUseCase` with the article ID.
 * On success, stores the result in `articles.approveArticle.data`.
 * On failure, stores the backend `Failure` in `articles.approveArticle.error`.
 */
export const approveArticleAction = createAsyncThunk<
    IArticleActionResponse,
    string,
    { rejectValue: Failure }
>(ActionType.ApproveArticle, async (id, { rejectWithValue }) => {
    const result = await container.cradle.approveArticleUseCase.execute(id);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
