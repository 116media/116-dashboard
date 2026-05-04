import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
    ActionWrapperFulfilled,
    ActionWrapperPending,
    ActionWrapperRejected,
    ActionWrapperReset,
    createInitialState
} from "@/shared/presentation/store/action.wrapper";
import { addItemToOrderAction } from "./additemtoorder.action";
import { addTierToItemAction } from "./addtiertoitem.action";
import { attachPaymentProofAction } from "./attachpaymentproof.action";
import { cancelOrderAction } from "./cancelorder.action";
import { SliceName } from "./constants";
import { createOrderAction } from "./createorder.action";
import { editItemAction } from "./edititem.action";
import { editOrderAction } from "./editorder.action";
import { getCustomerOrdersAction } from "./getcustomerorders.action";
import { getOrderByIdAction } from "./getorderbyid.action";
import { getOrderPaymentAction } from "./getorderpayment.action";
import { listOrdersAction } from "./listorders.action";
import { listPaymentsAction } from "./listpayments.action";
import { listPendingPaymentOrdersAction } from "./listpendingpaymentorders.action";
import { rejectPaymentAction } from "./rejectpayment.action";
import { removeItemAction } from "./removeitem.action";
import { removeItemTierAction } from "./removeitemtier.action";
import { commerceInitialState } from "./state";
import { submitOrderAction } from "./submitorder.action";
import type { CommerceStateKey } from "./type";
import { verifyPaymentAction } from "./verifypayment.action";

/**
 * Redux slice for the commerce module.
 *
 * @description
 * Manages state for 17 async operations using the shared
 * ActionWrapper* reducer helpers. Includes `clear` (single reset)
 * and `purge` (selective reset) reducers.
 */
export const commerceSlice = createSlice({
    name: SliceName.Commerce,
    initialState: commerceInitialState,
    reducers: {
        clear: ActionWrapperReset,
        purge: (state, action: PayloadAction<CommerceStateKey[]>) => {
            for (const key of action.payload) {
                if (state[key]) {
                    (state as Record<string, unknown>)[key] = createInitialState();
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder
            // create order
            .addCase(createOrderAction.pending, ActionWrapperPending)
            .addCase(createOrderAction.fulfilled, ActionWrapperFulfilled)
            .addCase(createOrderAction.rejected, ActionWrapperRejected)
            // add item to order
            .addCase(addItemToOrderAction.pending, ActionWrapperPending)
            .addCase(addItemToOrderAction.fulfilled, ActionWrapperFulfilled)
            .addCase(addItemToOrderAction.rejected, ActionWrapperRejected)
            // add tier to item
            .addCase(addTierToItemAction.pending, ActionWrapperPending)
            .addCase(addTierToItemAction.fulfilled, ActionWrapperFulfilled)
            .addCase(addTierToItemAction.rejected, ActionWrapperRejected)
            // submit order
            .addCase(submitOrderAction.pending, ActionWrapperPending)
            .addCase(submitOrderAction.fulfilled, ActionWrapperFulfilled)
            .addCase(submitOrderAction.rejected, ActionWrapperRejected)
            // cancel order
            .addCase(cancelOrderAction.pending, ActionWrapperPending)
            .addCase(cancelOrderAction.fulfilled, ActionWrapperFulfilled)
            .addCase(cancelOrderAction.rejected, ActionWrapperRejected)
            // attach payment proof
            .addCase(attachPaymentProofAction.pending, ActionWrapperPending)
            .addCase(attachPaymentProofAction.fulfilled, ActionWrapperFulfilled)
            .addCase(attachPaymentProofAction.rejected, ActionWrapperRejected)
            // verify payment
            .addCase(verifyPaymentAction.pending, ActionWrapperPending)
            .addCase(verifyPaymentAction.fulfilled, ActionWrapperFulfilled)
            .addCase(verifyPaymentAction.rejected, ActionWrapperRejected)
            // reject payment
            .addCase(rejectPaymentAction.pending, ActionWrapperPending)
            .addCase(rejectPaymentAction.fulfilled, ActionWrapperFulfilled)
            .addCase(rejectPaymentAction.rejected, ActionWrapperRejected)
            // list orders
            .addCase(listOrdersAction.pending, ActionWrapperPending)
            .addCase(listOrdersAction.fulfilled, ActionWrapperFulfilled)
            .addCase(listOrdersAction.rejected, ActionWrapperRejected)
            // get order by id
            .addCase(getOrderByIdAction.pending, ActionWrapperPending)
            .addCase(getOrderByIdAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getOrderByIdAction.rejected, ActionWrapperRejected)
            // get order payment
            .addCase(getOrderPaymentAction.pending, ActionWrapperPending)
            .addCase(getOrderPaymentAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getOrderPaymentAction.rejected, ActionWrapperRejected)
            // list pending payment orders
            .addCase(listPendingPaymentOrdersAction.pending, ActionWrapperPending)
            .addCase(listPendingPaymentOrdersAction.fulfilled, ActionWrapperFulfilled)
            .addCase(listPendingPaymentOrdersAction.rejected, ActionWrapperRejected)
            // get customer orders
            .addCase(getCustomerOrdersAction.pending, ActionWrapperPending)
            .addCase(getCustomerOrdersAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getCustomerOrdersAction.rejected, ActionWrapperRejected)
            // list payments
            .addCase(listPaymentsAction.pending, ActionWrapperPending)
            .addCase(listPaymentsAction.fulfilled, ActionWrapperFulfilled)
            .addCase(listPaymentsAction.rejected, ActionWrapperRejected)
            // edit order
            .addCase(editOrderAction.pending, ActionWrapperPending)
            .addCase(editOrderAction.fulfilled, ActionWrapperFulfilled)
            .addCase(editOrderAction.rejected, ActionWrapperRejected)
            // remove item
            .addCase(removeItemAction.pending, ActionWrapperPending)
            .addCase(removeItemAction.fulfilled, ActionWrapperFulfilled)
            .addCase(removeItemAction.rejected, ActionWrapperRejected)
            // remove item tier
            .addCase(removeItemTierAction.pending, ActionWrapperPending)
            .addCase(removeItemTierAction.fulfilled, ActionWrapperFulfilled)
            .addCase(removeItemTierAction.rejected, ActionWrapperRejected)
            // edit item
            .addCase(editItemAction.pending, ActionWrapperPending)
            .addCase(editItemAction.fulfilled, ActionWrapperFulfilled)
            .addCase(editItemAction.rejected, ActionWrapperRejected);
    }
});

export default commerceSlice.reducer;
