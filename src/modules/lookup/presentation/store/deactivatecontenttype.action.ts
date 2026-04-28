import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IContentTypeEntity } from "@/modules/lookup/domain/entities/IContentTypeEntity";
import { lookupSlice } from "@/modules/lookup/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetDeactivateContentTypeAction = () =>
    lookupSlice.actions.clear({ context: ActionType.DeactivateContentType });

/**
 * Async thunk to deactivate an active content type.
 *
 * @description
 * Sets the content type's `isActive` flag to `false` via
 * `deactivateContentTypeUseCase`. Returns 409 if already inactive.
 */
export const deactivateContentTypeAction = createAsyncThunk<
    IContentTypeEntity,
    string,
    { rejectValue: Failure }
>(ActionType.DeactivateContentType, async (id, { rejectWithValue }) => {
    const result = await container.cradle.deactivateContentTypeUseCase.execute(id);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
