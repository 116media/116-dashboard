import type { IRevokeSessionResponse } from "@/platform/session/domain/entities/IRevokeSessionResponse";
import type { ISession } from "@/platform/session/domain/entities/ISession";
import type { IBasicInitialState } from "@/shared/presentation/store/action.wrapper";

export type ISessionState = {
    sessions: IBasicInitialState<ISession[]>;
    revokeSession: IBasicInitialState<IRevokeSessionResponse>;
};

export type SessionStateKey = keyof ISessionState;
