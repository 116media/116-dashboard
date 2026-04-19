# Roles & Permissions — Overview

## Feature Summary

The Roles & Permissions module provides a full CRUD interface for managing access control in the 116 platform. It consists of three pages:

1. **Roles page** (`/roles`) — list, create, edit, activate/deactivate, soft-delete/restore, hard-delete roles
2. **Permissions page** (`/permissions`) — list, create, edit, activate/deactivate, soft-delete/restore, hard-delete permissions
3. **Role-Permission association** — assign/remove permissions to/from roles via a transfer picker in the role edit view

## User Stories

### Roles

- As a SuperAdmin, I can view a paginated list of all roles with search and status filtering
- As a SuperAdmin, I can create a new role with a name and description
- As a SuperAdmin, I can edit an existing role's name and description
- As a SuperAdmin, I can activate or deactivate a role
- As a SuperAdmin, I can soft-delete a role (marks as deleted, preserves data)
- As a SuperAdmin, I can restore a soft-deleted role
- As a SuperAdmin, I can permanently delete (hard-delete) a soft-deleted role
- As an Admin, I can view the roles list but cannot make changes

### Permissions

- As a SuperAdmin, I can view a paginated list of all permissions with search and status filtering
- As a SuperAdmin, I can create a new permission with a resource, action, and description
- As a SuperAdmin, I can edit an existing permission
- As a SuperAdmin, I can activate/deactivate, soft-delete/restore, hard-delete a permission

### Role-Permission Association

- As a SuperAdmin, I can view the permissions assigned to a role
- As a SuperAdmin, I can assign one or more permissions to a role
- As a SuperAdmin, I can remove permissions from a role
- As a SuperAdmin, I can bulk-update all permissions on a role at once

## Authorization Rules

All 22 backend endpoints are protected by JWT Bearer authentication and role-based authorization:

| Endpoint Group | Policy | Allowed Roles |
| --- | --- | --- |
| Read operations (GET) | `RequireAdminOrSuperAdmin` | Admin, SuperAdmin |
| Create operations (POST) | `RequireSuperAdminOnly` | SuperAdmin |
| Update operations (PUT) | `RequireSuperAdminOnly` | SuperAdmin |
| Status changes (PATCH) | `RequireSuperAdminOnly` | SuperAdmin |
| Delete operations (DELETE) | `RequireSuperAdminOnly` | SuperAdmin |

### UI Authorization Gating

The dashboard must hide mutation controls (create button, action dropdown items) for users who are not SuperAdmin. The current user's roles are available from `session.currentUser.data.roles`.

Recommended approach: create a `useIsSuperAdmin()` hook that checks the current user's roles:

```ts
export const useIsSuperAdmin = (): boolean => {
    const { data: user } = useAppSelector(({ session: { currentUser } }) => currentUser);
    return user?.roles?.some((role) => role.name === "SuperAdmin") ?? false;
};
```

## Backend Domain Model

### Role Entity

```
RoleEntity
├── Id: Guid (primary key)
├── Name: string (max 20, unique)
├── Description: string (max 300)
├── IsActive: boolean (default: true)
├── IsDeleted: boolean (default: false)
├── DeletedAt: DateTime? (UTC)
├── CreatedAt, UpdatedAt, CreatedBy, UpdatedBy (audit fields)
├── UserRoles: ICollection<UserRoleEntity> (M:N with users)
└── RolePermissions: ICollection<RolePermissionEntity> (M:N with permissions)
```

### Permission Entity

```
PermissionEntity
├── Id: Guid (primary key)
├── Resource: string (max 15, compound unique with Action)
├── Action: string (max 15, compound unique with Resource)
├── Description: string (max 300)
├── IsActive: boolean (default: true)
├── IsDeleted: boolean (default: false)
├── DeletedAt: DateTime? (UTC)
├── CreatedAt, UpdatedAt, CreatedBy, UpdatedBy (audit fields)
└── RolePermissions: ICollection<RolePermissionEntity> (M:N with roles)
```

### Junction Tables

- **UserRoleEntity** — maps users to roles (UserId + RoleId)
- **RolePermissionEntity** — maps roles to permissions (RoleId + PermissionId)

## Core Roles (Protected)

The backend defines core roles that cannot be modified or deleted:

- **SuperAdmin** — full access to everything
- **Admin** — administrative access (read all, limited write)
- **Visitor** — read-only access

Attempting to modify or delete a core role returns a `BadRequestException` from the backend.

## Lifecycle States

Both roles and permissions follow the same lifecycle:

```
Created (isActive=true, isDeleted=false)
    │
    ├── Deactivate ──► Inactive (isActive=false, isDeleted=false)
    │                      │
    │                      ├── Activate ──► back to Active
    │                      └── SoftDelete ──► Deleted
    │
    └── SoftDelete ──► Deleted (isActive=false, isDeleted=true, deletedAt=now)
                           │
                           ├── Restore ──► Active (isDeleted=false, deletedAt=null)
                           └── HardDelete ──► Permanently removed (no recovery)
```

## Navigation

The roles and permissions pages are top-level routes in the dashboard sidebar:

| Path | Label | Icon | Position |
| --- | --- | --- | --- |
| `/roles` | Rôles | `SafetyOutlined` | After Utilisateurs |
| `/permissions` | Permissions | `UnlockOutlined` | After Rôles |
