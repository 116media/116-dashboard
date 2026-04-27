import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ITagEntity } from "@/modules/lookup/domain/entities/ITagEntity";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

/**
 * Async thunk to fetch all tags.
 *
 * @description
 * Dispatches `getAllTagsUseCase` to retrieve the full list
 * of tags. On success, stores the result in
 * `lookup.getTags.data`.
 */
export const getTagsAction = createAsyncThunk<
    ITagEntity[],
    string | undefined,
    { rejectValue: Failure }
>(ActionType.GetTags, async (search, { rejectWithValue }) => {
    const result = await container.cradle.getAllTagsUseCase.execute(search);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
