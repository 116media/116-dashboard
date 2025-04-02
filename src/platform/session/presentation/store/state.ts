import type { IUser } from "@/modules/auth/domain/entities/IUser";
import type { IRevokeSessionResponse } from "@/platform/session/domain/entities/IRevokeSessionResponse";
import type { ISession } from "@/platform/session/domain/entities/ISession";
import { createInitialState } from "@/shared/presentation/store/action.wrapper";
import type { ISessionState } from "./type";

/**
 * Initial state for the session Redux slice.
 *
 * @description
 * Defines initial state for the current user profile,
 * active sessions list, and session revocation.
 */
export const sessionInitialState: ISessionState = {
    currentUser: createInitialState<IUser>(),
    sessions: createInitialState<ISession[]>(),
    revokeSession: createInitialState<IRevokeSessionResponse>()
};
