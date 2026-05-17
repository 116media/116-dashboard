import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IRoleEntity } from "@/modules/roles/domain/entities/IRole";
import { rolesSlice } from "@/modules/roles/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetDeactivateRoleAction = () =>
    rolesSlice.actions.clear({ context: ActionType.DeactivateRole });

/**
 * Async thunk to deactivate an active role.
 *
 * @description
 * Sets the role's `isActive` flag to `false` via `deactivateRoleUseCase`.
 * Users with this role lose the associated permissions.
 * Returns 409 if the role is already inactive.
 */
export const deactivateRoleAction = createAsyncThunk<IRoleEntity, string, { rejectValue: Failure }>(
    ActionType.DeactivateRole,
    async (id, { rejectWithValue }) => {
        const result = await container.cradle.deactivateRoleUseCase.execute(id);

        if (!result.ok) return rejectWithValue(result.error);
        return result.value;
    }
);
