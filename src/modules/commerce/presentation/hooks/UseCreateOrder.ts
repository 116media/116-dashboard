import type { FormInstance } from "antd";
import { Form } from "antd";
import { useState } from "react";
import type { ICreateOrderCredentials } from "@/modules/commerce/presentation/model/ICreateOrderCredentials";
import { createOrderAction } from "@/modules/commerce/presentation/store/createorder.action";
import { OrdersNotification } from "@/modules/commerce/presentation/utils/notification/commerce.orders.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

const { useForm } = Form;

/**
 * Return type for the create order hook.
 *
 * @interface IUseCreateOrder
 */
interface IUseCreateOrder {
    form: FormInstance<ICreateOrderCredentials>;
    loading: boolean;
    error: Failure | null | undefined;
    success: string | null;
    onSubmit: (values: ICreateOrderCredentials) => Promise<void>;
    resetCreate: () => void;
}

/**
 * Custom hook for the create order form logic.
 *
 * @description
 * Manages form state, submission, and success feedback for
 * creating a new order. On success, sets a success message
 * and shows a toast notification.
 *
 * @returns {IUseCreateOrder} Form instance, loading/error state, success message, submit handler, and reset function
 */
export const useCreateOrder = (onSuccess?: () => void): IUseCreateOrder => {
    const dispatch = useAppDispatch();
    const [form] = useForm<ICreateOrderCredentials>();
    const [success, setSuccess] = useState<string | null>(null);

    const { loading, error } = useAppSelector(({ commerce: { createOrder } }) => createOrder);

    const onSubmit = async (values: ICreateOrderCredentials): Promise<void> => {
        const result = await dispatch(
            createOrderAction({
                customerId: values.customerId,
                packageId: values.packageId
            })
        );

        if (createOrderAction.fulfilled.match(result)) {
            setSuccess(OrdersNotification.createSuccess.description);
            showNotification(OrdersNotification.createSuccess);
            form.resetFields();
            onSuccess?.();
        }
    };

    const resetCreate = () => {
        setSuccess(null);
    };

    return { form, loading, error, success, onSubmit, resetCreate };
};
