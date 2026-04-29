import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IRoleEntity } from "@/modules/roles/domain/entities/IRole";
import { rolesSlice } from "@/modules/roles/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetActivateRoleAction = () =>
    rolesSlice.actions.clear({ context: ActionType.ActivateRole });

/**
 * Async thunk to activate an inactive role.
 *
 * @description
 * Sets the role's `isActive` flag to `true` via `activateRoleUseCase`.
 * Returns 409 if the role is already active.
 */
export const activateRoleAction = createAsyncThunk<IRoleEntity, string, { rejectValue: Failure }>(
    ActionType.ActivateRole,
    async (id, { rejectWithValue }) => {
        const result = await container.cradle.activateRoleUseCase.execute(id);

        if (!result.ok) return rejectWithValue(result.error);
        return result.value;
    }
);
