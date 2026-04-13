# Current State — How Dependencies Are Wired Today

## Architecture Overview

The dashboard follows Clean Architecture with three layers:

```
Presentation  →  Application  →  Infrastructure
(actions/store)   (use cases)    (repository impls, API client)
```

Dependencies flow inward: presentation depends on use cases, use cases depend on
repository ports (interfaces), infrastructure implements the ports.

**The problem**: the wiring — who creates what and passes it to whom — is done manually
and inline, scattered across every action file.

---

## The API Client (Shared Singleton)

```
src/shared/infrastructure/api/client.ts
```

`apiClient` is a module-level singleton. All repository implementations import it
directly. It is configured once with:

- `baseURL` from env
- `withCredentials: true` (HttpOnly cookies)
- `Accept-Language: fr` and `Client-App` headers
- Three response interceptors (access token expiry, refresh token expiry, error handler)

```ts
// All repos do this at the top of their file:
import { apiClient } from "@/shared/infrastructure/api/client";
```

---

## Repository Implementations

| Class | File | Dependencies |
|-------|------|-------------|
| `AuthRepositoryImpl` | `modules/auth/infrastructure/repositories/auth.repository.impl.ts` | `apiClient` (direct import) |
| `SessionRepositoryImpl` | `platform/session/infrastructure/repositories/session.repository.impl.ts` | `apiClient` + bare `refreshTokenClient` (Axios, created inline) |
| `SettingsRepositoryImpl` | `platform/settings/infrastructure/repositories/settings.repository.impl.ts` | `apiClient` (direct import) |
| `DeviceRepositoryImpl` | `platform/session/infrastructure/repositories/device.repository.impl.ts` | `IDeviceStorageDataSource` (constructor-injected) |

None of the repository constructors accept parameters — they reach out and grab `apiClient`
themselves. This is the **Service Locator anti-pattern** at the infrastructure level.

---

## Action Files — Current Wiring

Every action file does the same thing: import → instantiate at module level → use in thunk.

### Auth Module (7 files, 7 × `AuthRepositoryImpl`)

```
src/modules/auth/presentation/store/
├── login.action.ts            → new AuthRepositoryImpl() → new LoginUseCase(repo)
├── forgotpassword.action.ts   → new AuthRepositoryImpl() → new ForgotPasswordUseCase(repo)
├── verifyotp.action.ts        → new AuthRepositoryImpl() → new VerifyOtpUseCase(repo)
├── resendotp.action.ts        → new AuthRepositoryImpl() → new ResendOtpUseCase(repo)
├── resetpassword.action.ts    → new AuthRepositoryImpl() → new ResetPasswordUseCase(repo)
├── signout.action.ts          → new AuthRepositoryImpl() → new SignOutUseCase(repo)
└── signoutall.action.ts       → new AuthRepositoryImpl() → new SignOutAllUseCase(repo)
```

### Session Module (1 file)

```
src/platform/session/presentation/store/
└── session.action.ts          → new SessionRepositoryImpl()
                                    → new GetSessionsUseCase(repo)
                                    → new RevokeSessionUseCase(repo)
```

### Settings Module (2 files, 2 × `SettingsRepositoryImpl`)

```
src/platform/settings/presentation/store/
├── profile.action.ts          → new SettingsRepositoryImpl()
│                                   → new GetProfileUseCase(repo)
│                                   → new UpdateAccountUseCase(repo)
│                                   → new UpdateAvatarUseCase(repo)
└── security.action.ts         → new SettingsRepositoryImpl()
                                    → new ChangePasswordUseCase(repo)
                                    → new GetRolesUseCase(repo)
```

### Interceptor (1 file)

```
src/shared/infrastructure/interceptors/
└── access-token-expiry.interceptor.ts
        → new SessionRepositoryImpl() (lazy — inside try block, not module level)
        → new RefreshTokenUseCase(repo)
```

> **Note:** The interceptor already uses lazy instantiation (inside the function body)
> because it was written after the circular dep bug was discovered. The action files
> have not been fixed yet.

---

## Dependency Graph (Current)

```
                        ┌─────────────────────────────────────────┐
                        │            apiClient (singleton)         │
                        │         client.ts (module level)         │
                        └──────────────┬──────────────────────────┘
                                       │ imported by
              ┌────────────────────────┼─────────────────────────┐
              │                        │                          │
    AuthRepositoryImpl      SessionRepositoryImpl      SettingsRepositoryImpl
              │                        │                          │
    (×7 instances)            (×1 instance)             (×2 instances)
              │                        │                          │
    ┌─────────┴────────┐    ┌──────────┴──────────┐   ┌──────────┴─────────┐
    │  7 auth actions  │    │  session.action.ts   │   │  profile.action.ts │
    │  (module level   │    │  (module level)      │   │  security.action.ts│
    │   instantiation) │    │                      │   │  (module level)    │
    └──────────────────┘    └──────────────────────┘   └────────────────────┘
```

---

## Problems This Creates in Practice

### The crash you see

Opening the **Settings page** triggers the import of `profile.action.ts`, which imports
`SettingsRepositoryImpl`, which imports `apiClient`, which imports
`access-token-expiry.interceptor.ts`, which imports `SessionRepositoryImpl`, which
imports `apiClient` — but `apiClient` is not yet fully initialized. Result:

```
Uncaught ReferenceError: Cannot access 'AuthRepositoryImpl' before initialization
```

The exact error varies by which action file is imported first, but the root cause is
always the same cycle through `apiClient`.

### Why it didn't crash before

The `access-token-expiry.interceptor.ts` file is new. The original interceptor
(`refreshTokenInterceptor`) did not import `SessionRepositoryImpl`, so the cycle didn't
exist. Adding the new interceptor introduced the cycle.
