# Settings — Redux Store Design

## Overview

The settings feature introduces a new `settings` Redux slice following the same patterns as the `auth` slice. It uses the existing `ActionWrapper` utilities for consistent async state handling.

---

## State Shape

### `ISettingsState`

```ts
import type { IBasicInitialState, IBasicInitialStateList } from "@/core/presentation/store/action.wrapper";

// Domain entity types (defined in settings module)
import type { IProfile } from "@/modules/settings/domain/entities/IProfile";
import type { IRoleWithPermissions } from "@/modules/settings/domain/entities/IRoleWithPermissions";
import type { ISession } from "@/modules/settings/domain/entities/ISession";

type ISettingsState = {
    // Profile tab
    profile: IBasicInitialState<IProfile>;
    updateAccount: IBasicInitialState<IProfile>;
    updateAvatar: IBasicInitialState<IProfile>;

    // Security tab
    changePassword: IBasicInitialState<IUnknownObject>;
    roles: IBasicInitialState<IRoleWithPermissions[]>;
    sessions: IBasicInitialStateList<ISession>;
    revokeSession: IBasicInitialState<IUnknownObject>;

    // Account tab
    signOut: IBasicInitialState<IUnknownObject>;
    signOutAll: IBasicInitialState<IUnknownObject>;
};
```

### Initial State

```ts
export const settingsInitialState: ISettingsState = {
    // Profile tab
    profile: createInitialState<IProfile>(),
    updateAccount: createInitialState<IProfile>(),
    updateAvatar: createInitialState<IProfile>(),

    // Security tab
    changePassword: createInitialState(),
    roles: createInitialState<IRoleWithPermissions[]>(),
    sessions: createInitialStateList<ISession>(),
    revokeSession: createInitialState(),

    // Account tab
    signOut: createInitialState(),
    signOutAll: createInitialState(),
};
```

---

## Slice Definition

```ts
// File: src/modules/settings/presentation/store/index.ts

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
            // updateAvatar
            .addCase(updateAvatarAction.pending, ActionWrapperPending)
            .addCase(updateAvatarAction.fulfilled, ActionWrapperFulfilled)
            .addCase(updateAvatarAction.rejected, ActionWrapperRejected)
            // changePassword
            .addCase(changePasswordAction.pending, ActionWrapperPending)
            .addCase(changePasswordAction.fulfilled, ActionWrapperFulfilled)
            .addCase(changePasswordAction.rejected, ActionWrapperRejected)
            // getRoles
            .addCase(getRolesAction.pending, ActionWrapperPending)
            .addCase(getRolesAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getRolesAction.rejected, ActionWrapperRejected)
            // getSessions
            .addCase(getSessionsAction.pending, ActionWrapperPending)
            .addCase(getSessionsAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getSessionsAction.rejected, ActionWrapperRejected)
            // revokeSession
            .addCase(revokeSessionAction.pending, ActionWrapperPending)
            .addCase(revokeSessionAction.fulfilled, ActionWrapperFulfilled)
            .addCase(revokeSessionAction.rejected, ActionWrapperRejected)
            // signOut
            .addCase(signOutAction.pending, ActionWrapperPending)
            .addCase(signOutAction.fulfilled, ActionWrapperFulfilled)
            .addCase(signOutAction.rejected, ActionWrapperRejected)
            // signOutAll
            .addCase(signOutAllAction.pending, ActionWrapperPending)
            .addCase(signOutAllAction.fulfilled, ActionWrapperFulfilled)
            .addCase(signOutAllAction.rejected, ActionWrapperRejected);
    }
});
```

---

## Action Constants

```ts
// File: src/modules/settings/presentation/store/constants.ts

export const ActionType = {
    SettingsGetProfile: "settings/profile",
    SettingsUpdateAccount: "settings/updateAccount",
    SettingsUpdateAvatar: "settings/updateAvatar",
    SettingsChangePassword: "settings/changePassword",
    SettingsGetRoles: "settings/roles",
    SettingsGetSessions: "settings/sessions",
    SettingsRevokeSession: "settings/revokeSession",
    SettingsSignOut: "settings/signOut",
    SettingsSignOutAll: "settings/signOutAll",
};

export const SliceName = {
    Settings: "settings",
};
```

---

## Async Thunks

Each action file follows the auth module pattern:

### Profile Actions

```ts
// File: src/modules/settings/presentation/store/profile.action.ts

const settingsRepository = new SettingsRepositoryImpl();
const getProfileUseCase = new GetProfileUseCase(settingsRepository);
const updateAccountUseCase = new UpdateAccountUseCase(settingsRepository);
const updateAvatarUseCase = new UpdateAvatarUseCase(settingsRepository);

export const getProfileAction = createAsyncThunk<
    IProfile,
    void,
    { rejectValue: IApiProblemDetails }
>(ActionType.SettingsGetProfile, async (_, { rejectWithValue }) => {
    try {
        return await getProfileUseCase.execute();
    } catch (error) {
        return rejectWithValue(error as IApiProblemDetails);
    }
});

export const updateAccountAction = createAsyncThunk<
    IProfile,
    IUpdateAccountCredentials,
    { rejectValue: IApiProblemDetails }
>(ActionType.SettingsUpdateAccount, async (credentials, { rejectWithValue }) => {
    try {
        return await updateAccountUseCase.execute(credentials);
    } catch (error) {
        return rejectWithValue(error as IApiProblemDetails);
    }
});

export const updateAvatarAction = createAsyncThunk<
    IProfile,
    File,
    { rejectValue: IApiProblemDetails }
>(ActionType.SettingsUpdateAvatar, async (avatarFile, { rejectWithValue }) => {
    try {
        return await updateAvatarUseCase.execute(avatarFile);
    } catch (error) {
        return rejectWithValue(error as IApiProblemDetails);
    }
});
```

### Security Actions

```ts
// File: src/modules/settings/presentation/store/security.action.ts

export const changePasswordAction = createAsyncThunk<...>(...)
export const getRolesAction = createAsyncThunk<...>(...)
export const getSessionsAction = createAsyncThunk<...>(...)
export const revokeSessionAction = createAsyncThunk<...>(...)
```

### Account Actions

```ts
// File: src/modules/settings/presentation/store/account.action.ts

export const signOutAction = createAsyncThunk<...>(...)
export const signOutAllAction = createAsyncThunk<...>(...)
```

---

## Root Reducer Integration

Add the settings reducer to the root reducer:

```ts
// File: src/core/presentation/store/root.reducer.ts

import settingsReducer from "@/modules/settings/presentation/store";

const rootReducer = combineReducers({
    auth: authReducer,
    settings: settingsReducer,
});
```

### Redux Persist

The `settings` slice does **NOT** need to be persisted — profile data should be fetched fresh on page load. Only the `auth` slice remains in the persist whitelist.

---

## Auth Slice Sync

The settings page reads from `settings.profile.data`, but `auth.login.data.user` must be kept in sync so the sidenav, dropdown menu, and other components always show current data.

After every successful profile operation (`getProfileAction`, `updateAccountAction`, `updateAvatarAction`), the hook dispatches `authSlice.actions.updateUser(updatedUser)` to sync `auth.login.data.user`.

Add an `updateUser` reducer to the auth slice:

```ts
// In auth slice:
reducers: {
    // ...existing reducers
    updateUser: (state, action: PayloadAction<IUser>) => {
        if (state.login.data) {
            state.login.data.user = action.payload;
        }
    }
}
```

Usage in hooks:

```ts
// In useProfile hook (after getProfileAction succeeds):
if (getProfileAction.fulfilled.match(result)) {
    dispatch(authSlice.actions.updateUser(result.payload));
}

// In useUpdateAccount hook (after updateAccountAction succeeds):
if (updateAccountAction.fulfilled.match(result)) {
    dispatch(authSlice.actions.updateUser(result.payload));
}

// In useUpdateAvatar hook (after updateAvatarAction succeeds):
if (updateAvatarAction.fulfilled.match(result)) {
    dispatch(authSlice.actions.updateUser(result.payload));
}
```

This ensures the sidenav, dropdown, and settings page always show the same user data.
