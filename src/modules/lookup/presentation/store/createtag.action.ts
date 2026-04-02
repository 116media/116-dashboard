import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ITagEntity } from "@/modules/lookup/domain/entities/ITagEntity";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

/**
 * Async thunk to create a new tag.
 *
 * @description
 * Sends the tag name to the backend via `createTagUseCase`.
 * Returns 409 if the tag name already exists.
 */
export const createTagAction = createAsyncThunk<
    ITagEntity,
    { name: string; slug: string },
    { rejectValue: Failure }
>(ActionType.CreateTag, async (data, { rejectWithValue }) => {
    const result = await container.cradle.createTagUseCase.execute(data);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
