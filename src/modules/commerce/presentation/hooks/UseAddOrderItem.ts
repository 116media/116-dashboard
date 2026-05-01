import type { FormInstance } from "antd";
import { Form } from "antd";
import { useState } from "react";
import type { IAddOrderItemCredentials } from "@/modules/commerce/presentation/model/IAddOrderItemCredentials";
import { addItemToOrderAction } from "@/modules/commerce/presentation/store/additemtoorder.action";
import { OrdersNotification } from "@/modules/commerce/presentation/utils/notification/commerce.orders.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

const { useForm } = Form;

/**
 * Return type for the add order item hook.
 *
 * @interface IUseAddOrderItem
 */
interface IUseAddOrderItem {
    form: FormInstance<IAddOrderItemCredentials>;
    loading: boolean;
    error: Failure | null | undefined;
    success: string | null;
    onSubmit: (values: IAddOrderItemCredentials) => Promise<void>;
    resetAddItem: () => void;
}

/**
 * Custom hook for the add order item form logic.
 *
 * @description
 * Manages form state, submission, and success feedback for
 * adding a content item to an order. On success, shows a
 * toast notification and resets the form.
 *
 * @param orderId - The order UUID to add the item to
 * @param onSuccess - Optional callback after successful addition
 * @returns {IUseAddOrderItem} Form instance, loading/error state, success message, submit handler, and reset function
 */
export const useAddOrderItem = (
    orderId: string | null,
    onSuccess?: () => void
): IUseAddOrderItem => {
    const dispatch = useAppDispatch();
    const [form] = useForm<IAddOrderItemCredentials>();
    const [success, setSuccess] = useState<string | null>(null);

    const { loading, error } = useAppSelector(({ commerce: { addItemToOrder } }) => addItemToOrder);

    const onSubmit = async (values: IAddOrderItemCredentials): Promise<void> => {
        if (!orderId) return;

        const result = await dispatch(addItemToOrderAction({ orderId, ...values }));

        if (addItemToOrderAction.fulfilled.match(result)) {
            setSuccess(OrdersNotification.addItemSuccess.description);
            showNotification(OrdersNotification.addItemSuccess);
            form.resetFields();
            onSuccess?.();
        }
    };

    const resetAddItem = () => {
        setSuccess(null);
    };

    return { form, loading, error, success, onSubmit, resetAddItem };
};
