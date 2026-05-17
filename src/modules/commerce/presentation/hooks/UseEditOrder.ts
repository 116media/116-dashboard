import type { FormInstance } from "antd";
import { Form } from "antd";
import { useEffect, useState } from "react";
import type { IOrderDetailEntity } from "@/modules/commerce/domain/entities/IOrderDetailEntity";
import type { ICreateOrderCredentials } from "@/modules/commerce/presentation/model/ICreateOrderCredentials";
import {
    editOrderAction,
    resetEditOrderAction
} from "@/modules/commerce/presentation/store/editorder.action";
import { OrdersNotification } from "@/modules/commerce/presentation/utils/notification/commerce.orders.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

const { useForm } = Form;

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
 * Pre-fills the form with the current order's customer by
 * reverse-looking up the customer ID from the name.
 *
 * @param orderId - The order UUID to edit
 * @param order - The current order entity for pre-filling
 * @param onSuccess - Optional callback after successful edit
 */
export const useEditOrder = (
    orderId: string | null,
    order: IOrderDetailEntity | null,
    onSuccess?: () => void
): IUseEditOrder => {
    const dispatch = useAppDispatch();
    const [form] = useForm<ICreateOrderCredentials>();
    const [success, setSuccess] = useState<string | null>(null);

    const { loading, error } = useAppSelector(({ commerce: { editOrder } }) => editOrder);

    useEffect(() => {
        if (!order) return;

        form.setFieldsValue({
            customerId: order.customerId,
            packageId: order.packageId
        });
    }, [order, form]);

    const onSubmit = async (values: ICreateOrderCredentials): Promise<void> => {
        if (!orderId) return;

        const result = await dispatch(
            editOrderAction({
                id: orderId,
                data: {
                    customerId: values.customerId,
                    packageId: values.packageId
                }
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
        form.resetFields();
        dispatch(resetEditOrderAction());
    };

    return { form, loading, error, success, onSubmit, resetEdit };
};
