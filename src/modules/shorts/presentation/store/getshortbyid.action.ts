import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IShortVideoEntity } from "@/modules/shorts/domain/entities/IShortVideoEntity";
import { shortsSlice } from "@/modules/shorts/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetGetShortByIdAction = () =>
    shortsSlice.actions.clear({ context: ActionType.GetShortById });

/**
 * Async thunk to fetch a single short video by ID.
 *
 * @description
 * Dispatches `getShortByIdUseCase` with the short video ID.
 * On success, stores the short video detail in `shorts.getShortById.data`.
 * On failure, stores the backend `Failure` in `shorts.getShortById.error`.
 */
export const getShortByIdAction = createAsyncThunk<
    IShortVideoEntity,
    string,
    { rejectValue: Failure }
>(ActionType.GetShortById, async (id, { rejectWithValue }) => {
    const result = await container.cradle.getShortByIdUseCase.execute(id);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
