import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IPackageEntity } from "@/modules/catalog/domain/entities/IPackageEntity";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

/**
 * Async thunk to deactivate an active package.
 *
 * @description
 * Sets the package's `isActive` flag to `false` via
 * `deactivatePackageUseCase`. Returns 409 if already inactive.
 */
export const deactivatePackageAction = createAsyncThunk<
    IPackageEntity,
    string,
    { rejectValue: Failure }
>(ActionType.DeactivatePackage, async (id, { rejectWithValue }) => {
    const result = await container.cradle.deactivatePackageUseCase.execute(id);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
