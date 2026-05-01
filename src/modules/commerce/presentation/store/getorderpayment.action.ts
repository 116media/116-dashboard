import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IPaymentEntity } from "@/modules/commerce/domain/entities/IPaymentEntity";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

/**
 * Async thunk to fetch an order's payment record.
 *
 * @description
 * Dispatches `getOrderPaymentUseCase` with the order ID.
 * On success, stores the payment entity in `commerce.getOrderPayment.data`.
 * On failure, stores the backend `Failure` in `commerce.getOrderPayment.error`.
 */
export const getOrderPaymentAction = createAsyncThunk<
    IPaymentEntity,
    string,
    { rejectValue: Failure }
>(ActionType.GetOrderPayment, async (orderId, { rejectWithValue }) => {
    const result = await container.cradle.getOrderPaymentUseCase.execute(orderId);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
