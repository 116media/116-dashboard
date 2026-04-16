import type { FormInstance } from "antd";
import { Form } from "antd";
import { useState } from "react";
import type { IAddOrderItemCredentials } from "@/modules/commerce/presentation/model/IAddOrderItemCredentials";
import { editItemAction } from "@/modules/commerce/presentation/store/edititem.action";
import { OrdersNotification } from "@/modules/commerce/presentation/utils/notification/commerce.orders.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

const { useForm } = Form;

/**
 * Return type for the edit order item hook.
 *
 * @interface IUseEditOrderItem
 */
interface IUseEditOrderItem {
    form: FormInstance<IAddOrderItemCredentials>;
    loading: boolean;
    error: Failure | null | undefined;
    success: string | null;
    onSubmit: (values: IAddOrderItemCredentials) => Promise<void>;
    resetEdit: () => void;
}

/**
 * Custom hook for the edit order item form logic.
 *
 * @description
 * Manages form state, submission, and success feedback for
 * editing a content item's properties on a draft order.
 *
 * @param orderId - The order UUID
 * @param itemId - The item UUID to edit
 * @param onSuccess - Optional callback after successful edit
 * @returns {IUseEditOrderItem} Form instance, loading/error state, submit handler, and reset function
 */
export const useEditOrderItem = (
    orderId: string | null,
    itemId: string | null,
    onSuccess?: () => void
): IUseEditOrderItem => {
    const dispatch = useAppDispatch();
    const [form] = useForm<IAddOrderItemCredentials>();
    const [success, setSuccess] = useState<string | null>(null);

    const { loading, error } = useAppSelector(({ commerce: { editItem } }) => editItem);

    const onSubmit = async (values: IAddOrderItemCredentials): Promise<void> => {
        if (!orderId || !itemId) return;

        const result = await dispatch(
            editItemAction({
                orderId,
                itemId,
                data: {
                    contentKind: values.contentKind,
                    categoryId: values.categoryId,
                    promotionLevelId: values.promotionLevelId,
                    socialBoost: values.socialBoost,
                    isBonus: values.isBonus
                }
            })
        );

        if (editItemAction.fulfilled.match(result)) {
            setSuccess(OrdersNotification.editItemSuccess.description);
            showNotification(OrdersNotification.editItemSuccess);
            onSuccess?.();
        }
    };

    const resetEdit = () => {
        setSuccess(null);
    };

    return { form, loading, error, success, onSubmit, resetEdit };
};
