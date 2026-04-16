import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IAttachPaymentProofData } from "@/modules/commerce/presentation/model/IAttachPaymentProofData";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

/**
 * Async thunk to attach a payment proof to an order.
 *
 * @description
 * Dispatches `attachPaymentProofUseCase` with order ID, file, and payment method.
 * On success, stores the proof metadata in `commerce.attachPaymentProof.data`.
 * On failure, stores the backend `Failure` in `commerce.attachPaymentProof.error`.
 */
export const attachPaymentProofAction = createAsyncThunk<
    { id: string; fileName: string; storageUrl: string },
    { orderId: string; data: IAttachPaymentProofData },
    { rejectValue: Failure }
>(ActionType.AttachPaymentProof, async (params, { rejectWithValue }) => {
    const result = await container.cradle.attachPaymentProofUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
