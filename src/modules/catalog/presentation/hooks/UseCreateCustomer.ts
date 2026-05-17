import type { FormInstance } from "antd";
import { Form } from "antd";
import { useState } from "react";
import type { ICreateCustomerCredentials } from "@/modules/catalog/presentation/model/ICreateCustomerCredentials";
import {
    createCustomerAction,
    resetCreateCustomerAction
} from "@/modules/catalog/presentation/store/createcustomer.action";
import { CustomersNotification } from "@/modules/catalog/presentation/utils/notification/catalog.customers.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

const { useForm } = Form;

/**
 * Return type for the create customer hook.
 *
 * @interface IUseCreateCustomer
 */
interface IUseCreateCustomer {
    form: FormInstance<ICreateCustomerCredentials>;
    loading: boolean;
    error: Failure | null | undefined;
    success: string | null;
    onSubmit: (values: ICreateCustomerCredentials) => Promise<void>;
    resetCreate: () => void;
}

/**
 * Custom hook for the create customer form logic.
 *
 * @description
 * Manages form state, submission, and success feedback for
 * creating a new customer. On success, sets a success message
 * and shows a toast notification.
 *
 * @returns Form instance, loading/error state, success message, and submit handler
 */
export const useCreateCustomer = (onSuccess?: () => void): IUseCreateCustomer => {
    const dispatch = useAppDispatch();
    const [form] = useForm<ICreateCustomerCredentials>();
    const [success, setSuccess] = useState<string | null>(null);

    const { loading, error } = useAppSelector(({ catalog: { createCustomer } }) => createCustomer);

    const onSubmit = async (values: ICreateCustomerCredentials): Promise<void> => {
        const result = await dispatch(createCustomerAction(values));

        if (createCustomerAction.fulfilled.match(result)) {
            setSuccess(CustomersNotification.createSuccess.description);
            showNotification(CustomersNotification.createSuccess);
            form.resetFields();
            onSuccess?.();
        }
    };

    const resetCreate = () => {
        setSuccess(null);
        form.resetFields();
        dispatch(resetCreateCustomerAction());
    };

    return { form, loading, error, success, onSubmit, resetCreate };
};
