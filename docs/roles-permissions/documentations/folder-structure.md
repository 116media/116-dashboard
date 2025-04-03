# Roles & Permissions — Folder Structure

## Overview

The roles and permissions modules follow the same **Clean Architecture** structure as the auth and settings modules. Each module is self-contained with domain, application, infrastructure, and presentation layers.

---

## Roles Module

```
src/modules/roles/
│
├── domain/
│   └── entities/
│       ├── IRole.ts                             # Full CRUD role entity
│       ├── IRoleWithPermissions.ts              # Role entity + permissions array
│       ├── IRolePaginatedResult.ts              # IPaginatedResult<IRoleEntity>
│       └── IRoleActionResponse.ts               # { isSuccess: boolean }
│
├── application/
│   ├── repositories/
│   │   └── roles.repository.port.ts             # 12 methods, all return Result<T>
│   └── usecases/
│       ├── getallroles.usecase.ts
│       ├── getrolebyid.usecase.ts
│       ├── createrole.usecase.ts
│       ├── updaterole.usecase.ts
│       ├── activaterole.usecase.ts
│       ├── deactivaterole.usecase.ts
│       ├── softdeleterole.usecase.ts
│       ├── harddeleterole.usecase.ts
│       ├── restorerole.usecase.ts
│       ├── assignpermission.usecase.ts
│       ├── removepermission.usecase.ts
│       └── bulkupdatepermissions.usecase.ts
│
├── infrastructure/
│   ├── repositories/
│   │   └── roles.repository.impl.ts             # API calls → ok() / err()
│   ├── dependencies/
│   │   └── roles.dependencies.ts                # Awilix registration
│   └── mappers/
│       └── roles.mapper.ts                      # DTO → domain entity mapping
│
└── presentation/
    ├── pages/
    │   └── RolesPage/
    │       └── index.tsx                         # Renders RolesListContainer
    │
    ├── containers/
    │   └── RolesListContainer/
    │       ├── index.tsx                         # Orchestrates table + modals
    │       └── RolesListContainer.Loading.tsx    # Skeleton loader
    │
    ├── components/
    │   ├── tables/
    │   │   └── RolesTable/
    │   │       └── columns.tsx                   # Ant Design column definitions
    │   ├── forms/
    │   │   └── RoleForm/
    │   │       ├── index.tsx                     # Create/edit form (shared)
    │   │       └── index.module.scss
    │   └── ui/
    │       └── RoleActionModal/
    │           └── index.tsx                     # Action confirmation wrapper
    │
    ├── hooks/
    │   ├── UseRolesList.ts                       # Paginated list with search/filter
    │   ├── UseCreateRole.ts                      # Create form logic
    │   ├── UseUpdateRole.ts                      # Edit form logic
    │   ├── UseRoleActions.ts                     # Activate/deactivate/delete/restore
    │   └── UseRolePermissions.ts                 # Permission picker logic (Phase 4)
    │
    ├── store/
    │   ├── index.ts                              # Slice definition
    │   ├── type.ts                               # IRolesState type
    │   ├── state.ts                              # rolesInitialState
    │   ├── constants.ts                          # ActionType + SliceName
    │   ├── getall.action.ts                      # List thunk
    │   ├── getbyid.action.ts                     # Detail thunk
    │   ├── create.action.ts                      # Create thunk
    │   ├── update.action.ts                      # Update thunk
    │   ├── activate.action.ts                    # Activate thunk
    │   ├── deactivate.action.ts                  # Deactivate thunk
    │   ├── softdelete.action.ts                  # Soft delete thunk
    │   ├── harddelete.action.ts                  # Hard delete thunk
    │   ├── restore.action.ts                     # Restore thunk
    │   ├── assignpermission.action.ts            # Assign permission thunk
    │   ├── removepermission.action.ts            # Remove permission thunk
    │   └── bulkupdatepermissions.action.ts       # Bulk update thunk
    │
    ├── model/
    │   ├── ICreateRoleCredentials.ts             # Create form model
    │   ├── IUpdateRoleCredentials.ts             # Edit form model
    │   └── IRolesQueryParams.ts                  # List query params
    │
    └── utils/
        ├── validators/
        │   └── roles.validator.ts                # Form validators
        └── notification/
            └── roles.notification.ts             # Success notification configs
```

---

## Permissions Module

```
src/modules/permissions/
│
├── domain/
│   └── entities/
│       ├── IPermission.ts                       # Full CRUD permission entity
│       ├── IPermissionPaginatedResult.ts         # IPaginatedResult<IPermissionEntity>
│       └── IPermissionActionResponse.ts          # { isSuccess: boolean }
│
├── application/
│   ├── repositories/
│   │   └── permissions.repository.port.ts        # 9 methods, all return Result<T>
│   └── usecases/
│       ├── getallpermissions.usecase.ts
│       ├── getpermissionbyid.usecase.ts
│       ├── createpermission.usecase.ts
│       ├── updatepermission.usecase.ts
│       ├── activatepermission.usecase.ts
│       ├── deactivatepermission.usecase.ts
│       ├── softdeletepermission.usecase.ts
│       ├── harddeletepermission.usecase.ts
│       └── restorepermission.usecase.ts
│
├── infrastructure/
│   ├── repositories/
│   │   └── permissions.repository.impl.ts
│   ├── dependencies/
│   │   └── permissions.dependencies.ts
│   └── mappers/
│       └── permissions.mapper.ts
│
└── presentation/
    ├── pages/
    │   └── PermissionsPage/
    │       └── index.tsx
    ├── containers/
    │   └── PermissionsListContainer/
    │       ├── index.tsx
    │       └── PermissionsListContainer.Loading.tsx
    ├── components/
    │   ├── tables/
    │   │   └── PermissionsTable/
    │   │       └── columns.tsx
    │   ├── forms/
    │   │   └── PermissionForm/
    │   │       ├── index.tsx
    │   │       └── index.module.scss
    │   └── ui/
    │       └── PermissionActionModal/
    │           └── index.tsx
    ├── hooks/
    │   ├── UsePermissionsList.ts
    │   ├── UseCreatePermission.ts
    │   ├── UseUpdatePermission.ts
    │   └── UsePermissionActions.ts
    ├── store/
    │   ├── index.ts
    │   ├── type.ts
    │   ├── state.ts
    │   ├── constants.ts
    │   ├── getall.action.ts
    │   ├── getbyid.action.ts
    │   ├── create.action.ts
    │   ├── update.action.ts
    │   ├── activate.action.ts
    │   ├── deactivate.action.ts
    │   ├── softdelete.action.ts
    │   ├── harddelete.action.ts
    │   └── restore.action.ts
    ├── model/
    │   ├── ICreatePermissionCredentials.ts
    │   ├── IUpdatePermissionCredentials.ts
    │   └── IPermissionsQueryParams.ts
    └── utils/
        ├── validators/
        │   └── permissions.validator.ts
        └── notification/
            └── permissions.notification.ts
```

---

## Shared CRUD Components (new, Phase 1)

```
src/shared/
├── domain/
│   └── types/
│       └── pagination.ts                         # FormContext, IStatusOption<T>,
│                                                 # IPaginationParams, IPaginatedResult<T>
└── presentation/
    └── ui/
        ├── PageHeader/
        │   ├── index.tsx                          # Title + count + create button
        │   └── index.module.scss
        ├── TableSearchInput/
        │   ├── index.tsx                          # Search with Enter-to-search
        │   └── index.module.scss
        ├── TableStatusFilter/
        │   └── index.tsx                          # Select: Tous / Actifs / Inactifs / Supprimés
        ├── CreateEditModal/
        │   ├── index.tsx                          # Create/edit modal with form context
        │   └── index.module.scss
        ├── FormSuccessResult/
        │   ├── index.tsx                          # Success state after submission
        │   └── index.module.scss
        ├── ActionModal/
        │   ├── index.tsx                          # Confirmation modal for actions
        │   └── index.module.scss
        └── TableActionDropdown/
            └── index.tsx                          # Dropdown for row actions
```

---

## Files to Modify (Integration)

| File | Change |
| --- | --- |
| `src/shared/infrastructure/service.locator.ts` | Add roles + permissions to Cradle, register dependencies |
| `src/shared/presentation/store/root.reducer.ts` | Add `roles` and `permissions` reducers |
| `src/shared/presentation/constants/paths.ts` | Add `ROLES_PATH`, `PERMISSIONS_PATH` |
| `src/shared/presentation/constants/navigation.ts` | Add navigation items |
| `src/shared/presentation/ui/Icons/index.tsx` | Export `IconSafetyOutlined`, `IconUnlockOutlined` |
| `src/routes.tsx` | Add lazy routes for RolesPage, PermissionsPage |

---

## Naming Conventions

Same conventions as the settings module — see [Settings Folder Structure](../../settings/documentations/folder-structure.md#naming-conventions).

### Key differences from `settings/`

| Aspect | Settings module | Roles/Permissions modules |
| --- | --- | --- |
| Location | `src/platform/settings/` | `src/modules/roles/`, `src/modules/permissions/` |
| Reason | Settings is cross-cutting platform config | Roles/Permissions are feature modules |
| Existing scaffold | No (built from scratch) | Yes (`src/modules/roles/` and `src/modules/permissions/` directories exist with `.gitkeep`) |
