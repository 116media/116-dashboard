import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IArticleActionResponse } from "@/modules/articles/domain/entities/IArticleActionResponse";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

/**
 * Async thunk to reject an article with a reason.
 *
 * @description
 * Dispatches `rejectArticleUseCase` with the article ID and rejection reason.
 * On success, stores the result in `articles.rejectArticle.data`.
 * On failure, stores the backend `Failure` in `articles.rejectArticle.error`.
 */
export const rejectArticleAction = createAsyncThunk<
    IArticleActionResponse,
    { id: string; data: { rejectionReason: string } },
    { rejectValue: Failure }
>(ActionType.RejectArticle, async (params, { rejectWithValue }) => {
    const result = await container.cradle.rejectArticleUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
