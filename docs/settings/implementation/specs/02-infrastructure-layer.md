# Phase 2: Infrastructure Layer

Repository port, concrete implementation, DTO-to-entity mapper, and API constants.

**Ref**: [api-endpoints.md](../../documentations/api-endpoints.md), [folder-structure.md](../../documentations/folder-structure.md)

**Pattern reference**: `src/modules/auth/infrastructure/repositories/auth.repository.impl.ts`, `src/modules/auth/infrastructure/mappers/auth.mapper.ts`

---

## Result Pattern

All repository methods return `Promise<Result<T>>` instead of `Promise<T>`. Errors are **returned as typed `Failure` values**, not thrown.

Imports:

```ts
import type { Result } from "@/shared/domain/types/result";
import { ok, err } from "@/shared/domain/types/result";
import { ProblemMapper } from "@/shared/infrastructure/mappers/problem.mapper";
```

Each method uses the shape:

```ts
async method(...): Promise<Result<T>> {
    try {
        const response = await apiClient.api.someEndpoint(...);
        return ok(SettingsMapper.mapFn(response.data));
    } catch (error) {
        return err(ProblemMapper.toFailure(error));
    }
}
```

---

## `src/platform/settings/application/repositories/settings.repository.port.ts`

- [ ] Create `ISettingsRepositoryPort` interface
- [ ] Define 7 method signatures (all return `Promise<Result<T>>`):
  - `getProfile(): Promise<Result<IUser>>`
  - `updateAccount(data: IUpdateAccountCredentials): Promise<Result<IUser>>`
  - `updateAvatar(file: File): Promise<Result<IUser>>`
  - `changePassword(data: { oldPassword: string; newPassword: string }): Promise<Result<IChangePasswordResponse>>`
  - `getRoles(): Promise<Result<IRoleWithPermissions[]>>`
- [ ] Session endpoints live on the session module's port (`SessionRepositoryPort` at `src/platform/session/application/repositories/session.repository.port.ts`):
  - `getSessions(): Promise<Result<ISession[]>>`
  - `revokeSession(sessionId: string): Promise<Result<IRevokeSessionResponse>>`
- [ ] Sign-out / sign-out-all live on the auth module's port (`IAuthRepositoryPort`)
- [ ] Import `Result` from `@/shared/domain/types/result`
- [ ] Import domain entities from Phase 1
- [ ] Document each method with JSDoc indicating `ok(T)` on success and `err(Failure)` on failure

---

## `src/platform/settings/infrastructure/mappers/settings.mapper.ts`

- [ ] Create `SettingsMapper` as a `const` object
- [ ] Implement `profileFromDto(dto: UserResponseDto): IUser`
  - Map nested `roles`, `permissions`, `avatar`
  - Handle `null`/`undefined` with `?? null`
- [ ] Implement `roleWithPermissionsFromDto(dto: RoleWithPermissionsDto): IRoleWithPermissions`
- [ ] Implement `changePasswordResponseFromDto(dto): IChangePasswordResponse`
- [ ] Follow `AuthMapper` pattern (const object, not a class)

> Session mapping lives at `src/platform/session/infrastructure/mappers/session.mapper.ts` (`SessionMapper.sessionFromDto`, `SessionMapper.revokeSessionResponseFromDto`).

---

## `src/platform/settings/infrastructure/repositories/settings.repository.impl.ts`

- [ ] Create `SettingsRepositoryImpl` class implementing `ISettingsRepositoryPort`
- [ ] For each method: `try { … return ok(mapped) } catch (error) { return err(ProblemMapper.toFailure(error)) }`
- [ ] Implementations:
  - `getProfile()` → `apiClient.api.adminGetOwnProfile()` → `ok(SettingsMapper.profileFromDto(response.data.user))`
  - `updateAccount(data)` → map `IUpdateAccountCredentials` to the API request shape (`userName`, `countryName`, `partialPhoneNumber` from `phonePartial`, `countryIsoCode` from `phoneISOCode`, `countryDialCode` from `phoneDialCode`) → `apiClient.api.adminUpdateOwnProfile(mapped)` → `ok(SettingsMapper.profileFromDto(...))`
  - `updateAvatar(file)` → `apiClient.api.adminUpdateAvatar({ avatarFile: file })` → `ok(SettingsMapper.profileFromDto(...))`
  - `changePassword(data)` → `apiClient.api.adminChangePassword(data)` → `ok(SettingsMapper.changePasswordResponseFromDto(response.data))`
  - `getRoles()` → `apiClient.api.adminGetOwnRoles()` → `ok(response.data.roles.map(SettingsMapper.roleWithPermissionsFromDto))`
- [ ] Import `apiClient` from `@/shared/infrastructure/api/client`
- [ ] Import `ok`, `err` from `@/shared/domain/types/result`
- [ ] Import `ProblemMapper` from `@/shared/infrastructure/mappers/problem.mapper`
- [ ] Follow `AuthRepositoryImpl` as the canonical example of the Result pattern

---

## `src/platform/settings/infrastructure/dependencies/settings.dependencies.ts`

- [ ] Register the settings repository and use cases with the Awilix container
- [ ] Export a `registerSettingsDependencies(container)` function
- [ ] Reuse the pattern from `src/modules/auth/infrastructure/dependencies/auth.dependencies.ts`
- [ ] The container is wired up in `src/shared/infrastructure/service.locator.ts` — add a call to `registerSettingsDependencies(container)` there
- [ ] Extend the `Cradle` interface in `service.locator.ts` with the new use cases and the repository

---

## `src/platform/settings/infrastructure/constants/api.ts` (optional)

- [ ] Create API route constants for documentation purposes
- [ ] Not strictly required since the generated client handles URLs
