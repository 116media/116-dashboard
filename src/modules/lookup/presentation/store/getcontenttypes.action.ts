import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IContentTypeEntity } from "@/modules/lookup/domain/entities/IContentTypeEntity";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

/**
 * Async thunk to fetch all content types.
 *
 * @description
 * Dispatches `getAllContentTypesUseCase` to retrieve the full list
 * of content types. On success, stores the result in
 * `lookup.getContentTypes.data`.
 */
export const getContentTypesAction = createAsyncThunk<
    IContentTypeEntity[],
    string | undefined,
    { rejectValue: Failure }
>(ActionType.GetContentTypes, async (search, { rejectWithValue }) => {
    const result = await container.cradle.getAllContentTypesUseCase.execute(search);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
