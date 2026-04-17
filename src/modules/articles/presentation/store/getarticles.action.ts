import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IArticleSummaryEntity } from "@/modules/articles/domain/entities/IArticleSummaryEntity";
import type { Failure } from "@/shared/domain/failures/failure";
import type { IPaginatedResult } from "@/shared/domain/types/pagination";
import type { EnumContentStatus } from "@/shared/infrastructure/api/generated/116.api";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

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
        status?: EnumContentStatus;
        categoryId?: string;
        search?: string;
    },
    { rejectValue: Failure }
>(ActionType.GetArticles, async (params, { rejectWithValue }) => {
    const result = await container.cradle.getAllArticlesUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
