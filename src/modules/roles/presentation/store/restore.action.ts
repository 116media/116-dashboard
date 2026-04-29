import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IRoleEntity } from "@/modules/roles/domain/entities/IRole";
import { rolesSlice } from "@/modules/roles/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetRestoreRoleAction = () =>
    rolesSlice.actions.clear({ context: ActionType.RestoreRole });

/**
 * Async thunk to restore a soft-deleted role.
 *
 * @description
 * Sets isDeleted=false and deletedAt=null via `restoreRoleUseCase`.
 * The role can then be reactivated. Returns 409 if not deleted.
 */
export const restoreRoleAction = createAsyncThunk<IRoleEntity, string, { rejectValue: Failure }>(
    ActionType.RestoreRole,
    async (id, { rejectWithValue }) => {
        const result = await container.cradle.restoreRoleUseCase.execute(id);

        if (!result.ok) return rejectWithValue(result.error);
        return result.value;
    }
);
