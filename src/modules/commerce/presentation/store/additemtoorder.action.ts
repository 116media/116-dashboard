import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IOrderItemEntity } from "@/modules/commerce/domain/entities/IOrderItemEntity";
import type { Failure } from "@/shared/domain/failures/failure";
import type { EnumCoreContentType } from "@/shared/infrastructure/api/generated/116.api";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

/**
 * Async thunk to add a content item to an order.
 *
 * @description
 * Dispatches `addItemToOrderUseCase` with content item data.
 * On success, stores the created order item in `commerce.addItemToOrder.data`.
 * On failure, stores the backend `Failure` in `commerce.addItemToOrder.error`.
 */
export const addItemToOrderAction = createAsyncThunk<
    IOrderItemEntity,
    {
        orderId: string;
        contentKind: EnumCoreContentType;
        categoryId: string;
        promotionLevelId?: string | null;
        socialBoost: boolean;
        isBonus: boolean;
    },
    { rejectValue: Failure }
>(ActionType.AddItemToOrder, async (params, { rejectWithValue }) => {
    const result = await container.cradle.addItemToOrderUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
