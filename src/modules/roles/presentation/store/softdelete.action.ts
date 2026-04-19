import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IRoleEntity } from "@/modules/roles/domain/entities/IRole";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

/**
 * Async thunk to soft-delete a role (reversible).
 *
 * @description
 * Marks the role as deleted (isDeleted=true, isActive=false) without
 * removing it from the database. Can be restored later.
 * Returns 409 if already deleted, 400 if core role.
 */
export const softDeleteRoleAction = createAsyncThunk<IRoleEntity, string, { rejectValue: Failure }>(
    ActionType.SoftDeleteRole,
    async (id, { rejectWithValue }) => {
        const result = await container.cradle.softDeleteRoleUseCase.execute(id);

        if (!result.ok) return rejectWithValue(result.error);
        return result.value;
    }
);
