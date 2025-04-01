import type { IPermissionEntity } from "@/modules/permissions/domain/entities/IPermission";
import type { IRoleEntity } from "./IRole";

/**
 * Role entity with its assigned permissions.
 *
 * @interface IRoleWithPermissions
 * @extends {IRoleEntity}
 *
 * @description
 * Returned by the `GET /api/v1/admin/roles/{id}` endpoint which
 * includes the role's full data plus its permission associations.
 *
 * @property {IPermissionEntity[]} permissions - Permissions assigned to this role
 */
export interface IRoleWithPermissions extends IRoleEntity {
    permissions: IPermissionEntity[];
}
