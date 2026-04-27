import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IPackageEntity } from "@/modules/catalog/domain/entities/IPackageEntity";
import { catalogSlice } from "@/modules/catalog/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetActivatePackageAction = () =>
    catalogSlice.actions.clear({ context: ActionType.ActivatePackage });

/**
 * Async thunk to activate an inactive package.
 *
 * @description
 * Sets the package's `isActive` flag to `true` via
 * `activatePackageUseCase`. Returns 409 if already active.
 */
export const activatePackageAction = createAsyncThunk<
    IPackageEntity,
    string,
    { rejectValue: Failure }
>(ActionType.ActivatePackage, async (id, { rejectWithValue }) => {
    const result = await container.cradle.activatePackageUseCase.execute(id);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
