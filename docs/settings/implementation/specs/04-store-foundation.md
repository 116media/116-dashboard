# Phase 4: Redux Store Foundation

Redux slice scaffolding: constants, state type, initial state, and slice definition.

**Ref**: [redux-store.md](../../documentations/redux-store.md)

**Pattern reference**: `src/modules/auth/presentation/store/` (constants.ts, type.ts, state.ts, index.ts)

---

## `src/platform/settings/presentation/store/constants.ts`

- [ ] Define `ActionType` object:
  ```ts
  SettingsGetProfile: "settings/profile"
  SettingsUpdateAccount: "settings/updateAccount"
  SettingsUpdateAvatar: "settings/updateAvatar"
  SettingsChangePassword: "settings/changePassword"
  SettingsGetRoles: "settings/roles"
  SettingsGetSessions: "settings/sessions"
  SettingsRevokeSession: "settings/revokeSession"
  SettingsSignOut: "settings/signOut"
  SettingsSignOutAll: "settings/signOutAll"
  ```
- [ ] Define `SliceName` object: `Settings: "settings"`

---

## `src/platform/settings/presentation/store/type.ts`

- [ ] Define `ISettingsState` type with 9 keys using domain entities:
  ```ts
  profile: IBasicInitialState<IUser>
  updateAccount: IBasicInitialState<IUser>
  updateAvatar: IBasicInitialState<IUser>
  changePassword: IBasicInitialState<IChangePasswordResponse>
  roles: IBasicInitialState<IRoleWithPermissions[]>
  sessions: IBasicInitialStateList<ISession>
  revokeSession: IBasicInitialState<IRevokeSessionResponse>
  signOut: IBasicInitialState<IUnknownObject>
  signOutAll: IBasicInitialState<IUnknownObject>
  ```
- [ ] Import `IBasicInitialState`, `IBasicInitialStateList` from `@/shared/presentation/store/action.wrapper`
- [ ] The `error` field on `IBasicInitialState` is typed as `Failure | null` (from `@/shared/domain/failures/failure`) — already configured in the shared type
- [ ] Import `IUser` from `@/modules/auth/domain/entities/IUser`
- [ ] Import `IChangePasswordResponse`, `IRoleWithPermissions` from `@/platform/settings/domain/entities/`
- [ ] Import `ISession`, `IRevokeSessionResponse` from `@/platform/session/domain/entities/`
- [ ] Export `SettingsStateKey` type for the purge reducer

---

## `src/platform/settings/presentation/store/state.ts`

- [ ] Export `settingsInitialState: ISettingsState`
- [ ] Use `createInitialState<T>()` for object states
- [ ] Use `createInitialStateList<T>()` for `sessions`
- [ ] Import helpers from `@/shared/presentation/store/action.wrapper`

---

## `src/platform/settings/presentation/store/index.ts`

- [ ] Create `settingsSlice` using `createSlice`
- [ ] `name`: `SliceName.Settings`
- [ ] `initialState`: `settingsInitialState`
- [ ] Reducers:
  - `clear`: `ActionWrapperReset`
  - `purge`: selective reset accepting `SettingsStateKey[]` payload
- [ ] `extraReducers`: empty builder (cases added in Phase 5)
- [ ] Export `settingsSlice.actions` (clear, purge)
- [ ] Default export `settingsSlice.reducer`
