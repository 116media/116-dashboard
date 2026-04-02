/**
 * Core user role names matching the backend `EnumCoreUserRole`.
 *
 * @enum {string}
 *
 * @description
 * Domain enum representing the three immutable system roles
 * defined in the backend. These roles cannot be created,
 * modified, or deleted at runtime.
 *
 * @property {string} SuperAdmin - Full system access, can manage all roles and permissions
 * @property {string} Admin - Administrative access, cannot modify core system roles
 * @property {string} Visitor - Standard public user with limited permissions
 */
export enum ECoreUserRole {
    Admin = "Admin",
    Visitor = "Visitor",
    SuperAdmin = "SuperAdmin"
}