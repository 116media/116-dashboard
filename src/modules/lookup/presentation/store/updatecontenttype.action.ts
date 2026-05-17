import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IContentTypeEntity } from "@/modules/lookup/domain/entities/IContentTypeEntity";
import { lookupSlice } from "@/modules/lookup/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetUpdateContentTypeAction = () =>
    lookupSlice.actions.clear({ context: ActionType.UpdateContentType });

/**
 * Async thunk to update an existing content type.
 *
 * @description
 * Sends the content type ID and updated name to the backend
 * via `updateContentTypeUseCase`. Returns 409 if the new name
 * conflicts with an existing content type.
 */
export const updateContentTypeAction = createAsyncThunk<
    IContentTypeEntity,
    { id: string; data: { name: string } },
    { rejectValue: Failure }
>(ActionType.UpdateContentType, async (params, { rejectWithValue }) => {
    const result = await container.cradle.updateContentTypeUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
