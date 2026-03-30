# Phase 5: Async Thunk Actions

Three action files grouping 9 async thunks by feature area, plus wiring into the slice.

**Ref**: [redux-store.md](../../documentations/redux-store.md) (Async Thunks section)

**Pattern reference**: `src/modules/auth/presentation/store/login.action.ts`

---

## `src/modules/settings/presentation/store/profile.action.ts`

- [ ] Instantiate `SettingsRepositoryImpl` and 3 use cases at module level
- [ ] Create `getProfileAction`:
  - `createAsyncThunk<IProfile, void, { rejectValue: IApiProblemDetails }>`
  - Calls `getProfileUseCase.execute()`
- [ ] Create `updateAccountAction`:
  - `createAsyncThunk<IProfile, IUpdateAccountCredentials, { rejectValue: IApiProblemDetails }>`
  - Calls `updateAccountUseCase.execute(credentials)`
- [ ] Create `updateAvatarAction`:
  - `createAsyncThunk<IProfile, File, { rejectValue: IApiProblemDetails }>`
  - Calls `updateAvatarUseCase.execute(avatarFile)`

---

## `src/modules/settings/presentation/store/security.action.ts`

- [ ] Instantiate `SettingsRepositoryImpl` and 4 use cases at module level
- [ ] Create `changePasswordAction`:
  - Input: `{ oldPassword: string; newPassword: string }`
  - Calls `changePasswordUseCase.execute(credentials)`
- [ ] Create `getRolesAction`:
  - Input: `void`
  - Returns `IRoleWithPermissions[]`
- [ ] Create `getSessionsAction`:
  - Input: `void`
  - Returns `ISession[]`
- [ ] Create `revokeSessionAction`:
  - Input: `string` (sessionId)
  - Returns `{ isSuccess: boolean }`

---

## `src/modules/settings/presentation/store/account.action.ts`

- [ ] Instantiate `SettingsRepositoryImpl` and 2 use cases at module level
- [ ] Create `signOutAction`:
  - Input: `string` (refreshToken)
  - Returns `{ isSuccess: boolean }`
- [ ] Create `signOutAllAction`:
  - Input: `void`
  - Returns `{ isSuccess: boolean }`

---

## Update `src/modules/settings/presentation/store/index.ts`

- [ ] Import all 9 actions from the 3 action files
- [ ] Add `extraReducers` cases for each action (pending/fulfilled/rejected):
  ```
  getProfileAction, updateAccountAction, updateAvatarAction,
  changePasswordAction, getRolesAction, getSessionsAction,
  revokeSessionAction, signOutAction, signOutAllAction
  ```
- [ ] Each case uses `ActionWrapperPending`, `ActionWrapperFulfilled`, `ActionWrapperRejected`
