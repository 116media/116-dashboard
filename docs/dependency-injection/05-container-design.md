# Container Design

## File Location

```
src/shared/infrastructure/container.ts
```

This file is the **composition root** — the single place in the entire app where
concrete classes are imported and wired together. No other file should `new` a
repository or use case.

---

## Container Structure

### Data Sources

Data sources sit below repositories — they wrap raw storage (localStorage, sessionStorage,
HTTP) and are injected into repositories that need them.

```ts
container.register({
  deviceStorageDataSource: asClass(DeviceStorageDataSource).singleton(),
});
```

`DeviceStorageDataSource` wraps `localStorage`. It is stateless and safe to be a
singleton.

---

### Repositories

Repositories wrap the API client. They are **singletons** because:

- They hold no mutable state
- `apiClient` is itself a singleton
- Sharing a single instance across use cases is safe and saves memory

```ts
container.register({
  authRepository:     asClass(AuthRepositoryImpl).singleton(),
  sessionRepository:  asClass(SessionRepositoryImpl).singleton(),
  settingsRepository: asClass(SettingsRepositoryImpl).singleton(),
  deviceRepository:   asClass(DeviceRepositoryImpl).singleton(),
});
```

> **Note on `DeviceRepositoryImpl`:** Unlike the others, it requires
> `IDeviceStorageDataSource` to be injected. Awilix handles this automatically
> via PROXY mode — it sees that the constructor needs `deviceStorageDataSource`
> and resolves it from the container.

---

### Use Cases

Use cases are **transient** because:

- They are cheap to create (no I/O, no network)
- Some use cases may hold request-scoped state during execution
- A fresh instance per resolve avoids any possibility of state leaking between calls

```ts
// Auth
container.register({
  loginUseCase:          asClass(LoginUseCase).transient(),
  forgotPasswordUseCase: asClass(ForgotPasswordUseCase).transient(),
  verifyOtpUseCase:      asClass(VerifyOtpUseCase).transient(),
  resendOtpUseCase:      asClass(ResendOtpUseCase).transient(),
  resetPasswordUseCase:  asClass(ResetPasswordUseCase).transient(),
  signOutUseCase:        asClass(SignOutUseCase).transient(),
  signOutAllUseCase:     asClass(SignOutAllUseCase).transient(),
});

// Session
container.register({
  refreshTokenUseCase:  asClass(RefreshTokenUseCase).transient(),
  getSessionsUseCase:   asClass(GetSessionsUseCase).transient(),
  revokeSessionUseCase: asClass(RevokeSessionUseCase).transient(),
});

// Settings
container.register({
  getProfileUseCase:     asClass(GetProfileUseCase).transient(),
  updateAccountUseCase:  asClass(UpdateAccountUseCase).transient(),
  updateAvatarUseCase:   asClass(UpdateAvatarUseCase).transient(),
  changePasswordUseCase: asClass(ChangePasswordUseCase).transient(),
  getRolesUseCase:       asClass(GetRolesUseCase).transient(),
});
```

---

## Naming Convention

Registration keys use **camelCase** and follow the class name without the suffix:

| Class | Registration key |
|-------|-----------------|
| `AuthRepositoryImpl` | `authRepository` |
| `LoginUseCase` | `loginUseCase` |
| `DeviceStorageDataSource` | `deviceStorageDataSource` |

The registration key must match the constructor parameter name in dependent classes.
Awilix resolves by name in PROXY mode.

---

## How Awilix Resolves `DeviceRepositoryImpl`

`DeviceRepositoryImpl` is the only repository that needs a dependency injected.
Its constructor looks like:

```ts
class DeviceRepositoryImpl {
  constructor({ deviceStorageDataSource }: { deviceStorageDataSource: IDeviceStorageDataSource }) {
    this.storage = deviceStorageDataSource;
  }
}
```

When `container.cradle.deviceRepository` is resolved, Awilix:
1. Sees `DeviceRepositoryImpl` needs `deviceStorageDataSource`
2. Resolves `deviceStorageDataSource` from the container (→ `DeviceStorageDataSource`)
3. Passes it to the constructor

No manual wiring needed.

> **Prerequisite:** The class constructor must use **destructuring** (PROXY mode
> requirement). If it currently uses positional parameters, it needs to be updated.

---

## Using the Container in Action Files

```ts
// Any action file
import container from "@/shared/infrastructure/container";

export const loginAction = createAsyncThunk(..., async (credentials, { rejectWithValue }) => {
  try {
    const response = await container.cradle.loginUseCase.execute(credentials);
    return response;
  } catch (error) {
    return rejectWithValue(error as IApiProblemDetails);
  }
});
```

No imports of concrete classes. No `new`. Just resolve from the container inside
the thunk body (lazy — runs after all modules are initialized).

---

## Using the Container in the Interceptor

```ts
// access-token-expiry.interceptor.ts
import container from "@/shared/infrastructure/container";

// Inside the try block:
await container.cradle.refreshTokenUseCase.execute();
```

Remove the imports of `RefreshTokenUseCase` and `SessionRepositoryImpl`.

---

## TypeScript: Cradle Type Inference

Awilix infers the cradle type from registrations when using the object overload of
`register`. This gives full autocomplete on `container.cradle`:

```ts
const container = createContainer()
  .register({
    authRepository: asClass(AuthRepositoryImpl).singleton(),
    loginUseCase:   asClass(LoginUseCase).transient(),
    // ...
  });

// TypeScript knows:
container.cradle.authRepository  // → AuthRepositoryImpl ✓
container.cradle.loginUseCase    // → LoginUseCase ✓
container.cradle.typo            // → TypeScript error ✓
```

---

## What Does NOT Go in the Container

| Thing | Why not |
|-------|---------|
| `apiClient` | Module-level singleton in `client.ts` — repos import it directly |
| `store` / `persistor` | Redux manages its own lifecycle |
| React components | Components are not services |
| Constants / config values | Import directly from constants files |
