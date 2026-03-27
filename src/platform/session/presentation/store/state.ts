import type { IRevokeSessionResponse } from "@/platform/session/domain/entities/IRevokeSessionResponse";
import type { ISession } from "@/platform/session/domain/entities/ISession";
import { createInitialState } from "@/shared/presentation/store/action.wrapper";
import type { ISessionState } from "./type";

export const sessionInitialState: ISessionState = {
    sessions: createInitialState<ISession[]>(),
    revokeSession: createInitialState<IRevokeSessionResponse>()
};
