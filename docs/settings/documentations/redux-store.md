# Settings — Redux Store Design

## Overview

The settings feature lives at `src/platform/settings/presentation/store/` and follows the same patterns as the `auth` slice. It uses the shared `ActionWrapper*` reducer helpers from `src/shared/presentation/store/action.wrapper.ts` for consistent async state handling.

Dependencies (repositories, use cases) are resolved via the Awilix container at `src/shared/infrastructure/service.locator.ts` — thunks call `container.cradle.*UseCase.execute(...)` rather than instantiating dependencies inline.

---

## State Shape

### `ISettingsState`

```ts
import type {
    IBasicInitialState,
    IBasicInitialStateList
} from "@/shared/presentation/store/action.wrapper";

import type { IUser } from "@/modules/auth/domain/entities/IUser";
import type { IChangePasswordResponse } from "@/platform/settings/domain/entities/IChangePasswordResponse";
import type { IRoleWithPermissions } from "@/platform/settings/domain/entities/IRoleWithPermissions";
import type { ISession } from "@/platform/session/domain/entities/ISession";
import type { IRevokeSessionResponse } from "@/platform/session/domain/entities/IRevokeSessionResponse";

type ISettingsState = {
    // Profile tab
    profile: IBasicInitialState<IUser>;
    updateAccount: IBasicInitialState<IUser>;
    updateAvatar: IBasicInitialState<IUser>;

    // Security tab
    changePassword: IBasicInitialState<IChangePasswordResponse>;
    roles: IBasicInitialState<IRoleWithPermissions[]>;
    sessions: IBasicInitialStateList<ISession>;
    revokeSession: IBasicInitialState<IRevokeSessionResponse>;

    // Account tab
    signOut: IBasicInitialState<IUnknownObject>;
    signOutAll: IBasicInitialState<IUnknownObject>;
};
```

`IBasicInitialState` stores `error: Failure | null` (not `IApiProblemDetails`). The `Failure` type is defined in `src/shared/domain/failures/failure.ts`.

### Initial State

```ts
export const settingsInitialState: ISettingsState = {
    profile: createInitialState<IUser>(),
    updateAccount: createInitialState<IUser>(),
    updateAvatar: createInitialState<IUser>(),
    changePassword: createInitialState<IChangePasswordResponse>(),
    roles: createInitialState<IRoleWithPermissions[]>(),
    sessions: createInitialStateList<ISession>(),
    revokeSession: createInitialState<IRevokeSessionResponse>(),
    signOut: createInitialState(),
    signOutAll: createInitialState()
};
```

---

## Slice Definition

```ts
// File: src/platform/settings/presentation/store/index.ts

export const settingsSlice = createSlice({
    name: SliceName.Settings,
    initialState: settingsInitialState,
    reducers: {
        clear: ActionWrapperReset,
        purge: (state, action: PayloadAction<SettingsStateKey[]>) => {
            action.payload.forEach((key) => {
                if (state[key]) {
                    state[key] = Array.isArray(state[key].data)
                        ? createInitialStateList()
                        : createInitialState();
                }
            });
        }
    },
    extraReducers: (builder) => {
        builder
            // getProfile
            .addCase(getProfileAction.pending, ActionWrapperPending)
            .addCase(getProfileAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getProfileAction.rejected, ActionWrapperRejected)
            // updateAccount
            .addCase(updateAccountAction.pending, ActionWrapperPending)
            .addCase(updateAccountAction.fulfilled, ActionWrapperFulfilled)
            .addCase(updateAccountAction.rejected, ActionWrapperRejected)
            // ... same pattern for every thunk
    }
});
```

---

## Action Constants

```ts
// File: src/platform/settings/presentation/store/constants.ts

export const ActionType = {
    SettingsGetProfile: "settings/profile",
    SettingsUpdateAccount: "settings/updateAccount",
    SettingsUpdateAvatar: "settings/updateAvatar",
    SettingsChangePassword: "settings/changePassword",
    SettingsGetRoles: "settings/roles",
    SettingsGetSessions: "settings/sessions",
    SettingsRevokeSession: "settings/revokeSession",
    SettingsSignOut: "settings/signOut",
    SettingsSignOutAll: "settings/signOutAll"
};

export const SliceName = {
    Settings: "settings"
};
```

---

## Async Thunks — Result Pattern

Every thunk follows the **Result pattern**: the use case returns `Promise<Result<T>>`, and the thunk unwraps it with `if (!result.ok) return rejectWithValue(result.error)`. No `try/catch` blocks.

Dependencies come from the Awilix container (`src/shared/infrastructure/service.locator.ts`).

### Profile Actions

```ts
// File: src/platform/settings/presentation/store/profile.action.ts

import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IUser } from "@/modules/auth/domain/entities/IUser";
import type { IUpdateAccountCredentials } from "@/platform/settings/presentation/model/IUpdateAccountCredentials";
import { ActionType } from "@/platform/settings/presentation/store/constants";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";

export const getProfileAction = createAsyncThunk<IUser, void, { rejectValue: Failure }>(
    ActionType.SettingsGetProfile,
    async (_, { rejectWithValue }) => {
        const result = await container.cradle.getProfileUseCase.execute();
        if (!result.ok) return rejectWithValue(result.error);
        return result.value;
    }
);

export const updateAccountAction = createAsyncThunk<
    IUser,
    IUpdateAccountCredentials,
    { rejectValue: Failure }
>(ActionType.SettingsUpdateAccount, async (credentials, { rejectWithValue }) => {
    const result = await container.cradle.updateAccountUseCase.execute(credentials);
    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});

export const updateAvatarAction = createAsyncThunk<IUser, File, { rejectValue: Failure }>(
    ActionType.SettingsUpdateAvatar,
    async (file, { rejectWithValue }) => {
        const result = await container.cradle.updateAvatarUseCase.execute(file);
        if (!result.ok) return rejectWithValue(result.error);
        return result.value;
    }
);
```

### Security Actions

Same shape — `changePasswordAction` returns `IChangePasswordResponse`, `getRolesAction` returns `IRoleWithPermissions[]`, `getSessionsAction` returns `ISession[]`, `revokeSessionAction` returns `IRevokeSessionResponse`.

### Account Actions

`signOutAction` and `signOutAllAction` take `void` and return the backend's response DTO.

---

## Root Reducer Integration

Add the settings reducer to the root reducer:

```ts
// File: src/shared/presentation/store/root.reducer.ts

import settingsReducer from "@/platform/settings/presentation/store";

const rootReducer = combineReducers({
    auth: authReducer,
    session: sessionReducer,
    settings: settingsReducer
});
```

### Redux Persist

The `settings` slice is **NOT** persisted — profile data should be fetched fresh on page load. Only the `auth` slice remains in the persist whitelist.

---

## Keeping the Current User in Sync

Profile reads flow through `session.currentUser` (not `auth.login.data.user`). Any operation that returns an updated `IUser` should dispatch `setCurrentUserAction` so the sidenav, dropdown menu, and other consumers stay current.

```ts
// src/platform/session/presentation/store/currentuser.action.ts
export const setCurrentUserAction =
    (payload: IUser) =>
    (dispatch: AppDispatch): unknown => {
        return dispatch(sessionSlice.actions.currentUser({ ...payload }));
    };
```

Usage inside hooks after a successful mutation:

```ts
// In useUpdateAccount — after updateAccountAction succeeds:
if (updateAccountAction.fulfilled.match(result)) {
    dispatch(setCurrentUserAction(result.payload));
}

// In useUpdateAvatar — after updateAvatarAction succeeds:
if (updateAvatarAction.fulfilled.match(result)) {
    dispatch(setCurrentUserAction(result.payload));
}
```
