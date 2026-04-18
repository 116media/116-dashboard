import type { IShortActionResponse } from "@/modules/shorts/domain/entities/IShortActionResponse";
import type { IShortVideoEntity } from "@/modules/shorts/domain/entities/IShortVideoEntity";
import type { IPaginatedResult } from "@/shared/domain/types/pagination";
import type { IBasicInitialState } from "@/shared/presentation/store/action.wrapper";

/**
 * Redux state shape for the shorts module.
 *
 * @description
 * Each key represents one async operation with its own
 * `loading`, `fetched`, `data`, and `error` state.
 */
export type IShortsState = {
    getShorts: IBasicInitialState<IPaginatedResult<IShortVideoEntity>>;
    getShortById: IBasicInitialState<IShortVideoEntity>;
    createShort: IBasicInitialState<IShortVideoEntity>;
    activateShort: IBasicInitialState<IShortActionResponse>;
    deactivateShort: IBasicInitialState<IShortActionResponse>;
    deleteShort: IBasicInitialState<IShortActionResponse>;
    uploadShortThumbnail: IBasicInitialState<IShortActionResponse>;
};

export type ShortsStateKey = keyof IShortsState;
