# DI Migration Progress

Tracking the full migration from manual wiring to Awilix.

---

## Phase 0 — Setup

- [ ] Install `awilix`
  ```bash
  cd apps/dashboard && npm install awilix
  ```

---

## Phase 1 — Composition Root

- [ ] Create `src/shared/infrastructure/container.ts`
  - Register all repositories as singletons
  - Register all use cases as transients
  - Register `DeviceStorageDataSource` as singleton
  - Export the container as default

---

## Phase 2 — Update Repository Constructors

Some repository implementations currently reach out and grab `apiClient` via direct
import. For Awilix PROXY mode to inject dependencies, the constructor must accept them.

- [ ] Check if `AuthRepositoryImpl` constructor needs to accept `apiClient`
- [ ] Check if `SessionRepositoryImpl` constructor needs to accept `apiClient`
- [ ] Check if `SettingsRepositoryImpl` constructor needs to accept `apiClient`
- [ ] Check if `DeviceRepositoryImpl` constructor already uses destructuring (it likely does)

> **Note:** If repositories import `apiClient` directly and we don't want to change
> that, they can stay as-is — Awilix will just call `new AuthRepositoryImpl()` with
> no args and the class grabs `apiClient` itself. The circular dep is still broken
> because instantiation is deferred. This is acceptable as a first step.

---

## Phase 3 — Update Auth Action Files (7 files)

Remove module-level `new AuthRepositoryImpl()` and `new XxxUseCase(repo)`.
Resolve use case from container inside the thunk body.

- [ ] `modules/auth/presentation/store/login.action.ts`
- [ ] `modules/auth/presentation/store/forgotpassword.action.ts`
- [ ] `modules/auth/presentation/store/verifyotp.action.ts`
- [ ] `modules/auth/presentation/store/resendotp.action.ts`
- [ ] `modules/auth/presentation/store/resetpassword.action.ts`
- [ ] `modules/auth/presentation/store/signout.action.ts`
- [ ] `modules/auth/presentation/store/signoutall.action.ts`

---

## Phase 4 — Update Session Action File (1 file)

- [ ] `platform/session/presentation/store/session.action.ts`
  - Remove `new SessionRepositoryImpl()`, `new GetSessionsUseCase(...)`, `new RevokeSessionUseCase(...)`
  - Resolve `getSessionsUseCase` and `revokeSessionUseCase` from container

---

## Phase 5 — Update Settings Action Files (2 files)

- [ ] `platform/settings/presentation/store/profile.action.ts`
  - Remove `new SettingsRepositoryImpl()` and 3 use case instantiations
  - Resolve `getProfileUseCase`, `updateAccountUseCase`, `updateAvatarUseCase` from container

- [ ] `platform/settings/presentation/store/security.action.ts`
  - Remove `new SettingsRepositoryImpl()` and 2 use case instantiations
  - Resolve `changePasswordUseCase`, `getRolesUseCase` from container

---

## Phase 6 — Update Interceptor (1 file)

- [ ] `shared/infrastructure/interceptors/access-token-expiry.interceptor.ts`
  - Remove imports of `RefreshTokenUseCase` and `SessionRepositoryImpl`
  - Resolve `refreshTokenUseCase` from container inside the try block

---

## Phase 7 — Verification

- [ ] Open Settings page — no `ReferenceError`
- [ ] Open Auth pages (login, forgot password) — no crash
- [ ] Trigger a 401 → verify access token refresh still works
- [ ] Trigger a 403 → verify session expired modal still shows
- [ ] Sign in, sign out — verify auth flows still work
- [ ] Check browser console — no module initialization errors

---

## Phase 8 — Cleanup (optional, after verification)

- [ ] Remove unused imports in all updated action files
- [ ] Verify no stray `new XxxRepositoryImpl()` calls remain (search the codebase)

---

## Known Risks

| Risk | Mitigation |
|------|-----------|
| Use case constructors may not use destructuring | Check each class before registering; update if needed |
| `container.ts` importing from `client.ts` may still cause a cycle | `container.ts` must NOT import `client.ts` directly — repos do that internally |
| Awilix resolution errors in production | Strict mode catches missing registrations at dev time |
