import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IArticleEntity } from "@/modules/articles/domain/entities/IArticleEntity";
import { articlesSlice } from "@/modules/articles/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetUpdateArticleAction = () =>
    articlesSlice.actions.clear({ context: ActionType.UpdateArticle });

/**
 * Async thunk to update an existing article.
 *
 * @description
 * Dispatches `updateArticleUseCase` with the article ID and updated fields.
 * On success, stores the updated article in `articles.updateArticle.data`.
 * On failure, stores the backend `Failure` in `articles.updateArticle.error`.
 */
export const updateArticleAction = createAsyncThunk<
    IArticleEntity,
    {
        id: string;
        data: {
            categoryId: string;
            title: string;
            slug: string;
            headline: string;
            body: string;
            coverImageUrl?: string | null;
            customerId?: string | null;
            orderItemId?: string | null;
            socialBoost: boolean;
            metaTitle?: string | null;
            metaDescription?: string | null;
        };
    },
    { rejectValue: Failure }
>(ActionType.UpdateArticle, async (params, { rejectWithValue }) => {
    const result = await container.cradle.updateArticleUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
