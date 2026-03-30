# Phase 4: Redux Store Foundation

Redux slice scaffolding: constants, state type, initial state, and slice definition.

**Ref**: [redux-store.md](../../documentations/redux-store.md)

**Pattern reference**: `src/modules/auth/presentation/store/` (constants.ts, type.ts, state.ts, index.ts)

---

## `src/modules/settings/presentation/store/constants.ts`

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

## `src/modules/settings/presentation/store/type.ts`

- [ ] Define `ISettingsState` type with 9 keys:
  ```ts
  profile: IBasicInitialState<IProfile>
  updateAccount: IBasicInitialState<IProfile>
  updateAvatar: IBasicInitialState<IProfile>
  changePassword: IBasicInitialState<IUnknownObject>
  roles: IBasicInitialState<IRoleWithPermissions[]>
  sessions: IBasicInitialStateList<ISession>
  revokeSession: IBasicInitialState<IUnknownObject>
  signOut: IBasicInitialState<IUnknownObject>
  signOutAll: IBasicInitialState<IUnknownObject>
  ```
- [ ] Import `IBasicInitialState`, `IBasicInitialStateList` from `@/core/presentation/store/action.wrapper`
- [ ] Import domain entities from Phase 1
- [ ] Export `SettingsStateKey` type for the purge reducer

---

## `src/modules/settings/presentation/store/state.ts`

- [ ] Export `settingsInitialState: ISettingsState`
- [ ] Use `createInitialState<T>()` for object states
- [ ] Use `createInitialStateList<T>()` for `sessions`
- [ ] Import helpers from `@/core/presentation/store/action.wrapper`

---

## `src/modules/settings/presentation/store/index.ts`

- [ ] Create `settingsSlice` using `createSlice`
- [ ] `name`: `SliceName.Settings`
- [ ] `initialState`: `settingsInitialState`
- [ ] Reducers:
  - `clear`: `ActionWrapperReset`
  - `purge`: selective reset accepting `SettingsStateKey[]` payload
- [ ] `extraReducers`: empty builder (cases added in Phase 5)
- [ ] Export `settingsSlice.actions` (clear, purge)
- [ ] Default export `settingsSlice.reducer`
