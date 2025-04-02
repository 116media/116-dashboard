/**
 * Redux action type constants for the permissions module.
 */
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
} as const;

/**
 * Redux slice name for the permissions module.
 */
export const SliceName = {
    Permissions: "permissions"
} as const;
