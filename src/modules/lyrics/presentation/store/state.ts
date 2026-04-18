import { createInitialState } from "@/shared/presentation/store/action.wrapper";
import type { ILyricsState } from "./type";

/**
 * Initial state for the lyrics Redux slice.
 *
 * @description
 * Defines initial state for all lyrics-related operations.
 * All operations use `createInitialState` because paginated
 * results are objects, not arrays.
 */
export const lyricsInitialState: ILyricsState = {
    getLyrics: createInitialState(),
    createLyrics: createInitialState(),
    updateLyrics: createInitialState(),
    updateLyricsSeo: createInitialState()
};
