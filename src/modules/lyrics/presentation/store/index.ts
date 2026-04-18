import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
    ActionWrapperFulfilled,
    ActionWrapperPending,
    ActionWrapperRejected,
    ActionWrapperReset,
    createInitialState
} from "@/shared/presentation/store/action.wrapper";
import { SliceName } from "./constants";
import { createLyricsAction } from "./createlyrics.action";
import { getLyricsAction } from "./getalllyrics.action";
import { lyricsInitialState } from "./state";
import type { LyricsStateKey } from "./type";
import { updateLyricsAction } from "./updatelyrics.action";
import { updateLyricsSeoAction } from "./updatelyricsseo.action";

/**
 * Redux slice for the lyrics module.
 *
 * @description
 * Manages state for 4 async operations using the shared
 * ActionWrapper* reducer helpers. Includes `clear` (single reset)
 * and `purge` (selective reset) reducers.
 */
export const lyricsSlice = createSlice({
    name: SliceName.Lyrics,
    initialState: lyricsInitialState,
    reducers: {
        clear: ActionWrapperReset,
        purge: (state, action: PayloadAction<LyricsStateKey[]>) => {
            for (const key of action.payload) {
                if (state[key]) {
                    (state as Record<string, unknown>)[key] = createInitialState();
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder
            // get lyrics
            .addCase(getLyricsAction.pending, ActionWrapperPending)
            .addCase(getLyricsAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getLyricsAction.rejected, ActionWrapperRejected)
            // create lyrics
            .addCase(createLyricsAction.pending, ActionWrapperPending)
            .addCase(createLyricsAction.fulfilled, ActionWrapperFulfilled)
            .addCase(createLyricsAction.rejected, ActionWrapperRejected)
            // update lyrics
            .addCase(updateLyricsAction.pending, ActionWrapperPending)
            .addCase(updateLyricsAction.fulfilled, ActionWrapperFulfilled)
            .addCase(updateLyricsAction.rejected, ActionWrapperRejected)
            // update lyrics seo
            .addCase(updateLyricsSeoAction.pending, ActionWrapperPending)
            .addCase(updateLyricsSeoAction.fulfilled, ActionWrapperFulfilled)
            .addCase(updateLyricsSeoAction.rejected, ActionWrapperRejected);
    }
});

export default lyricsSlice.reducer;
