import type { IPermissionEntity } from "@/modules/permissions/domain/entities/IPermission";
import type { IPermissionActionResponse } from "@/modules/permissions/domain/entities/IPermissionActionResponse";
import type { IPermissionPaginatedResult } from "@/modules/permissions/domain/entities/IPermissionPaginatedResult";
import type { IBasicInitialState } from "@/shared/presentation/store/action.wrapper";

/**
 * Redux state shape for the permissions module.
 *
 * @description
 * Each key represents one async operation with its own
 * `loading`, `fetched`, `data`, and `error` state.
 */
export type IPermissionsState = {
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

export type PermissionsStateKey = keyof IPermissionsState;
