import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IArticleEntity } from "@/modules/articles/domain/entities/IArticleEntity";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

/**
 * Async thunk to fetch a single article by ID.
 *
 * @description
 * Dispatches `getArticleByIdUseCase` with the article ID.
 * On success, stores the article detail in `articles.getArticleById.data`.
 * On failure, stores the backend `Failure` in `articles.getArticleById.error`.
 */
export const getArticleByIdAction = createAsyncThunk<
    IArticleEntity,
    string,
    { rejectValue: Failure }
>(ActionType.GetArticleById, async (id, { rejectWithValue }) => {
    const result = await container.cradle.getArticleByIdUseCase.execute(id);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
