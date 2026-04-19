import { createInitialState } from "@/shared/presentation/store/action.wrapper";
import type { IRolesState } from "./type";

/**
 * Initial state for the roles Redux slice.
 *
 * @description
 * Defines initial state for all role-related operations.
 *
 * Each operation follows the BasicInitialState pattern
 * with data, loading, fetched, and error properties.
 */
export const rolesInitialState: IRolesState = {
    getAll: createInitialState(),
    getById: createInitialState(),
    create: createInitialState(),
    update: createInitialState(),
    activate: createInitialState(),
    deactivate: createInitialState(),
    softDelete: createInitialState(),
    hardDelete: createInitialState(),
    restore: createInitialState(),
    assignPermission: createInitialState(),
    removePermission: createInitialState(),
    bulkUpdatePermissions: createInitialState()
};
