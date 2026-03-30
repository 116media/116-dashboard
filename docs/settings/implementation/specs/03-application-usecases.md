# Phase 3: Application Use Cases

9 use case classes, one per API operation. Each follows the same pattern.

**Ref**: [api-endpoints.md](../../documentations/api-endpoints.md), [redux-store.md](../../documentations/redux-store.md)

**Pattern reference**: `src/modules/auth/application/usecases/login.usecase.ts`

---

## Common Pattern

Each use case:

1. Defines a local interface extending `IUseCase<TRequest, TResponse>` from `@/core/application/IUseCase`
2. Constructor accepts `ISettingsRepositoryPort` via dependency injection
3. `execute()` method delegates to repository
4. Exports the class as default

---

## `src/modules/settings/application/usecases/getprofile.usecase.ts`

- [ ] Create `GetProfileUseCase` implementing `IUseCase<void, IProfile>`
- [ ] `execute()` → `this.repository.getProfile()`

## `src/modules/settings/application/usecases/updateaccount.usecase.ts`

- [ ] Create `UpdateAccountUseCase` implementing `IUseCase<IUpdateAccountCredentials, IProfile>`
- [ ] `execute(data)` → `this.repository.updateAccount(data)`

## `src/modules/settings/application/usecases/updateavatar.usecase.ts`

- [ ] Create `UpdateAvatarUseCase` implementing `IUseCase<File, IProfile>`
- [ ] `execute(file)` → `this.repository.updateAvatar(file)`

## `src/modules/settings/application/usecases/changepassword.usecase.ts`

- [ ] Create `ChangePasswordUseCase` implementing `IUseCase<{ oldPassword: string; newPassword: string }, { isSuccess: boolean }>`
- [ ] `execute(data)` → `this.repository.changePassword(data)`

## `src/modules/settings/application/usecases/getroles.usecase.ts`

- [ ] Create `GetRolesUseCase` implementing `IUseCase<void, IRoleWithPermissions[]>`
- [ ] `execute()` → `this.repository.getRoles()`

## `src/modules/settings/application/usecases/getsessions.usecase.ts`

- [ ] Create `GetSessionsUseCase` implementing `IUseCase<void, ISession[]>`
- [ ] `execute()` → `this.repository.getSessions()`

## `src/modules/settings/application/usecases/revokesession.usecase.ts`

- [ ] Create `RevokeSessionUseCase` implementing `IUseCase<string, { isSuccess: boolean }>`
- [ ] `execute(sessionId)` → `this.repository.revokeSession(sessionId)`

## `src/modules/settings/application/usecases/signout.usecase.ts`

- [ ] Create `SignOutUseCase` implementing `IUseCase<string, { isSuccess: boolean }>`
- [ ] `execute(refreshToken)` → `this.repository.signOut(refreshToken)`

## `src/modules/settings/application/usecases/signoutall.usecase.ts`

- [ ] Create `SignOutAllUseCase` implementing `IUseCase<void, { isSuccess: boolean }>`
- [ ] `execute()` → `this.repository.signOutAll()`
