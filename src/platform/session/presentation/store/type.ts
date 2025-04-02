import type { IUser } from "@/modules/auth/domain/entities/IUser";
import type { IRevokeSessionResponse } from "@/platform/session/domain/entities/IRevokeSessionResponse";
import type { ISession } from "@/platform/session/domain/entities/ISession";
import type { IBasicInitialState } from "@/shared/presentation/store/action.wrapper";

/**
 * Redux state shape for the session module.
 *
 * @description
 * Each key represents one async operation with its own
 * `loading`, `fetched`, `data`, and `error` state.
 */
export type ISessionState = {
    currentUser: IBasicInitialState<IUser>;
    sessions: IBasicInitialState<ISession[]>;
    revokeSession: IBasicInitialState<IRevokeSessionResponse>;
};

export type SessionStateKey = keyof ISessionState;
