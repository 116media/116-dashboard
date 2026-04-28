import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IContentTypeEntity } from "@/modules/lookup/domain/entities/IContentTypeEntity";
import { lookupSlice } from "@/modules/lookup/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetGetContentTypesAction = () =>
    lookupSlice.actions.clear({ context: ActionType.GetContentTypes });

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
