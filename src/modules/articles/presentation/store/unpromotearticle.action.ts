import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IArticleActionResponse } from "@/modules/articles/domain/entities/IArticleActionResponse";
import type { IUnpromoteArticleCredentials } from "@/modules/articles/presentation/model/IUnpromoteArticleCredentials";
import { articlesSlice } from "@/modules/articles/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetUnpromoteArticleAction = () =>
    articlesSlice.actions.clear({ context: ActionType.UnpromoteArticle });

/**
 * Async thunk to force-unpromote a promoted article.
 *
 * @description
 * Dispatches `unpromoteArticleUseCase` with the article slug and reason.
 * On success, stores the result in `articles.unpromoteArticle.data`.
 * On failure, stores the backend `Failure` in `articles.unpromoteArticle.error`.
 */
export const unpromoteArticleAction = createAsyncThunk<
    IArticleActionResponse,
    { slug: string; data: IUnpromoteArticleCredentials },
    { rejectValue: Failure }
>(ActionType.UnpromoteArticle, async (params, { rejectWithValue }) => {
    const result = await container.cradle.unpromoteArticleUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
