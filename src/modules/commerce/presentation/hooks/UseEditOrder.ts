import type { FormInstance } from "antd";
import { Form } from "antd";
import { useState } from "react";
import type { ICreateOrderCredentials } from "@/modules/commerce/presentation/model/ICreateOrderCredentials";
import { editOrderAction } from "@/modules/commerce/presentation/store/editorder.action";
import { OrdersNotification } from "@/modules/commerce/presentation/utils/notification/commerce.orders.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

const { useForm } = Form;

/**
 * Return type for the edit order hook.
 *
 * @interface IUseEditOrder
 */
interface IUseEditOrder {
    form: FormInstance<ICreateOrderCredentials>;
    loading: boolean;
    error: Failure | null | undefined;
    success: string | null;
    onSubmit: (values: ICreateOrderCredentials) => Promise<void>;
    resetEdit: () => void;
}

/**
 * Custom hook for the edit order form logic.
 *
 * @description
 * Manages form state, submission, and success feedback for
 * editing an existing order's customer and package.
 *
 * @param orderId - The order UUID to edit
 * @param onSuccess - Optional callback after successful edit
 * @returns {IUseEditOrder} Form instance, loading/error state, submit handler, and reset function
 */
export const useEditOrder = (orderId: string | null, onSuccess?: () => void): IUseEditOrder => {
    const dispatch = useAppDispatch();
    const [form] = useForm<ICreateOrderCredentials>();
    const [success, setSuccess] = useState<string | null>(null);

    const { loading, error } = useAppSelector(({ commerce: { editOrder } }) => editOrder);

    const onSubmit = async (values: ICreateOrderCredentials): Promise<void> => {
        if (!orderId) return;

        const result = await dispatch(
            editOrderAction({
                id: orderId,
                customerId: values.customerId,
                packageId: values.packageId
            })
        );

        if (editOrderAction.fulfilled.match(result)) {
            setSuccess(OrdersNotification.editOrderSuccess.description);
            showNotification(OrdersNotification.editOrderSuccess);
            onSuccess?.();
        }
    };

    const resetEdit = () => {
        setSuccess(null);
    };

    return { form, loading, error, success, onSubmit, resetEdit };
};
