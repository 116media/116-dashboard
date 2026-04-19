import { createInitialState } from "@/shared/presentation/store/action.wrapper";
import type { IPermissionsState } from "./type";

/**
 * Initial state for the permissions Redux slice.
 *
 * @description
 * Defines initial state for all permission-related operations.
 *
 * Each operation follows the BasicInitialState pattern
 * with data, loading, fetched, and error properties.
 */
export const permissionsInitialState: IPermissionsState = {
    getAll: createInitialState(),
    getById: createInitialState(),
    create: createInitialState(),
    update: createInitialState(),
    activate: createInitialState(),
    deactivate: createInitialState(),
    softDelete: createInitialState(),
    hardDelete: createInitialState(),
    restore: createInitialState()
};
