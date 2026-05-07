import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IArticleEntity } from "@/modules/articles/domain/entities/IArticleEntity";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

/**
 * Async thunk to create a new article.
 *
 * @description
 * Dispatches `createArticleUseCase` with category, title, slug, and optional customer data.
 * On success, stores the created article in `articles.createArticle.data`.
 * On failure, stores the backend `Failure` in `articles.createArticle.error`.
 */
export const createArticleAction = createAsyncThunk<
    IArticleEntity,
    {
        categoryId: string;
        title: string;
        slug: string;
        customerId?: string;
        orderItemId?: string;
    },
    { rejectValue: Failure }
>(ActionType.CreateArticle, async (params, { rejectWithValue }) => {
    const result = await container.cradle.createArticleUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
