import type { FormInstance } from "antd";
import { Form } from "antd";
import { useEffect, useState } from "react";
import type { ICustomerEntity } from "@/modules/catalog/domain/entities/ICustomerEntity";
import type { IUpdateCustomerCredentials } from "@/modules/catalog/presentation/model/IUpdateCustomerCredentials";
import {
    resetUpdateCustomerAction,
    updateCustomerAction
} from "@/modules/catalog/presentation/store/updatecustomer.action";
import { CustomersNotification } from "@/modules/catalog/presentation/utils/notification/catalog.customers.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

const { useForm } = Form;

/**
 * Return type for the update customer hook.
 *
 * @interface IUseUpdateCustomer
 */
interface IUseUpdateCustomer {
    form: FormInstance<IUpdateCustomerCredentials>;
    loading: boolean;
    error: Failure | null | undefined;
    success: string | null;
    onSubmit: (values: IUpdateCustomerCredentials) => Promise<void>;
    resetUpdate: () => void;
}

/**
 * Custom hook for the edit customer form logic.
 *
 * @description
 * Manages form state, pre-population from initial values,
 * submission, and success feedback for updating a customer.
 *
 * @param customer - The customer to edit (used for pre-population and ID)
 * @returns Form instance, loading/error state, success message, and submit handler
 */
export const useUpdateCustomer = (
    customer: ICustomerEntity | null,
    onSuccess?: () => void
): IUseUpdateCustomer => {
    const dispatch = useAppDispatch();
    const [form] = useForm<IUpdateCustomerCredentials>();
    const [success, setSuccess] = useState<string | null>(null);

    const { loading, error } = useAppSelector(({ catalog: { updateCustomer } }) => updateCustomer);

    useEffect(() => {
        if (customer) {
            form.setFieldsValue({
                fullName: customer.fullName,
                email: customer.email,
                phone: customer.phone ?? undefined,
                company: customer.company ?? undefined,
                notes: customer.notes ?? undefined
            });
        }
    }, [customer, form]);

    const onSubmit = async (values: IUpdateCustomerCredentials): Promise<void> => {
        if (!customer) return;

        const result = await dispatch(updateCustomerAction({ id: customer.id, data: values }));

        if (updateCustomerAction.fulfilled.match(result)) {
            setSuccess(CustomersNotification.updateSuccess.description);
            showNotification(CustomersNotification.updateSuccess);
            onSuccess?.();
        }
    };

    const resetUpdate = () => {
        setSuccess(null);
        form.resetFields();
        dispatch(resetUpdateCustomerAction());
        form.resetFields();
    };

    return { form, loading, error, success, onSubmit, resetUpdate };
};
