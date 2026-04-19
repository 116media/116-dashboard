# Roles & Permissions — API Endpoints

All endpoints are defined in the generated API client at `src/shared/infrastructure/api/generated/116.api.ts`. All requests require JWT Bearer authentication.

---

## Role Endpoints (11)

### GET `/api/v1/admin/roles`

List all roles with server-side pagination, search, and status filtering.

**API method:** `apiClient.api.adminGetAllRoles(query?)`

**Query parameters:**

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `pageIndex` | number | 0 | Zero-based page index |
| `pageSize` | number | 10 | Items per page |
| `search` | string | — | Fuzzy search on name and description |
| `isActive` | boolean | — | Filter by active status |
| `isDeleted` | boolean | — | Filter by deleted status |

**Response** — `AdminGetAllRolesResponse`:

```ts
{
  roles: RoleDtoPaginatedResult;
}
```

**Authorization:** `RequireAdminOrSuperAdmin`

---

### GET `/api/v1/admin/roles/{id}`

Get a single role by ID, including its assigned permissions.

**API method:** `apiClient.api.adminGetRoleById(id)`

**Response** — `AdminGetRoleByIdResponse`:

```ts
{
  role: RoleDto;
  permissions: PermissionDto[];
}
```

**Authorization:** `RequireAdminOrSuperAdmin`

---

### POST `/api/v1/admin/roles`

Create a new role.

**API method:** `apiClient.api.adminCreateRole(data)`

**Request body** — `AdminCreateRoleRequest`:

```ts
{
  name: string;          // required, max 20 chars
  description: string;   // required, max 300 chars
}
```

**Response** — `AdminCreateRoleResponse` (HTTP 201):

```ts
{
  role: RoleDto;
}
```

**Status codes:** 201, 400, 401, 403, 409 (name already exists), 429

**Authorization:** `RequireSuperAdminOnly`

---

### PUT `/api/v1/admin/roles/{id}`

Update a role's name and/or description.

**API method:** `apiClient.api.adminUpdateRole(id, data)`

**Request body** — `AdminUpdateRoleRequest`:

```ts
{
  name?: string | null;          // max 20 chars
  description?: string | null;   // max 300 chars
}
```

**Response** — `AdminUpdateRoleResponse`:

```ts
{
  role: RoleDto;
}
```

**Status codes:** 200, 400, 401, 403, 404, 409 (name conflict), 429

**Authorization:** `RequireSuperAdminOnly`

---

### PATCH `/api/v1/admin/roles/{id}/activate`

Activate an inactive role.

**API method:** `apiClient.api.adminActivateRole(id)`

**Response** — `AdminActivateRoleResponse`:

```ts
{
  role: RoleDto;
  isSuccess: boolean;
}
```

**Error cases:** 409 if already active

**Authorization:** `RequireSuperAdminOnly`

---

### PATCH `/api/v1/admin/roles/{id}/deactivate`

Deactivate an active role.

**API method:** `apiClient.api.adminDeactivateRole(id)`

**Response** — `AdminDeactivateRoleResponse`:

```ts
{
  role: RoleDto;
  isSuccess: boolean;
}
```

**Error cases:** 409 if already inactive

**Authorization:** `RequireSuperAdminOnly`

---

### DELETE `/api/v1/admin/roles/{id}`

Soft delete a role (sets isDeleted=true, isActive=false, deletedAt=now).

**API method:** `apiClient.api.adminSoftDeleteRole(id)`

**Response** — `AdminSoftDeleteRoleResponse`:

```ts
{
  role: RoleDto;
  isSuccess: boolean;
}
```

**Error cases:** 409 if already deleted, 400 if core role

**Authorization:** `RequireSuperAdminOnly`

---

### DELETE `/api/v1/admin/roles/{id}/hard`

Permanently delete a role. Cascades to UserRole and RolePermission junction tables.

**API method:** `apiClient.api.adminHardDeleteRole(id)`

**Response** — `AdminHardDeleteRoleResponse`:

```ts
{
  isSuccess: boolean;
}
```

**Error cases:** 400 if core role, 404 if not found

**Authorization:** `RequireSuperAdminOnly`

---

### PATCH `/api/v1/admin/roles/{id}/restore`

Restore a soft-deleted role (sets isDeleted=false, deletedAt=null).

**API method:** `apiClient.api.adminRestoreRole(id)`

**Response** — `AdminRestoreRoleResponse`:

```ts
{
  role: RoleDto;
}
```

**Error cases:** 409 if not deleted

**Authorization:** `RequireSuperAdminOnly`

---

## Permission Endpoints (9)

### GET `/api/v1/admin/permissions`

List all permissions with server-side pagination, search, and filtering.

**API method:** `apiClient.api.adminGetAllPermissions(query?)`

**Query parameters:** Same shape as roles — `pageIndex`, `pageSize`, `search`, `isActive`, `isDeleted`

**Response** — `AdminGetAllPermissionsResponse`:

```ts
{
  permissions: PermissionDtoPaginatedResult;
}
```

**Authorization:** `RequireAdminOrSuperAdmin`

---

### GET `/api/v1/admin/permissions/{id}`

Get a single permission by ID.

**API method:** `apiClient.api.adminGetPermissionById(id)`

**Response** — `AdminGetPermissionByIdResponse`:

```ts
{
  permission: PermissionDto;
}
```

**Authorization:** `RequireAdminOrSuperAdmin`

---

### POST `/api/v1/admin/permissions`

Create a new permission.

**API method:** `apiClient.api.adminCreatePermission(data)`

**Request body** — `AdminCreatePermissionRequest`:

```ts
{
  resource: string;       // required, max 15 chars
  action: string;         // required, max 15 chars
  description: string;    // required, max 300 chars
}
```

**Response** — `AdminCreatePermissionResponse` (HTTP 201):

```ts
{
  permission: PermissionDto;
}
```

**Status codes:** 201, 400, 401, 403, 409 (resource+action already exists), 429

**Authorization:** `RequireSuperAdminOnly`

---

### PUT `/api/v1/admin/permissions/{id}`

Update a permission's resource, action, and/or description.

**API method:** `apiClient.api.adminUpdatePermission(id, data)`

**Request body** — `AdminUpdatePermissionRequest`:

```ts
{
  resource?: string | null;      // max 15 chars
  action?: string | null;        // max 15 chars
  description?: string | null;   // max 300 chars
}
```

**Response** — `AdminUpdatePermissionResponse`:

```ts
{
  permission: PermissionDto;
}
```

**Status codes:** 200, 400, 401, 403, 404, 409 (resource+action conflict), 429

**Authorization:** `RequireSuperAdminOnly`

---

### PATCH `/api/v1/admin/permissions/{id}/activate`

**API method:** `apiClient.api.adminActivatePermission(id)`

**Response** — `AdminActivatePermissionResponse`:

```ts
{
  permission: PermissionDto;
  isSuccess: boolean;
}
```

**Authorization:** `RequireSuperAdminOnly`

---

### PATCH `/api/v1/admin/permissions/{id}/deactivate`

**API method:** `apiClient.api.adminDeactivatePermission(id)`

**Response** — `AdminDeactivatePermissionResponse`:

```ts
{
  permission: PermissionDto;
  isSuccess: boolean;
}
```

**Authorization:** `RequireSuperAdminOnly`

---

### DELETE `/api/v1/admin/permissions/{id}`

Soft delete a permission.

**API method:** `apiClient.api.adminSoftDeletePermission(id)`

**Response** — `AdminSoftDeletePermissionResponse`:

```ts
{
  permission: PermissionDto;
  isSuccess: boolean;
}
```

**Authorization:** `RequireSuperAdminOnly`

---

### DELETE `/api/v1/admin/permissions/{id}/hard`

Permanently delete a permission.

**API method:** `apiClient.api.adminHardDeletePermission(id)`

**Response** — `AdminHardDeletePermissionResponse`:

```ts
{
  isSuccess: boolean;
}
```

**Authorization:** `RequireSuperAdminOnly`

---

### PATCH `/api/v1/admin/permissions/{id}/restore`

Restore a soft-deleted permission.

**API method:** `apiClient.api.adminRestorePermission(id)`

**Response** — `AdminRestorePermissionResponse`:

```ts
{
  permission: PermissionDto;
}
```

**Authorization:** `RequireSuperAdminOnly`

---

## Role-Permission Association Endpoints (3)

### POST `/api/v1/admin/roles/{id}/permissions`

Assign a single permission to a role.

**API method:** `apiClient.api.adminAssignPermissionToRole(id, data)`

**Request body** — `AdminAssignPermissionToRoleRequest`:

```ts
{
  permissionId: string;   // UUID
}
```

**Response** — `AdminAssignPermissionToRoleResponse`:

```ts
{
  role: RoleWithPermissionsDto;
}
```

**Error cases:** 404 (role or permission not found), 409 (already assigned)

**Authorization:** `RequireSuperAdminOnly`

---

### DELETE `/api/v1/admin/roles/{id}/permissions/{permissionId}`

Remove a single permission from a role.

**API method:** `apiClient.api.adminRemovePermissionFromRole(id, permissionId)`

**Response** — `AdminRemovePermissionFromRoleResponse`:

```ts
{
  role: RoleWithPermissionsDto;
}
```

**Error cases:** 400 (not assigned), 404 (role or permission not found)

**Authorization:** `RequireSuperAdminOnly`

---

### PUT `/api/v1/admin/roles/{id}/permissions`

Bulk replace all permissions on a role. Adds new permissions not in the current set and removes permissions missing from the new set.

**API method:** `apiClient.api.adminBulkUpdateRolePermissions(id, data)`

**Request body** — `AdminBulkUpdateRolePermissionsRequest`:

```ts
{
  permissionIds: string[];   // array of permission UUIDs
}
```

**Response** — `AdminBulkUpdateRolePermissionsResponse`:

```ts
{
  role: RoleWithPermissionsDto;
}
```

**Authorization:** `RequireSuperAdminOnly`

---

## Shared DTOs

### RoleDto

```ts
interface RoleDto {
  createdAt?: string | null;
  createdBy?: string | null;
  updatedAt?: string | null;
  updatedBy?: string | null;
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  isDeleted: boolean;
  deletedAt?: string | null;
}
```

### PermissionDto

```ts
interface PermissionDto {
  createdAt?: string | null;
  createdBy?: string | null;
  updatedAt?: string | null;
  updatedBy?: string | null;
  id: string;
  resource: string;
  action: string;
  description: string;
  isActive: boolean;
  isDeleted: boolean;
  deletedAt?: string | null;
}
```

### RoleWithPermissionsDto

```ts
interface RoleWithPermissionsDto {
  createdAt?: string | null;
  createdBy?: string | null;
  updatedAt?: string | null;
  updatedBy?: string | null;
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  isDeleted: boolean;
  deletedAt?: string | null;
  permissions: PermissionDto[];
}
```

### RoleDtoPaginatedResult

```ts
interface RoleDtoPaginatedResult {
  pageIndex: number;   // 0-based
  pageSize: number;
  count: number;       // total records
  items: RoleDto[];
}
```

### PermissionDtoPaginatedResult

```ts
interface PermissionDtoPaginatedResult {
  pageIndex: number;
  pageSize: number;
  count: number;
  items: PermissionDto[];
}
```

---

## Error Handling

All endpoints return RFC 7807 ProblemDetails on error. The dashboard's error handling pipeline processes these through two layers:

1. **Infrastructure:** Axios error handler normalizes responses to `IApiProblemDetails`
2. **Domain:** Repository catches errors and converts to `Failure` via `ProblemMapper.toFailure()`

See [Settings API Endpoints — Error Handling](../../settings/documentations/api-endpoints.md#error-handling) for the full description of the two-layer flow.

### Common Error Scenarios

| Scenario | Backend Exception | HTTP | User sees |
| --- | --- | --- | --- |
| Role name already exists | `ConflictException` | 409 | "Role 'Admin' already exists" |
| Permission resource+action exists | `ConflictException` | 409 | "Permission 'users.create' already exists" |
| Role not found | `NotFoundException` | 404 | "Role with id '...' was not found" |
| Trying to modify core role | `BadRequestException` | 400 | "Core role 'SuperAdmin' cannot be modified" |
| Role already active | `ConflictException` | 409 | "Role is already active" |
| Role already deleted | `ConflictException` | 409 | "Role is already deleted" |
| Permission already assigned | `ConflictException` | 409 | "Permission is already assigned to role" |
| Validation failure | `ValidationException` | 400 | First field error message |
| Unauthorized | `AuthenticationException` | 401 | Redirect to login |
| Forbidden (Admin, not SuperAdmin) | `AuthorizationException` | 403 | "Autorisation" |

All error messages come from the backend — the dashboard never hardcodes error text.
