# Phase 2: Infrastructure Layer

Repository port, concrete implementation, DTO-to-entity mapper, and API constants.

**Ref**: [api-endpoints.md](../../documentations/api-endpoints.md), [folder-structure.md](../../documentations/folder-structure.md)

**Pattern reference**: `src/modules/auth/infrastructure/repositories/auth.repository.impl.ts`, `src/modules/auth/infrastructure/mappers/auth.mapper.ts`

---

## `src/modules/settings/application/repositories/settings.repository.port.ts`

- [ ] Create `ISettingsRepositoryPort` interface
- [ ] Define 9 method signatures:
  - `getProfile(): Promise<IProfile>`
  - `updateAccount(data: IUpdateAccountCredentials): Promise<IProfile>`
  - `updateAvatar(file: File): Promise<IProfile>`
  - `changePassword(data: { oldPassword: string; newPassword: string }): Promise<{ isSuccess: boolean }>`
  - `getRoles(): Promise<IRoleWithPermissions[]>`
  - `getSessions(): Promise<ISession[]>`
  - `revokeSession(sessionId: string): Promise<{ isSuccess: boolean }>`
  - `signOut(refreshToken: string): Promise<{ isSuccess: boolean }>`
  - `signOutAll(): Promise<{ isSuccess: boolean }>`
- [ ] Import domain entities from Phase 1
- [ ] Follow `IAuthRepositoryPort` pattern

---

## `src/modules/settings/infrastructure/mappers/settings.mapper.ts`

- [ ] Create `SettingsMapper` as a `const` object
- [ ] Implement `profileFromDto(dto: UserResponseDto): IProfile`
  - Map nested `roles`, `permissions`, `avatar` using auth mapper functions or local logic
  - Handle `null`/`undefined` with `?? null`
- [ ] Implement `roleWithPermissionsFromDto(dto: RoleWithPermissionsDto): IRoleWithPermissions`
  - Map nested `permissions` array
- [ ] Implement `sessionFromDto(dto: SessionDto): ISession`
- [ ] Follow `AuthMapper` pattern (const object, not a class)

---

## `src/modules/settings/infrastructure/repositories/settings.repository.impl.ts`

- [ ] Create `SettingsRepositoryImpl` class implementing `ISettingsRepositoryPort`
- [ ] Implement all 9 methods:
  - `getProfile()` → `apiClient.api.adminGetOwnProfile()` → map via `SettingsMapper.profileFromDto`
  - `updateAccount(data)` → map `IUpdateAccountCredentials` to API shape (`userName`, `countryName`, `partialPhoneNumber` from `phonePartial`, `countryIsoCode` from `phoneISOCode`, `countryDialCode` from `phoneDialCode`) → `apiClient.api.adminUpdateOwnProfile(mapped)` → map response via `SettingsMapper.profileFromDto`
  - `updateAvatar(file)` → `apiClient.api.adminUpdateAvatar({ avatarFile: file })` → map via `SettingsMapper.profileFromDto`
  - `changePassword(data)` → `apiClient.api.adminChangePassword(data)` → return `{ isSuccess }`
  - `getRoles()` → `apiClient.api.adminGetOwnRoles()` → map each via `SettingsMapper.roleWithPermissionsFromDto`
  - `getSessions()` → `apiClient.api.adminGetOwnSessions({ isActive: true })` → map each via `SettingsMapper.sessionFromDto`
  - `revokeSession(id)` → `apiClient.api.adminRevokeSession(id)` → return `{ isSuccess }`
  - `signOut(refreshToken)` → `apiClient.api.adminSignOut({ refreshToken })` → return `{ isSuccess }`
  - `signOutAll()` → `apiClient.api.adminSignOutFromAllDevices()` → return `{ isSuccess }`
- [ ] Import `apiClient` from `@/shared/api/client`
- [ ] Follow `AuthRepositoryImpl` error handling pattern (try/catch → rethrow as `IApiProblemDetails`)

---

## `src/modules/settings/infrastructure/constants/api.ts` (optional)

- [ ] Create API route constants for documentation purposes
- [ ] Not strictly required since the generated client handles URLs
