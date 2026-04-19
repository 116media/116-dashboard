/**
 * Redux action type constants for the roles module.
 */
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
} as const;

/**
 * Redux slice name for the roles module.
 */
export const SliceName = {
    Roles: "roles"
} as const;
