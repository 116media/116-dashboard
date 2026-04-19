import type { IRoleEntity } from "@/modules/roles/domain/entities/IRole";
import type { IRoleActionResponse } from "@/modules/roles/domain/entities/IRoleActionResponse";
import type { IRolePaginatedResult } from "@/modules/roles/domain/entities/IRolePaginatedResult";
import type { IRoleWithPermissions } from "@/modules/roles/domain/entities/IRoleWithPermissions";
import type { IBasicInitialState } from "@/shared/presentation/store/action.wrapper";

/**
 * Redux state shape for the roles module.
 *
 * @description
 * Each key represents one async operation with its own
 * `loading`, `fetched`, `data`, and `error` state.
 */
export type IRolesState = {
    getAll: IBasicInitialState<IRolePaginatedResult>;
    getById: IBasicInitialState<IRoleWithPermissions>;
    create: IBasicInitialState<IRoleEntity>;
    update: IBasicInitialState<IRoleEntity>;
    activate: IBasicInitialState<IRoleEntity>;
    deactivate: IBasicInitialState<IRoleEntity>;
    softDelete: IBasicInitialState<IRoleEntity>;
    hardDelete: IBasicInitialState<IRoleActionResponse>;
    restore: IBasicInitialState<IRoleEntity>;
    assignPermission: IBasicInitialState<IRoleWithPermissions>;
    removePermission: IBasicInitialState<IRoleWithPermissions>;
    bulkUpdatePermissions: IBasicInitialState<IRoleWithPermissions>;
};

export type RolesStateKey = keyof IRolesState;
