import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IContentTypeEntity } from "@/modules/lookup/domain/entities/IContentTypeEntity";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

/**
 * Async thunk to activate an inactive content type.
 *
 * @description
 * Sets the content type's `isActive` flag to `true` via
 * `activateContentTypeUseCase`. Returns 409 if already active.
 */
export const activateContentTypeAction = createAsyncThunk<
    IContentTypeEntity,
    string,
    { rejectValue: Failure }
>(ActionType.ActivateContentType, async (id, { rejectWithValue }) => {
    const result = await container.cradle.activateContentTypeUseCase.execute(id);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
