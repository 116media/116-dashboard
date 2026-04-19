# Phase 6: Permissions — Redux Store & Actions

Same structure as Phase 3 (Roles store) but with 9 actions instead of 12.

**Ref**: [redux-store.md](../../documentations/redux-store.md)

**Pattern reference**: Phase 3 roles store

---

## `src/modules/permissions/presentation/store/constants.ts`

- [ ] Export `ActionType` with 9 entries:

```ts
GetAllPermissions: "permissions/getAll"
GetPermissionById: "permissions/getById"
CreatePermission: "permissions/create"
UpdatePermission: "permissions/update"
ActivatePermission: "permissions/activate"
DeactivatePermission: "permissions/deactivate"
SoftDeletePermission: "permissions/softDelete"
HardDeletePermission: "permissions/hardDelete"
RestorePermission: "permissions/restore"
```

- [ ] Export `SliceName`: `Permissions: "permissions"`

---

## `src/modules/permissions/presentation/store/type.ts`

- [ ] Define `IPermissionsState` with 9 entries
- [ ] Export `PermissionsStateKey` type

---

## `src/modules/permissions/presentation/store/state.ts`

- [ ] `permissionsInitialState` using `createInitialState<T>()` for each

---

## `src/modules/permissions/presentation/store/index.ts`

- [ ] Create `permissionsSlice` with `clear` + `purge` reducers
- [ ] `extraReducers`: `ActionWrapperPending/Fulfilled/Rejected` for all 9 actions

---

## Action Files (9)

| # | File | Action | Request | Response |
| --- | --- | --- | --- | --- |
| 1 | `getall.action.ts` | `getAllPermissionsAction` | `IPermissionsQueryParams` | `IPermissionPaginatedResult` |
| 2 | `getbyid.action.ts` | `getPermissionByIdAction` | `string` | `IPermissionEntity` |
| 3 | `create.action.ts` | `createPermissionAction` | `ICreatePermissionCredentials` | `IPermissionEntity` |
| 4 | `update.action.ts` | `updatePermissionAction` | `{ id, data }` | `IPermissionEntity` |
| 5 | `activate.action.ts` | `activatePermissionAction` | `string` | `IPermissionEntity` |
| 6 | `deactivate.action.ts` | `deactivatePermissionAction` | `string` | `IPermissionEntity` |
| 7 | `softdelete.action.ts` | `softDeletePermissionAction` | `string` | `IPermissionEntity` |
| 8 | `harddelete.action.ts` | `hardDeletePermissionAction` | `string` | `IPermissionActionResponse` |
| 9 | `restore.action.ts` | `restorePermissionAction` | `string` | `IPermissionEntity` |

---

## Root Reducer Update

- [ ] Add `permissions: permissionsReducer` to `combineReducers` in `root.reducer.ts`
- [ ] NOT persisted
