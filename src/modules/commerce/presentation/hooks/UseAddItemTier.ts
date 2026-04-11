import type { FormInstance } from "antd";
import { Form } from "antd";
import { useState } from "react";
import type { IAddItemTierCredentials } from "@/modules/commerce/presentation/model/IAddItemTierCredentials";
import { addTierToItemAction } from "@/modules/commerce/presentation/store/addtiertoitem.action";
import { OrdersNotification } from "@/modules/commerce/presentation/utils/notification/commerce.orders.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

const { useForm } = Form;

/**
 * Return type for the add item tier hook.
 *
 * @interface IUseAddItemTier
 */
interface IUseAddItemTier {
    form: FormInstance<IAddItemTierCredentials>;
    loading: boolean;
    error: Failure | null | undefined;
    success: string | null;
    onSubmit: (values: IAddItemTierCredentials) => Promise<void>;
    resetAddTier: () => void;
}

/**
 * Custom hook for the add item tier form logic.
 *
 * @description
 * Manages form state, submission, and success feedback for
 * attaching a pricing tier to an order item. On success,
 * shows a toast notification and resets the form.
 *
 * @param orderId - The order UUID
 * @param itemId - The order item UUID to attach the tier to
 * @param onSuccess - Optional callback after successful addition
 * @returns {IUseAddItemTier} Form instance, loading/error state, success message, submit handler, and reset function
 */
export const useAddItemTier = (
    orderId: string | null,
    itemId: string | null,
    onSuccess?: () => void
): IUseAddItemTier => {
    const dispatch = useAppDispatch();
    const [form] = useForm<IAddItemTierCredentials>();
    const [success, setSuccess] = useState<string | null>(null);

    const { loading, error } = useAppSelector(
        ({ commerce: { addTierToItem } }) => addTierToItem
    );

    const onSubmit = async (values: IAddItemTierCredentials): Promise<void> => {
        if (!orderId || !itemId) return;

        const result = await dispatch(
            addTierToItemAction({
                orderId,
                itemId,
                pricingTierId: values.pricingTierId
            })
        );

        if (addTierToItemAction.fulfilled.match(result)) {
            setSuccess(OrdersNotification.addTierSuccess.description);
            showNotification(OrdersNotification.addTierSuccess);
            form.resetFields();
            onSuccess?.();
        }
    };

    const resetAddTier = () => {
        setSuccess(null);
    };

    return { form, loading, error, success, onSubmit, resetAddTier };
};
