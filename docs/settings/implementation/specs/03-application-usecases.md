# Phase 3: Application Use Cases

5 use case classes for settings operations, one per API call. Each follows the same pattern.

**Ref**: [api-endpoints.md](../../documentations/api-endpoints.md), [redux-store.md](../../documentations/redux-store.md)

**Pattern reference**: `src/modules/auth/application/usecases/login.usecase.ts`

---

## Common Pattern

Each use case:

1. Defines a local interface extending `IResultUseCase<TRequest, TResponse>` from `@/shared/application/usecases/IUseCase`
2. Constructor accepts dependencies via **Awilix-style destructured cradle** (not positional args)
3. `execute()` returns `Promise<Result<T>>` and delegates to the repository
4. Exports the class as a named export

### Template

```ts
import type { ISettingsRepositoryPort } from "@/platform/settings/application/repositories/settings.repository.port";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/types/result";

/**
 * @interface IGetProfileUseCase
 * @extends {IResultUseCase<void, IUser>}
 */
interface IGetProfileUseCase extends IResultUseCase<void, IUser> {}

/**
 * Fetches the current user's profile.
 *
 * @class GetProfileUseCase
 * @implements {IGetProfileUseCase}
 */
export class GetProfileUseCase implements IGetProfileUseCase {
    private readonly settingsRepository: ISettingsRepositoryPort;

    constructor({ settingsRepository }: { settingsRepository: ISettingsRepositoryPort }) {
        this.settingsRepository = settingsRepository;
    }

    /**
     * @returns {Promise<Result<IUser>>} `ok(IUser)` on success, `err(Failure)` on failure
     */
    async execute(): Promise<Result<IUser>> {
        return this.settingsRepository.getProfile();
    }
}
```

> **`IUseCase` vs `IResultUseCase`** — `IUseCase<TReq, TRes>` returns `Promise<TRes>` and is reserved for operations that do not wrap results (e.g. `RefreshTokenUseCase` — consumed by the interceptor and throws on failure). Every API-backed use case in settings uses `IResultUseCase`.

---

## `src/platform/settings/application/usecases/getprofile.usecase.ts`

- [ ] Create `GetProfileUseCase implements IResultUseCase<void, IUser>`
- [ ] `execute()` → `this.settingsRepository.getProfile()` (already returns `Result<IUser>`)

## `src/platform/settings/application/usecases/updateaccount.usecase.ts`

- [ ] Create `UpdateAccountUseCase implements IResultUseCase<IUpdateAccountCredentials, IUser>`
- [ ] `execute(data)` → `this.settingsRepository.updateAccount(data)`

## `src/platform/settings/application/usecases/updateavatar.usecase.ts`

- [ ] Create `UpdateAvatarUseCase implements IResultUseCase<File, IUser>`
- [ ] `execute(file)` → `this.settingsRepository.updateAvatar(file)`

## `src/platform/settings/application/usecases/changepassword.usecase.ts`

- [ ] Create `ChangePasswordUseCase implements IResultUseCase<{ oldPassword: string; newPassword: string }, IChangePasswordResponse>`
- [ ] `execute(data)` → `this.settingsRepository.changePassword(data)`

## `src/platform/settings/application/usecases/getroles.usecase.ts`

- [ ] Create `GetRolesUseCase implements IResultUseCase<void, IRoleWithPermissions[]>`
- [ ] `execute()` → `this.settingsRepository.getRoles()`

---

## Session use cases (live under `platform/session/`)

These are part of the session module but used by the settings UI:

- `GetSessionsUseCase` — `IResultUseCase<void, ISession[]>`
- `RevokeSessionUseCase` — `IResultUseCase<string, IRevokeSessionResponse>`

## Sign-out use cases (live under `modules/auth/`)

- `SignOutUseCase` — `IResultUseCase<void, ISignOutResponse>`
- `SignOutAllUseCase` — `IResultUseCase<void, ISignOutAllResponse>`

These already exist in their respective modules — reuse them, do not re-implement.

---

## Wire use cases into the DI container

- [ ] In `src/platform/settings/infrastructure/dependencies/settings.dependencies.ts`, register each use case with Awilix (e.g. `asClass(GetProfileUseCase).scoped()`)
- [ ] Add the new use cases to the `Cradle` interface at `src/shared/infrastructure/service.locator.ts`
- [ ] Thunks resolve use cases via `container.cradle.getProfileUseCase`, `container.cradle.updateAccountUseCase`, etc. — never `new XxxUseCase()` at module load time
