# Target State — How It Will Look After Awilix

## Goal

Replace all manual, module-level instantiation with a single **Awilix container** that:

1. Owns all repository and use case registrations
2. Resolves dependencies lazily (only when first needed, not at module load time)
3. Eliminates the circular dependency crash
4. Makes each repository a singleton — one instance shared across all use cases

---

## New File: `src/shared/infrastructure/container.ts`

This is the only place where concrete classes are wired together. Everything else
imports from the container, not from the impl files directly.

```ts
import { createContainer, asClass, asValue, Lifetime } from "awilix";

// Repositories
import { AuthRepositoryImpl } from "@/modules/auth/infrastructure/repositories/auth.repository.impl";
import { SessionRepositoryImpl } from "@/platform/session/infrastructure/repositories/session.repository.impl";
import { SettingsRepositoryImpl } from "@/platform/settings/infrastructure/repositories/settings.repository.impl";
import { DeviceRepositoryImpl } from "@/platform/session/infrastructure/repositories/device.repository.impl";
import { DeviceStorageDataSource } from "@/platform/session/infrastructure/data-sources/device.storage.datasource";

// Auth use cases
import { LoginUseCase } from "@/modules/auth/application/usecases/login.usecase";
import { ForgotPasswordUseCase } from "@/modules/auth/application/usecases/forgotpassword.usecase";
import { VerifyOtpUseCase } from "@/modules/auth/application/usecases/verifyotp.usecase";
import { ResendOtpUseCase } from "@/modules/auth/application/usecases/resendotp.usecase";
import { ResetPasswordUseCase } from "@/modules/auth/application/usecases/resetpassword.usecase";
import { SignOutUseCase } from "@/modules/auth/application/usecases/signout.usecase";
import { SignOutAllUseCase } from "@/modules/auth/application/usecases/signoutall.usecase";

// Session use cases
import { RefreshTokenUseCase } from "@/platform/session/application/usecases/refresh-token.usecase";
import { GetSessionsUseCase } from "@/platform/session/application/usecases/get-sessions.usecase";
import { RevokeSessionUseCase } from "@/platform/session/application/usecases/revoke-session.usecase";

// Settings use cases
import { GetProfileUseCase } from "@/platform/settings/application/usecases/get-profile.usecase";
import { UpdateAccountUseCase } from "@/platform/settings/application/usecases/update-account.usecase";
import { UpdateAvatarUseCase } from "@/platform/settings/application/usecases/update-avatar.usecase";
import { ChangePasswordUseCase } from "@/platform/settings/application/usecases/change-password.usecase";
import { GetRolesUseCase } from "@/platform/settings/application/usecases/get-roles.usecase";

const container = createContainer({ injectionMode: "PROXY" });

container.register({
  // ── Data Sources ────────────────────────────────────────────────────────────
  deviceStorageDataSource: asClass(DeviceStorageDataSource).singleton(),

  // ── Repositories (singletons — one instance per app lifetime) ───────────────
  authRepository:     asClass(AuthRepositoryImpl).singleton(),
  sessionRepository:  asClass(SessionRepositoryImpl).singleton(),
  settingsRepository: asClass(SettingsRepositoryImpl).singleton(),
  deviceRepository:   asClass(DeviceRepositoryImpl).singleton(),

  // ── Auth Use Cases ──────────────────────────────────────────────────────────
  loginUseCase:          asClass(LoginUseCase).transient(),
  forgotPasswordUseCase: asClass(ForgotPasswordUseCase).transient(),
  verifyOtpUseCase:      asClass(VerifyOtpUseCase).transient(),
  resendOtpUseCase:      asClass(ResendOtpUseCase).transient(),
  resetPasswordUseCase:  asClass(ResetPasswordUseCase).transient(),
  signOutUseCase:        asClass(SignOutUseCase).transient(),
  signOutAllUseCase:     asClass(SignOutAllUseCase).transient(),

  // ── Session Use Cases ───────────────────────────────────────────────────────
  refreshTokenUseCase:   asClass(RefreshTokenUseCase).transient(),
  getSessionsUseCase:    asClass(GetSessionsUseCase).transient(),
  revokeSessionUseCase:  asClass(RevokeSessionUseCase).transient(),

  // ── Settings Use Cases ──────────────────────────────────────────────────────
  getProfileUseCase:     asClass(GetProfileUseCase).transient(),
  updateAccountUseCase:  asClass(UpdateAccountUseCase).transient(),
  updateAvatarUseCase:   asClass(UpdateAvatarUseCase).transient(),
  changePasswordUseCase: asClass(ChangePasswordUseCase).transient(),
  getRolesUseCase:       asClass(GetRolesUseCase).transient(),
});

export default container;
```

---

## How Action Files Will Look

### Before (broken — module level)

```ts
// forgotpassword.action.ts — BEFORE
import { AuthRepositoryImpl } from "@/modules/auth/infrastructure/repositories/auth.repository.impl";
import { ForgotPasswordUseCase } from "@/modules/auth/application/usecases/forgotpassword.usecase";

const authRepository = new AuthRepositoryImpl();           // ← module level, causes cycle
const forgotPasswordUseCase = new ForgotPasswordUseCase(authRepository);

export const forgotPasswordAction = createAsyncThunk(..., async (credentials, { rejectWithValue }) => {
    try {
        const response = await forgotPasswordUseCase.execute(credentials);
        return response;
    } catch (error) {
        return rejectWithValue(error as IApiProblemDetails);
    }
});
```

### After (fixed — resolved from container)

```ts
// forgotpassword.action.ts — AFTER
import container from "@/shared/infrastructure/container";

export const forgotPasswordAction = createAsyncThunk(..., async (credentials, { rejectWithValue }) => {
    try {
        const useCase = container.cradle.forgotPasswordUseCase;  // ← resolved lazily
        const response = await useCase.execute(credentials);
        return response;
    } catch (error) {
        return rejectWithValue(error as IApiProblemDetails);
    }
});
```

No more repository imports. No more module-level `new`. No more circular deps.

---

## How the Interceptor Will Look

### Before

```ts
// access-token-expiry.interceptor.ts — BEFORE
import { RefreshTokenUseCase } from "@/platform/session/application/usecases/refresh-token.usecase";
import { SessionRepositoryImpl } from "@/platform/session/infrastructure/repositories/session.repository.impl";

// Inside the try block:
const useCase = new RefreshTokenUseCase(new SessionRepositoryImpl());
await useCase.execute();
```

### After

```ts
// access-token-expiry.interceptor.ts — AFTER
import container from "@/shared/infrastructure/container";

// Inside the try block:
const useCase = container.cradle.refreshTokenUseCase;
await useCase.execute();
```

---

## Dependency Graph (After Awilix)

```
                        ┌─────────────────────────────────────────┐
                        │            apiClient (singleton)         │
                        │         client.ts (module level)         │
                        └──────────────┬──────────────────────────┘
                                       │ registered in container
                        ┌──────────────▼──────────────────────────┐
                        │           container.ts                   │
                        │  (single source of truth for wiring)     │
                        │                                          │
                        │  authRepository     → AuthRepositoryImpl │
                        │  sessionRepository  → SessionRepositoryImpl│
                        │  settingsRepository → SettingsRepositoryImpl│
                        │  loginUseCase       → LoginUseCase       │
                        │  ...                                     │
                        └──────────────┬──────────────────────────┘
                                       │ container.cradle.xxxUseCase
              ┌────────────────────────┼──────────────────────────┐
              │                        │                           │
     auth actions              session actions            settings actions
  (resolve use case            (resolve use case          (resolve use case
   from container)              from container)            from container)
```

---

## What Changes, What Stays the Same

| Thing | Change? | Notes |
|-------|---------|-------|
| Repository impl classes | No | No changes to the classes themselves |
| Use case classes | No | No changes — they already accept repo via constructor |
| Action files | Yes | Remove module-level instantiation, resolve from container |
| Interceptor | Yes | Remove `SessionRepositoryImpl` import, resolve from container |
| `apiClient` | No | Stays as a module-level singleton in `client.ts` |
| Repository constructors | Maybe | May need to accept deps via constructor for Awilix to inject them |

---

## Lifetime Strategy

| Registration | Lifetime | Reason |
|-------------|----------|--------|
| Repositories | `SINGLETON` | Stateless wrappers around `apiClient` — safe to share |
| Use cases | `TRANSIENT` | Each resolve gets a fresh instance — avoids stale state |
| `DeviceStorageDataSource` | `SINGLETON` | Stateless — wraps localStorage |
