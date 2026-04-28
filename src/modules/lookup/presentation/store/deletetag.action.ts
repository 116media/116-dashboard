import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ITagActionResponse } from "@/modules/lookup/domain/entities/ITagActionResponse";
import { lookupSlice } from "@/modules/lookup/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetDeleteTagAction = () =>
    lookupSlice.actions.clear({ context: ActionType.DeleteTag });

/**
 * Async thunk to permanently delete a tag.
 *
 * @description
 * Permanently removes the tag from the database via
 * `deleteTagUseCase`. This action is irreversible.
 */
export const deleteTagAction = createAsyncThunk<
    ITagActionResponse,
    string,
    { rejectValue: Failure }
>(ActionType.DeleteTag, async (id, { rejectWithValue }) => {
    const result = await container.cradle.deleteTagUseCase.execute(id);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
