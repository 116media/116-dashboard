# Phase 1: Domain Entities

Define the three domain entity interfaces for the settings module.

**Ref**: [api-endpoints.md](../../documentations/api-endpoints.md) (Shared DTOs), [folder-structure.md](../../documentations/folder-structure.md)

---

## `src/modules/settings/domain/entities/IProfile.ts`

- [ ] Create file with `IProfile` interface
- [ ] Properties: `id`, `email`, `userName`, `roles` (reuse `IRole` from auth), `permissions` (reuse `IPermission` from auth), `authProvider`, `isVerified`, `isActive`, `avatar` (reuse `IFile` from auth or inline `IAvatar`), `countryName`, `countryFlagUrl`, `countryIsoCode`, `countryDialCode`, `partialPhoneNumber`, `fullPhoneNumber`, `createdAt`, `updatedAt`
- [ ] Import shared entity types from `@/modules/auth/domain/entities/` (`IRole`, `IPermission`, `IFile`)
- [ ] Nullable fields: `email`, `avatar`, `countryName`, `countryFlagUrl`, `countryIsoCode`, `countryDialCode`, `partialPhoneNumber`, `fullPhoneNumber`, `createdAt`, `updatedAt`
- [ ] Match `UserResponseDto` shape from [api-endpoints.md](../../documentations/api-endpoints.md)

---

## `src/modules/settings/domain/entities/IRoleWithPermissions.ts`

- [ ] Create file with `IRoleWithPermissions` interface
- [ ] Properties: `id`, `name`, `description`, `isActive`, `permissions` (`ISettingsPermission[]`)
- [ ] Define `ISettingsPermission` in same file: `id`, `resource`, `action`, `description`, `isActive`
- [ ] Match `RoleWithPermissionsDto` shape from [api-endpoints.md](../../documentations/api-endpoints.md)

---

## `src/modules/settings/domain/entities/ISession.ts`

- [ ] Create file with `ISession` interface
- [ ] Properties: `id`, `ipAddress`, `userAgent`, `browser`, `device`, `platform`, `client`, `expiresAt`, `isActive`, `createdAt`
- [ ] Use union literal types for enums:
  - `browser`: `"Chrome" | "InternetExplorer" | "Safari" | "Firefox" | "Edge" | "Opera" | "GoogleSearchApp" | "Samsung" | "Unknown"`
  - `device`: `"Desktop" | "Tablet" | "Mobile" | "Watch" | "Tv" | "Console" | "Car" | "IoT" | "Unknown"`
  - `platform`: `"Windows" | "Mac" | "Ios" | "IpadOs" | "Linux" | "Android" | "ChromeOs" | "Unknown"`
  - `client`: `"MobileApp" | "WebApp" | "Dashboard" | "Unknown"`
- [ ] Match `SessionDto` shape from [api-endpoints.md](../../documentations/api-endpoints.md)
