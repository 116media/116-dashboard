import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IRoleEntity } from "@/modules/roles/domain/entities/IRole";
import type { ICreateRoleCredentials } from "@/modules/roles/presentation/model/ICreateRoleCredentials";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

/**
 * Async thunk to create a new role.
 *
 * @description
 * Sends name and description to the backend via `createRoleUseCase`.
 * Returns 201 on success, 409 if the role name already exists.
 */
export const createRoleAction = createAsyncThunk<
    IRoleEntity,
    ICreateRoleCredentials,
    { rejectValue: Failure }
>(ActionType.CreateRole, async (data, { rejectWithValue }) => {
    const result = await container.cradle.createRoleUseCase.execute(data);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
