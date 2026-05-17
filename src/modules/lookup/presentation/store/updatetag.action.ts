import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ITagEntity } from "@/modules/lookup/domain/entities/ITagEntity";
import { lookupSlice } from "@/modules/lookup/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetUpdateTagAction = () =>
    lookupSlice.actions.clear({ context: ActionType.UpdateTag });

/**
 * Async thunk to update an existing tag.
 *
 * @description
 * Sends the tag ID, updated name, and auto-generated slug to the
 * backend via `updateTagUseCase`. Returns 409 if the new name
 * conflicts with an existing tag.
 */
export const updateTagAction = createAsyncThunk<
    ITagEntity,
    { id: string; data: { name: string; slug: string } },
    { rejectValue: Failure }
>(ActionType.UpdateTag, async (params, { rejectWithValue }) => {
    const result = await container.cradle.updateTagUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
