# Phase 3: Roles — Redux Store & Actions

Redux slice, state types, initial state, constants, and 12 async thunk actions.

**Ref**: [redux-store.md](../../documentations/redux-store.md)

**Pattern reference**: `src/modules/auth/presentation/store/` and `src/platform/settings/presentation/store/`

---

## `src/modules/roles/presentation/store/constants.ts`

- [ ] Export `ActionType` with 12 entries:

```ts
GetAllRoles: "roles/getAll"
GetRoleById: "roles/getById"
CreateRole: "roles/create"
UpdateRole: "roles/update"
ActivateRole: "roles/activate"
DeactivateRole: "roles/deactivate"
SoftDeleteRole: "roles/softDelete"
HardDeleteRole: "roles/hardDelete"
RestoreRole: "roles/restore"
AssignPermission: "roles/assignPermission"
RemovePermission: "roles/removePermission"
BulkUpdatePermissions: "roles/bulkUpdatePermissions"
```

- [ ] Export `SliceName`: `Roles: "roles"`

---

## `src/modules/roles/presentation/store/type.ts`

- [ ] Define `IRolesState` type with 12 entries (see [redux-store.md](../../documentations/redux-store.md))
- [ ] Import `IBasicInitialState` from `@/shared/presentation/store/action.wrapper`
- [ ] Import domain entities from Phase 2
- [ ] Export `RolesStateKey` type for the purge reducer: `type RolesStateKey = keyof IRolesState`

---

## `src/modules/roles/presentation/store/state.ts`

- [ ] Export `rolesInitialState: IRolesState`
- [ ] Use `createInitialState<T>()` for each entry
- [ ] Import helpers from `@/shared/presentation/store/action.wrapper`

---

## `src/modules/roles/presentation/store/index.ts`

- [ ] Create `rolesSlice` using `createSlice`
- [ ] `name`: `SliceName.Roles`
- [ ] `initialState`: `rolesInitialState`
- [ ] Reducers: `clear` (ActionWrapperReset), `purge` (selective reset)
- [ ] `extraReducers`: `ActionWrapperPending/Fulfilled/Rejected` for all 12 actions
- [ ] Export `rolesSlice.actions` and default export `rolesSlice.reducer`

---

## Action Files (12)

Each file follows the same pattern:

```ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { rolesSlice } from ".";
import { ActionType } from "./constants";

export const resetXxxAction = () =>
    rolesSlice.actions.clear({ context: ActionType.Xxx });

export const xxxAction = createAsyncThunk<
    TResponse,
    TRequest,
    { rejectValue: Failure }
>(ActionType.Xxx, async (params, { rejectWithValue }) => {
    const result = await container.cradle.xxxUseCase.execute(params);
    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
```

### Files to create

| # | File | Action | Request | Response |
| --- | --- | --- | --- | --- |
| 1 | `getall.action.ts` | `getAllRolesAction` | `IRolesQueryParams` | `IRolePaginatedResult` |
| 2 | `getbyid.action.ts` | `getRoleByIdAction` | `string` | `IRoleWithPermissions` |
| 3 | `create.action.ts` | `createRoleAction` | `ICreateRoleCredentials` | `IRoleEntity` |
| 4 | `update.action.ts` | `updateRoleAction` | `{ id: string; data: IUpdateRoleCredentials }` | `IRoleEntity` |
| 5 | `activate.action.ts` | `activateRoleAction` | `string` | `IRoleEntity` |
| 6 | `deactivate.action.ts` | `deactivateRoleAction` | `string` | `IRoleEntity` |
| 7 | `softdelete.action.ts` | `softDeleteRoleAction` | `string` | `IRoleEntity` |
| 8 | `harddelete.action.ts` | `hardDeleteRoleAction` | `string` | `IRoleActionResponse` |
| 9 | `restore.action.ts` | `restoreRoleAction` | `string` | `IRoleEntity` |
| 10 | `assignpermission.action.ts` | `assignPermissionAction` | `{ roleId: string; permissionId: string }` | `IRoleWithPermissions` |
| 11 | `removepermission.action.ts` | `removePermissionAction` | `{ roleId: string; permissionId: string }` | `IRoleWithPermissions` |
| 12 | `bulkupdatepermissions.action.ts` | `bulkUpdatePermissionsAction` | `{ roleId: string; permissionIds: string[] }` | `IRoleWithPermissions` |

- [ ] Each file exports a `resetXxxAction` helper
- [ ] Each thunk uses `container.cradle.*UseCase` (not manual instantiation)
- [ ] `rejectValue` type is always `Failure`
- [ ] No `try/catch` — use `if (!result.ok) return rejectWithValue(result.error)`

---

## Root Reducer Update

### `src/shared/presentation/store/root.reducer.ts`

- [ ] Import `rolesReducer` from `@/modules/roles/presentation/store`
- [ ] Add `roles: rolesReducer` to `combineReducers`
- [ ] Verify `IRootState` includes `roles` via `ReturnType<typeof rootReducer>`
- [ ] `roles` slice is NOT added to Redux persist whitelist
