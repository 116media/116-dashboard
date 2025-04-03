# Roles & Permissions — Redux Store Design

## Overview

The roles and permissions features each introduce a separate Redux slice, following the same patterns as the `auth` and `settings` slices. They use the shared `ActionWrapper*` reducer helpers and the `Result<T>` / `Failure` error handling pattern established in the codebase.

Dependencies are resolved via the Awilix container at `src/shared/infrastructure/service.locator.ts` — thunks call `container.cradle.*UseCase.execute(...)`.

---

## Roles Slice

### State Shape

```ts
// File: src/modules/roles/presentation/store/type.ts

type IRolesState = {
    // List
    getAll: IBasicInitialState<IRolePaginatedResult>;
    getById: IBasicInitialState<IRoleWithPermissions>;

    // Mutations
    create: IBasicInitialState<IRoleEntity>;
    update: IBasicInitialState<IRoleEntity>;

    // Status changes
    activate: IBasicInitialState<IRoleEntity>;
    deactivate: IBasicInitialState<IRoleEntity>;

    // Deletion
    softDelete: IBasicInitialState<IRoleEntity>;
    hardDelete: IBasicInitialState<IRoleActionResponse>;
    restore: IBasicInitialState<IRoleEntity>;

    // Permission association
    assignPermission: IBasicInitialState<IRoleWithPermissions>;
    removePermission: IBasicInitialState<IRoleWithPermissions>;
    bulkUpdatePermissions: IBasicInitialState<IRoleWithPermissions>;
};
```

Each entry uses `IBasicInitialState<T>` which includes `error: Failure | null`.

### Action Constants

```ts
// File: src/modules/roles/presentation/store/constants.ts

export const ActionType = {
    GetAllRoles: "roles/getAll",
    GetRoleById: "roles/getById",
    CreateRole: "roles/create",
    UpdateRole: "roles/update",
    ActivateRole: "roles/activate",
    DeactivateRole: "roles/deactivate",
    SoftDeleteRole: "roles/softDelete",
    HardDeleteRole: "roles/hardDelete",
    RestoreRole: "roles/restore",
    AssignPermission: "roles/assignPermission",
    RemovePermission: "roles/removePermission",
    BulkUpdatePermissions: "roles/bulkUpdatePermissions"
};

export const SliceName = {
    Roles: "roles"
};
```

### Thunk Pattern

Every thunk follows the Result unwrap pattern — no `try/catch`:

```ts
// File: src/modules/roles/presentation/store/getall.action.ts

import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";

export const getAllRolesAction = createAsyncThunk<
    IRolePaginatedResult,
    IRolesQueryParams,
    { rejectValue: Failure }
>(ActionType.GetAllRoles, async (params, { rejectWithValue }) => {
    const result = await container.cradle.getAllRolesUseCase.execute(params);
    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
```

### Slice Definition

```ts
// File: src/modules/roles/presentation/store/index.ts

export const rolesSlice = createSlice({
    name: SliceName.Roles,
    initialState: rolesInitialState,
    reducers: {
        clear: ActionWrapperReset,
        purge: (state, action: PayloadAction<RolesStateKey[]>) => {
            action.payload.forEach((key) => {
                if (state[key]) {
                    state[key] = createInitialState();
                }
            });
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllRolesAction.pending, ActionWrapperPending)
            .addCase(getAllRolesAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getAllRolesAction.rejected, ActionWrapperRejected)
            // ... same pattern for all 12 actions
    }
});
```

---

## Permissions Slice

### State Shape

```ts
// File: src/modules/permissions/presentation/store/type.ts

type IPermissionsState = {
    getAll: IBasicInitialState<IPermissionPaginatedResult>;
    getById: IBasicInitialState<IPermissionEntity>;
    create: IBasicInitialState<IPermissionEntity>;
    update: IBasicInitialState<IPermissionEntity>;
    activate: IBasicInitialState<IPermissionEntity>;
    deactivate: IBasicInitialState<IPermissionEntity>;
    softDelete: IBasicInitialState<IPermissionEntity>;
    hardDelete: IBasicInitialState<IPermissionActionResponse>;
    restore: IBasicInitialState<IPermissionEntity>;
};
```

### Action Constants

```ts
export const ActionType = {
    GetAllPermissions: "permissions/getAll",
    GetPermissionById: "permissions/getById",
    CreatePermission: "permissions/create",
    UpdatePermission: "permissions/update",
    ActivatePermission: "permissions/activate",
    DeactivatePermission: "permissions/deactivate",
    SoftDeletePermission: "permissions/softDelete",
    HardDeletePermission: "permissions/hardDelete",
    RestorePermission: "permissions/restore"
};

export const SliceName = {
    Permissions: "permissions"
};
```

Same thunk pattern, same slice structure as roles.

---

## Root Reducer Integration

```ts
// File: src/shared/presentation/store/root.reducer.ts

import rolesReducer from "@/modules/roles/presentation/store";
import permissionsReducer from "@/modules/permissions/presentation/store";

const rootReducer = combineReducers({
    auth: authReducer,
    session: sessionReducer,
    settings: settingsReducer,
    roles: rolesReducer,
    permissions: permissionsReducer
});
```

### Redux Persist

Neither `roles` nor `permissions` should be persisted — data is fetched fresh on page load. Only `auth` and `session` remain in the persist whitelist.

---

## Awilix DI Registration

Each module registers its dependencies:

```ts
// File: src/modules/roles/infrastructure/dependencies/roles.dependencies.ts

export function registerRolesDependencies(container: AwilixContainer): void {
    container.register({
        rolesRepository: asClass(RolesRepositoryImpl).singleton(),
        getAllRolesUseCase: asClass(GetAllRolesUseCase).transient(),
        getRoleByIdUseCase: asClass(GetRoleByIdUseCase).transient(),
        createRoleUseCase: asClass(CreateRoleUseCase).transient(),
        updateRoleUseCase: asClass(UpdateRoleUseCase).transient(),
        activateRoleUseCase: asClass(ActivateRoleUseCase).transient(),
        deactivateRoleUseCase: asClass(DeactivateRoleUseCase).transient(),
        softDeleteRoleUseCase: asClass(SoftDeleteRoleUseCase).transient(),
        hardDeleteRoleUseCase: asClass(HardDeleteRoleUseCase).transient(),
        restoreRoleUseCase: asClass(RestoreRoleUseCase).transient(),
        assignPermissionUseCase: asClass(AssignPermissionUseCase).transient(),
        removePermissionUseCase: asClass(RemovePermissionUseCase).transient(),
        bulkUpdatePermissionsUseCase: asClass(BulkUpdatePermissionsUseCase).transient()
    });
}
```

The `Cradle` interface in `src/shared/infrastructure/service.locator.ts` must be extended with all new types, and `registerRolesDependencies(container)` + `registerPermissionsDependencies(container)` must be called.

---

## Error Flow

```
API returns ProblemDetails (error)
    │
    ▼
Axios error handler normalizes to IApiProblemDetails
    │
    ▼
Repository catches, calls ProblemMapper.toFailure(error) → Failure
    │
    ▼
Use case returns err(failure) via Result<T>
    │
    ▼
Thunk: if (!result.ok) return rejectWithValue(result.error)
    │
    ▼
ActionWrapperRejected stores Failure in state[key].error
    │
    ▼
Component displays via ErrorAlert (forms/fetches) or showNotification (mutations)
```

All error messages come from the backend's `Failure.title` / `Failure.detail` — never hardcoded.
