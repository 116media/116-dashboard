# Phase 5: Permissions — Domain & Infrastructure

Same structure as Phase 2 (Roles) but for the permissions module with 9 endpoints (no association endpoints).

**Ref**: [api-endpoints.md](../../documentations/api-endpoints.md), [folder-structure.md](../../documentations/folder-structure.md)

**Pattern reference**: Phase 2 roles module, `src/modules/auth/` patterns

---

## Domain Entities

### `src/modules/permissions/domain/entities/IPermission.ts`

- [ ] Create `IPermissionEntity` interface:
  `id`, `resource`, `action`, `description`, `isActive`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`, `createdBy`, `updatedBy`

### `src/modules/permissions/domain/entities/IPermissionPaginatedResult.ts`

- [ ] `type IPermissionPaginatedResult = IPaginatedResult<IPermissionEntity>`

### `src/modules/permissions/domain/entities/IPermissionActionResponse.ts`

- [ ] `interface IPermissionActionResponse { isSuccess: boolean }`

---

## Repository Port

### `src/modules/permissions/application/repositories/permissions.repository.port.ts`

- [ ] Create `IPermissionsRepositoryPort` interface with 9 methods:

| Method | Params | Returns |
| --- | --- | --- |
| `getAll` | `IPermissionsQueryParams` | `Result<IPermissionPaginatedResult>` |
| `getById` | `string` | `Result<IPermissionEntity>` |
| `create` | `ICreatePermissionCredentials` | `Result<IPermissionEntity>` |
| `update` | `id, IUpdatePermissionCredentials` | `Result<IPermissionEntity>` |
| `activate` | `string` | `Result<IPermissionEntity>` |
| `deactivate` | `string` | `Result<IPermissionEntity>` |
| `softDelete` | `string` | `Result<IPermissionEntity>` |
| `hardDelete` | `string` | `Result<IPermissionActionResponse>` |
| `restore` | `string` | `Result<IPermissionEntity>` |

---

## Mapper

### `src/modules/permissions/infrastructure/mappers/permissions.mapper.ts`

- [ ] `permissionFromDto(dto: PermissionDto): IPermissionEntity`
- [ ] `paginatedResultFromDto(response: AdminGetAllPermissionsResponse): IPermissionPaginatedResult`

---

## Repository Implementation

### `src/modules/permissions/infrastructure/repositories/permissions.repository.impl.ts`

API client method mapping:

| Repository method | API client method |
| --- | --- |
| `getAll` | `apiClient.api.adminGetAllPermissions(query)` |
| `getById` | `apiClient.api.adminGetPermissionById(id)` |
| `create` | `apiClient.api.adminCreatePermission(data)` |
| `update` | `apiClient.api.adminUpdatePermission(id, data)` |
| `activate` | `apiClient.api.adminActivatePermission(id)` |
| `deactivate` | `apiClient.api.adminDeactivatePermission(id)` |
| `softDelete` | `apiClient.api.adminSoftDeletePermission(id)` |
| `hardDelete` | `apiClient.api.adminHardDeletePermission(id)` |
| `restore` | `apiClient.api.adminRestorePermission(id)` |

---

## Use Cases (9 files)

| # | File | Returns |
| --- | --- | --- |
| 1 | `getallpermissions.usecase.ts` | `Result<IPermissionPaginatedResult>` |
| 2 | `getpermissionbyid.usecase.ts` | `Result<IPermissionEntity>` |
| 3 | `createpermission.usecase.ts` | `Result<IPermissionEntity>` |
| 4 | `updatepermission.usecase.ts` | `Result<IPermissionEntity>` |
| 5 | `activatepermission.usecase.ts` | `Result<IPermissionEntity>` |
| 6 | `deactivatepermission.usecase.ts` | `Result<IPermissionEntity>` |
| 7 | `softdeletepermission.usecase.ts` | `Result<IPermissionEntity>` |
| 8 | `harddeletepermission.usecase.ts` | `Result<IPermissionActionResponse>` |
| 9 | `restorepermission.usecase.ts` | `Result<IPermissionEntity>` |

---

## DI Registration

### `src/modules/permissions/infrastructure/dependencies/permissions.dependencies.ts`

- [ ] Register `permissionsRepository` (singleton) + 9 use cases (transient)
- [ ] Update `Cradle` interface in `service.locator.ts`
- [ ] Call `registerPermissionsDependencies(container)`
