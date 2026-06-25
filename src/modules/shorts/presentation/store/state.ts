import { createInitialState } from "@/shared/presentation/store/action.wrapper";
import type { IShortsState } from "./type";

/**
 * Initial state for the shorts Redux slice.
 *
 * @description
 * Defines initial state for all shorts-related operations.
 * All operations use `createInitialState` because paginated
 * results are objects, not arrays.
 */
export const shortsInitialState: IShortsState = {
    getShorts: createInitialState(),
    getShortById: createInitialState(),
    createShort: createInitialState(),
    updateShort: createInitialState(),
    activateShort: createInitialState(),
    deactivateShort: createInitialState(),
    deleteShort: createInitialState(),
    uploadShortThumbnail: createInitialState(),
    uploadShortVideo: createInitialState()
};
