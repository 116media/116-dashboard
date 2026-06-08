import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
    ActionWrapperFulfilled,
    ActionWrapperPending,
    ActionWrapperRejected,
    ActionWrapperReset,
    createInitialState
} from "@/shared/presentation/store/action.wrapper";
import { activateShortAction } from "./activateshort.action";
import { SliceName } from "./constants";
import { createShortAction } from "./createshort.action";
import { deactivateShortAction } from "./deactivateshort.action";
import { deleteShortAction } from "./deleteshort.action";
import { getShortsAction } from "./getallshorts.action";
import { getShortByIdAction } from "./getshortbyid.action";
import { shortsInitialState } from "./state";
import type { ShortsStateKey } from "./type";
import { updateShortAction } from "./updateshort.action";
import { uploadShortThumbnailAction } from "./uploadshortthumbnail.action";
import { uploadShortVideoAction } from "./uploadshortvideo.action";

/**
 * Redux slice for the shorts module.
 *
 * @description
 * Manages state for 9 async operations using the shared
 * ActionWrapper* reducer helpers. Includes `clear` (single reset)
 * and `purge` (selective reset) reducers.
 */
export const shortsSlice = createSlice({
    name: SliceName.Shorts,
    initialState: shortsInitialState,
    reducers: {
        clear: ActionWrapperReset,
        purge: (state, action: PayloadAction<ShortsStateKey[]>) => {
            for (const key of action.payload) {
                if (state[key]) {
                    (state as Record<string, unknown>)[key] = createInitialState();
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder
            // get shorts
            .addCase(getShortsAction.pending, ActionWrapperPending)
            .addCase(getShortsAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getShortsAction.rejected, ActionWrapperRejected)
            // get short by id
            .addCase(getShortByIdAction.pending, ActionWrapperPending)
            .addCase(getShortByIdAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getShortByIdAction.rejected, ActionWrapperRejected)
            // create short
            .addCase(createShortAction.pending, ActionWrapperPending)
            .addCase(createShortAction.fulfilled, ActionWrapperFulfilled)
            .addCase(createShortAction.rejected, ActionWrapperRejected)
            // update short
            .addCase(updateShortAction.pending, ActionWrapperPending)
            .addCase(updateShortAction.fulfilled, ActionWrapperFulfilled)
            .addCase(updateShortAction.rejected, ActionWrapperRejected)
            // activate short
            .addCase(activateShortAction.pending, ActionWrapperPending)
            .addCase(activateShortAction.fulfilled, ActionWrapperFulfilled)
            .addCase(activateShortAction.rejected, ActionWrapperRejected)
            // deactivate short
            .addCase(deactivateShortAction.pending, ActionWrapperPending)
            .addCase(deactivateShortAction.fulfilled, ActionWrapperFulfilled)
            .addCase(deactivateShortAction.rejected, ActionWrapperRejected)
            // delete short
            .addCase(deleteShortAction.pending, ActionWrapperPending)
            .addCase(deleteShortAction.fulfilled, ActionWrapperFulfilled)
            .addCase(deleteShortAction.rejected, ActionWrapperRejected)
            // upload short thumbnail
            .addCase(uploadShortThumbnailAction.pending, ActionWrapperPending)
            .addCase(uploadShortThumbnailAction.fulfilled, ActionWrapperFulfilled)
            .addCase(uploadShortThumbnailAction.rejected, ActionWrapperRejected)
            // upload short video file
            .addCase(uploadShortVideoAction.pending, ActionWrapperPending)
            .addCase(uploadShortVideoAction.fulfilled, ActionWrapperFulfilled)
            .addCase(uploadShortVideoAction.rejected, ActionWrapperRejected);
    }
});

export default shortsSlice.reducer;
