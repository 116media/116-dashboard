import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IContentTypeEntity } from "@/modules/lookup/domain/entities/IContentTypeEntity";
import { lookupSlice } from "@/modules/lookup/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetCreateContentTypeAction = () =>
    lookupSlice.actions.clear({ context: ActionType.CreateContentType });

/**
 * Async thunk to create a new content type.
 *
 * @description
 * Sends the content type name to the backend via `createContentTypeUseCase`.
 * Returns 409 if the content type name already exists.
 */
export const createContentTypeAction = createAsyncThunk<
    IContentTypeEntity,
    { name: string },
    { rejectValue: Failure }
>(ActionType.CreateContentType, async (data, { rejectWithValue }) => {
    const result = await container.cradle.createContentTypeUseCase.execute(data);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
