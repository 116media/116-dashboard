# Phase 2: Roles — Domain & Infrastructure

Domain entities, repository port and implementation, mapper, use cases, and DI registration.

**Ref**: [api-endpoints.md](../../documentations/api-endpoints.md), [folder-structure.md](../../documentations/folder-structure.md)

**Pattern reference**: `src/modules/auth/application/repositories/auth.repository.port.ts`, `src/modules/auth/infrastructure/repositories/auth.repository.impl.ts`

---

## Domain Entities

### `src/modules/roles/domain/entities/IRole.ts`

- [ ] Create `IRoleEntity` interface with all fields from `RoleDto`:
  `id`, `name`, `description`, `isActive`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`, `createdBy`, `updatedBy`
- [ ] All date/string fields nullable (`string | null`)
- [ ] Note: this is the full CRUD entity, distinct from `IRole` in the auth module (which only has id/name/description)

### `src/modules/roles/domain/entities/IRoleWithPermissions.ts`

- [ ] Create `IRoleWithPermissions` interface extending `IRoleEntity`
- [ ] Add `permissions: IPermissionEntity[]`
- [ ] Import `IPermissionEntity` from `@/modules/permissions/domain/entities/IPermission`

### `src/modules/roles/domain/entities/IRolePaginatedResult.ts`

- [ ] Create type alias: `type IRolePaginatedResult = IPaginatedResult<IRoleEntity>`
- [ ] Import `IPaginatedResult` from `@/shared/domain/types/pagination`

### `src/modules/roles/domain/entities/IRoleActionResponse.ts`

- [ ] Create `IRoleActionResponse` interface: `{ isSuccess: boolean }`

---

## Repository Port

### `src/modules/roles/application/repositories/roles.repository.port.ts`

- [ ] Create `IRolesRepositoryPort` interface
- [ ] Import `Result` from `@/shared/domain/types/result`
- [ ] Define 12 methods (all return `Promise<Result<T>>`):

| Method | Params | Returns |
| --- | --- | --- |
| `getAll` | `IRolesQueryParams` | `Result<IRolePaginatedResult>` |
| `getById` | `string` | `Result<IRoleWithPermissions>` |
| `create` | `ICreateRoleCredentials` | `Result<IRoleEntity>` |
| `update` | `id: string, data: IUpdateRoleCredentials` | `Result<IRoleEntity>` |
| `activate` | `string` | `Result<IRoleEntity>` |
| `deactivate` | `string` | `Result<IRoleEntity>` |
| `softDelete` | `string` | `Result<IRoleEntity>` |
| `hardDelete` | `string` | `Result<IRoleActionResponse>` |
| `restore` | `string` | `Result<IRoleEntity>` |
| `assignPermission` | `roleId: string, permissionId: string` | `Result<IRoleWithPermissions>` |
| `removePermission` | `roleId: string, permissionId: string` | `Result<IRoleWithPermissions>` |
| `bulkUpdatePermissions` | `roleId: string, permissionIds: string[]` | `Result<IRoleWithPermissions>` |

- [ ] JSDoc each method with `@param`, `@returns` using `ok(T)` / `err(Failure)` format

---

## Mapper

### `src/modules/roles/infrastructure/mappers/roles.mapper.ts`

- [ ] Create `RolesMapper` as a `const` object (not a class)
- [ ] `roleFromDto(dto: RoleDto): IRoleEntity` — map all fields, handle nullables
- [ ] `paginatedResultFromDto(response: AdminGetAllRolesResponse): IRolePaginatedResult` — map `response.roles.items`, `response.roles.pageIndex`, etc.
- [ ] `roleWithPermissionsFromResponse(response: AdminGetRoleByIdResponse): IRoleWithPermissions` — combine `response.role` and `response.permissions` into single entity
- [ ] Import generated types from `@/shared/infrastructure/api/generated/116.api`
- [ ] Import `PermissionsMapper` from `@/modules/permissions/infrastructure/mappers/permissions.mapper` for permission mapping

---

## Repository Implementation

### `src/modules/roles/infrastructure/repositories/roles.repository.impl.ts`

- [ ] Create `RolesRepositoryImpl` class implementing `IRolesRepositoryPort`
- [ ] Import `ok`, `err` from `@/shared/domain/types/result`
- [ ] Import `ProblemMapper` from `@/shared/infrastructure/mappers/problem.mapper`
- [ ] Import `apiClient` from `@/shared/infrastructure/api/client`
- [ ] For each of 12 methods: `try { apiClient.api.*() → ok(RolesMapper.*()) } catch (error) { err(ProblemMapper.toFailure(error)) }`

API client method mapping:

| Repository method | API client method |
| --- | --- |
| `getAll` | `apiClient.api.adminGetAllRoles(query)` |
| `getById` | `apiClient.api.adminGetRoleById(id)` |
| `create` | `apiClient.api.adminCreateRole(data)` |
| `update` | `apiClient.api.adminUpdateRole(id, data)` |
| `activate` | `apiClient.api.adminActivateRole(id)` |
| `deactivate` | `apiClient.api.adminDeactivateRole(id)` |
| `softDelete` | `apiClient.api.adminSoftDeleteRole(id)` |
| `hardDelete` | `apiClient.api.adminHardDeleteRole(id)` |
| `restore` | `apiClient.api.adminRestoreRole(id)` |
| `assignPermission` | `apiClient.api.adminAssignPermissionToRole(id, { permissionId })` |
| `removePermission` | `apiClient.api.adminRemovePermissionFromRole(id, permissionId)` |
| `bulkUpdatePermissions` | `apiClient.api.adminBulkUpdateRolePermissions(id, { permissionIds })` |

---

## Use Cases (12 files)

### `src/modules/roles/application/usecases/*.usecase.ts`

Each follows the exact same pattern. Example for `getallroles.usecase.ts`:

- [ ] Create local interface extending `IResultUseCase<TReq, TRes>`
- [ ] Create class implementing the interface
- [ ] Constructor receives `{ rolesRepository }: { rolesRepository: IRolesRepositoryPort }` (Awilix cradle style)
- [ ] `execute()` delegates to repository method, returns `Promise<Result<T>>`
- [ ] JSDoc with `@class`, `@implements`, `@description`, `@param`, `@returns`

Files to create:

| # | File | Interface extends | Returns |
| --- | --- | --- | --- |
| 1 | `getallroles.usecase.ts` | `IResultUseCase<IRolesQueryParams, IRolePaginatedResult>` | Paginated list |
| 2 | `getrolebyid.usecase.ts` | `IResultUseCase<string, IRoleWithPermissions>` | Role with permissions |
| 3 | `createrole.usecase.ts` | `IResultUseCase<ICreateRoleCredentials, IRoleEntity>` | Created role |
| 4 | `updaterole.usecase.ts` | `IResultUseCase<{id, data}, IRoleEntity>` | Updated role |
| 5 | `activaterole.usecase.ts` | `IResultUseCase<string, IRoleEntity>` | Activated role |
| 6 | `deactivaterole.usecase.ts` | `IResultUseCase<string, IRoleEntity>` | Deactivated role |
| 7 | `softdeleterole.usecase.ts` | `IResultUseCase<string, IRoleEntity>` | Soft-deleted role |
| 8 | `harddeleterole.usecase.ts` | `IResultUseCase<string, IRoleActionResponse>` | `{ isSuccess }` |
| 9 | `restorerole.usecase.ts` | `IResultUseCase<string, IRoleEntity>` | Restored role |
| 10 | `assignpermission.usecase.ts` | `IResultUseCase<{roleId, permissionId}, IRoleWithPermissions>` | Updated role |
| 11 | `removepermission.usecase.ts` | `IResultUseCase<{roleId, permissionId}, IRoleWithPermissions>` | Updated role |
| 12 | `bulkupdatepermissions.usecase.ts` | `IResultUseCase<{roleId, permissionIds[]}, IRoleWithPermissions>` | Updated role |

---

## DI Registration

### `src/modules/roles/infrastructure/dependencies/roles.dependencies.ts`

- [ ] Export `registerRolesDependencies(container: AwilixContainer): void`
- [ ] Register `rolesRepository` as `asClass(RolesRepositoryImpl).singleton()`
- [ ] Register all 12 use cases as `asClass(XxxUseCase).transient()`
- [ ] Follow `registerAuthDependencies` pattern from `src/modules/auth/infrastructure/dependencies/auth.dependencies.ts`

### Update `src/shared/infrastructure/service.locator.ts`

- [ ] Extend `Cradle` interface with:
  - `rolesRepository: IRolesRepositoryPort`
  - All 12 use case types
- [ ] Import and call `registerRolesDependencies(container)` after existing registrations
