import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";
import type { IUploadCategoryPosterCredentials } from "@/modules/catalog/presentation/model/IUploadCategoryPosterCredentials";
import { catalogSlice } from "@/modules/catalog/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetUploadCategoryPosterAction = () =>
    catalogSlice.actions.clear({ context: ActionType.UploadCategoryPoster });

/**
 * Async thunk to upload (or replace) a category poster image.
 *
 * @description
 * Calls `uploadCategoryPosterUseCase` via the dedicated poster endpoint and stores the
 * updated category (with the resolved poster URL) in `catalog.uploadCategoryPoster.data`.
 */
export const uploadCategoryPosterAction = createAsyncThunk<
    ICategoryEntity,
    { id: string; data: IUploadCategoryPosterCredentials },
    { rejectValue: Failure }
>(ActionType.UploadCategoryPoster, async (params, { rejectWithValue }) => {
    const result = await container.cradle.uploadCategoryPosterUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
