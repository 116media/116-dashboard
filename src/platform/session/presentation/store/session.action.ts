import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetSessionsUseCase } from "@/platform/session/application/usecases/getsessions.usecase";
import { RevokeSessionUseCase } from "@/platform/session/application/usecases/revokesession.usecase";
import type { IRevokeSessionResponse } from "@/platform/session/domain/entities/IRevokeSessionResponse";
import type { ISession } from "@/platform/session/domain/entities/ISession";
import { SessionRepositoryImpl } from "@/platform/session/infrastructure/repositories/session.repository.impl";
import { sessionSlice } from "@/platform/session/presentation/store";
import { ActionType } from "@/platform/session/presentation/store/constants";
import type { IApiProblemDetails } from "@/shared/infrastructure/api/type";

const sessionRepository = new SessionRepositoryImpl();
const getSessionsUseCase = new GetSessionsUseCase(sessionRepository);
const revokeSessionUseCase = new RevokeSessionUseCase(sessionRepository);

export const resetGetSessionsAction = () =>
    sessionSlice.actions.clear({ context: ActionType.SessionGetSessions });

export const getSessionsAction = createAsyncThunk<
    ISession[],
    void,
    { rejectValue: IApiProblemDetails }
>(ActionType.SessionGetSessions, async (_, { rejectWithValue }) => {
    try {
        return await getSessionsUseCase.execute();
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
        return await revokeSessionUseCase.execute(sessionId);
    } catch (error) {
        return rejectWithValue(error as IApiProblemDetails);
    }
});
