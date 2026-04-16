# Phase 1: Domain Entities

Define the three domain entity interfaces for the settings module.

**Ref**: [api-endpoints.md](../../documentations/api-endpoints.md) (Shared DTOs), [folder-structure.md](../../documentations/folder-structure.md)

---

## `src/platform/settings/domain/entities/IProfile.ts`

- [ ] Create file with `IProfile` interface
- [ ] Properties: `id`, `email`, `userName`, `roles` (reuse `IRole` from auth), `permissions` (reuse `IPermission` from auth), `authProvider`, `isVerified`, `isActive`, `avatar` (reuse `IFile` from auth or inline `IAvatar`), `countryName`, `countryFlagUrl`, `countryIsoCode`, `countryDialCode`, `partialPhoneNumber`, `fullPhoneNumber`, `createdAt`, `updatedAt`
- [ ] Import shared entity types from `@/modules/auth/domain/entities/` (`IRole`, `IPermission`, `IFile`)
- [ ] Nullable fields: `email`, `avatar`, `countryName`, `countryFlagUrl`, `countryIsoCode`, `countryDialCode`, `partialPhoneNumber`, `fullPhoneNumber`, `createdAt`, `updatedAt`
- [ ] Match `UserResponseDto` shape from [api-endpoints.md](../../documentations/api-endpoints.md)

---

## `src/platform/settings/domain/entities/IRoleWithPermissions.ts`

- [ ] Create file with `IRoleWithPermissions` interface
- [ ] Properties: `id`, `name`, `description`, `isActive`, `permissions` (`ISettingsPermission[]`)
- [ ] Define `ISettingsPermission` in same file: `id`, `resource`, `action`, `description`, `isActive`
- [ ] Match `RoleWithPermissionsDto` shape from [api-endpoints.md](../../documentations/api-endpoints.md)

---

## `src/platform/session/domain/entities/ISession.ts`

> **Note**: `ISession` lives under `platform/session/` (not `platform/settings/`) because it is shared with the session module used by the token-refresh interceptor flow. If the file already exists from the session module, reuse it — do not duplicate.

- [ ] Create file with `ISession` interface (if not already present)
- [ ] Properties: `id`, `ipAddress`, `userAgent`, `browser`, `device`, `platform`, `client`, `expiresAt`, `isActive`, `createdAt`
- [ ] Use union literal types for enums:
  - `browser`: `"Chrome" | "InternetExplorer" | "Safari" | "Firefox" | "Edge" | "Opera" | "GoogleSearchApp" | "Samsung" | "Unknown"`
  - `device`: `"Desktop" | "Tablet" | "Mobile" | "Watch" | "Tv" | "Console" | "Car" | "IoT" | "Unknown"`
  - `platform`: `"Windows" | "Mac" | "Ios" | "IpadOs" | "Linux" | "Android" | "ChromeOs" | "Unknown"`
  - `client`: `"MobileApp" | "WebApp" | "Dashboard" | "Unknown"`
- [ ] Match `SessionDto` shape from [api-endpoints.md](../../documentations/api-endpoints.md)

---

## `src/platform/settings/domain/entities/IChangePasswordResponse.ts`

- [ ] Create file with `IChangePasswordResponse` interface
- [ ] Property: `isSuccess: boolean`
- [ ] Use this typed entity (not an inline `{ isSuccess: boolean }`) in repository/use case signatures

---

## `src/platform/session/domain/entities/IRevokeSessionResponse.ts`

> **Note**: Also lives under `platform/session/` — reuse if already defined.

- [ ] Create file with `IRevokeSessionResponse` interface
- [ ] Property: `isSuccess: boolean`
