import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IRevokeSessionResponse } from "@/platform/session/domain/entities/IRevokeSessionResponse";
import type { ISession } from "@/platform/session/domain/entities/ISession";
import { sessionSlice } from "@/platform/session/presentation/store";
import { ActionType } from "@/platform/session/presentation/store/constants";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator.ts";

export const resetGetSessionsAction = () =>
    sessionSlice.actions.clear({ context: ActionType.SessionGetSessions });

export const getSessionsAction = createAsyncThunk<ISession[], void, { rejectValue: Failure }>(
    ActionType.SessionGetSessions,
    async (_, { rejectWithValue }) => {
        const result = await container.cradle.getSessionsUseCase.execute();
        if (!result.ok) return rejectWithValue(result.error);
        return result.value;
    }
);

export const resetRevokeSessionAction = () =>
    sessionSlice.actions.clear({ context: ActionType.SessionRevokeSession });

export const revokeSessionAction = createAsyncThunk<
    IRevokeSessionResponse,
    string,
    { rejectValue: Failure }
>(ActionType.SessionRevokeSession, async (sessionId, { rejectWithValue }) => {
    const result = await container.cradle.revokeSessionUseCase.execute(sessionId);
    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
