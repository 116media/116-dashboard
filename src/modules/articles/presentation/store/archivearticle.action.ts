import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IArticleActionResponse } from "@/modules/articles/domain/entities/IArticleActionResponse";
import { articlesSlice } from "@/modules/articles/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetArchiveArticleAction = () =>
    articlesSlice.actions.clear({ context: ActionType.ArchiveArticle });

/**
 * Async thunk to archive an article.
 *
 * @description
 * Dispatches `archiveArticleUseCase` with the article ID.
 * On success, stores the result in `articles.archiveArticle.data`.
 * On failure, stores the backend `Failure` in `articles.archiveArticle.error`.
 */
export const archiveArticleAction = createAsyncThunk<
    IArticleActionResponse,
    string,
    { rejectValue: Failure }
>(ActionType.ArchiveArticle, async (id, { rejectWithValue }) => {
    const result = await container.cradle.archiveArticleUseCase.execute(id);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
