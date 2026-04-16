# Phase 5: Async Thunk Actions

Three action files grouping the thunks by feature area, plus wiring into the slice.

**Ref**: [redux-store.md](../../documentations/redux-store.md) (Async Thunks section)

**Pattern reference**: `src/modules/auth/presentation/store/login.action.ts`

---

## Result Pattern (replaces try/catch)

Every thunk unwraps a `Result<T>` from its use case. No `try/catch` blocks — if the use case returns `err(failure)`, the thunk rejects with that `Failure`.

```ts
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
```

Key points:

- `rejectValue: Failure` — no more `IApiProblemDetails`
- No `try/catch` — errors are already typed values returned from the use case
- Dependencies come from `container.cradle.*UseCase` (Awilix), not `new XxxUseCase()`

---

## `src/platform/settings/presentation/store/profile.action.ts`

- [ ] Create `getProfileAction`:
  - `createAsyncThunk<IUser, void, { rejectValue: Failure }>`
  - Resolves `container.cradle.getProfileUseCase.execute()`
- [ ] Create `updateAccountAction`:
  - `createAsyncThunk<IUser, IUpdateAccountCredentials, { rejectValue: Failure }>`
  - Resolves `container.cradle.updateAccountUseCase.execute(credentials)`
- [ ] Create `updateAvatarAction`:
  - `createAsyncThunk<IUser, File, { rejectValue: Failure }>`
  - Resolves `container.cradle.updateAvatarUseCase.execute(avatarFile)`
- [ ] Export `resetGetProfileAction`, `resetUpdateAccountAction`, `resetUpdateAvatarAction` helpers that dispatch `settingsSlice.actions.clear({ context: ActionType.XXX })`

---

## `src/platform/settings/presentation/store/security.action.ts`

- [ ] Create `changePasswordAction`:
  - `createAsyncThunk<IChangePasswordResponse, { oldPassword: string; newPassword: string }, { rejectValue: Failure }>`
  - Resolves `container.cradle.changePasswordUseCase.execute(credentials)`
- [ ] Create `getRolesAction`:
  - `createAsyncThunk<IRoleWithPermissions[], void, { rejectValue: Failure }>`
  - Resolves `container.cradle.getRolesUseCase.execute()`
- [ ] Reuse `getSessionsAction` and `revokeSessionAction` from `src/platform/session/presentation/store/session.action.ts` — they already exist and follow the same pattern

---

## `src/platform/settings/presentation/store/account.action.ts` (optional)

The sign-out actions live in the auth module (`src/modules/auth/presentation/store/signout.action.ts` and `signoutall.action.ts`). Import them directly from there — do not re-create them in the settings module.

---

## Update `src/platform/settings/presentation/store/index.ts`

- [ ] Import the new settings actions
- [ ] Add `extraReducers` cases for each (pending/fulfilled/rejected):

  ```text
  getProfileAction, updateAccountAction, updateAvatarAction,
  changePasswordAction, getRolesAction
  ```

- [ ] Each case uses `ActionWrapperPending`, `ActionWrapperFulfilled`, `ActionWrapperRejected` from `@/shared/presentation/store/action.wrapper`
- [ ] The `ActionWrapperRejected` handler stores the `Failure` payload under `state[key].error` — the error type is inferred from `IBasicInitialState.error: Failure | null`
