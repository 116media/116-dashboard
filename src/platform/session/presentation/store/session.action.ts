import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IRevokeSessionResponse } from "@/platform/session/domain/entities/IRevokeSessionResponse";
import type { ISession } from "@/platform/session/domain/entities/ISession";
import { sessionSlice } from "@/platform/session/presentation/store";
import { ActionType } from "@/platform/session/presentation/store/constants";
import type { IApiProblemDetails } from "@/shared/infrastructure/api/type";
import container from "@/shared/infrastructure/service.locator.ts";

export const resetGetSessionsAction = () =>
    sessionSlice.actions.clear({ context: ActionType.SessionGetSessions });

export const getSessionsAction = createAsyncThunk<
    ISession[],
    void,
    { rejectValue: IApiProblemDetails }
>(ActionType.SessionGetSessions, async (_, { rejectWithValue }) => {
    try {
        return await container.cradle.getSessionsUseCase.execute();
    } catch (error) {
        return rejectWithValue(error as IApiProblemDetails);
    }
});

export const resetRevokeSessionAction = () =>
    sessionSlice.actions.clear({ context: ActionType.SessionRevokeSession });

export const revokeSessionAction = createAsyncThunk<
    IRevokeSessionResponse,
    string,
    { rejectValue: IApiProblemDetails }
>(ActionType.SessionRevokeSession, async (sessionId, { rejectWithValue }) => {
    try {
        return await container.cradle.revokeSessionUseCase.execute(sessionId);
    } catch (error) {
        return rejectWithValue(error as IApiProblemDetails);
    }
});
