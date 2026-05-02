import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IArticleSummaryEntity } from "@/modules/articles/domain/entities/IArticleSummaryEntity";
import { articlesSlice } from "@/modules/articles/presentation/store";
import type { ContentStatus } from "@/shared/domain/enums/content-status.enum";
import type { Failure } from "@/shared/domain/failures/failure";
import type { IPaginatedResult } from "@/shared/domain/types/pagination";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetGetArticlesAction = () =>
    articlesSlice.actions.clear({ context: ActionType.GetArticles });

/**
 * Async thunk to fetch a paginated list of articles.
 *
 * @description
 * Dispatches `getArticlesUseCase` with pagination, status, category, and search params.
 * On success, stores the paginated result in `articles.getArticles.data`.
 * On failure, stores the backend `Failure` in `articles.getArticles.error`.
 */
export const getArticlesAction = createAsyncThunk<
    IPaginatedResult<IArticleSummaryEntity>,
    {
        pageIndex: number;
        pageSize: number;
        status?: ContentStatus;
        categoryId?: string;
        search?: string;
    },
    { rejectValue: Failure }
>(ActionType.GetArticles, async (params, { rejectWithValue }) => {
    const result = await container.cradle.getAllArticlesUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
