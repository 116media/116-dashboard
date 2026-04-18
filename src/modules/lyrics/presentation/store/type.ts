import type { ILyricsEntity } from "@/modules/lyrics/domain/entities/ILyricsEntity";
import type { IPaginatedResult } from "@/shared/domain/types/pagination";
import type { IBasicInitialState } from "@/shared/presentation/store/action.wrapper";

/**
 * Redux state shape for the lyrics module.
 *
 * @description
 * Each key represents one async operation with its own
 * `loading`, `fetched`, `data`, and `error` state.
 */
export type ILyricsState = {
    getLyrics: IBasicInitialState<IPaginatedResult<ILyricsEntity>>;
    createLyrics: IBasicInitialState<ILyricsEntity>;
    updateLyrics: IBasicInitialState<ILyricsEntity>;
    updateLyricsSeo: IBasicInitialState<ILyricsEntity>;
};

export type LyricsStateKey = keyof ILyricsState;
