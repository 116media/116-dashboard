import type { FormInstance } from "antd";
import { Form } from "antd";
import { useState } from "react";
import type { ICreateRoleCredentials } from "@/modules/roles/presentation/model/ICreateRoleCredentials";
import { createRoleAction } from "@/modules/roles/presentation/store/create.action";
import { RolesNotification } from "@/modules/roles/presentation/utils/notification/roles.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

const { useForm } = Form;

/**
 * Return type for the create role hook.
 *
 * @interface IUseCreateRole
 */
interface IUseCreateRole {
    form: FormInstance<ICreateRoleCredentials>;
    loading: boolean;
    error: Failure | null | undefined;
    success: string | null;
    onSubmit: (values: ICreateRoleCredentials) => Promise<void>;
    resetCreate: () => void;
}

/**
 * Custom hook for the create role form logic.
 *
 * @description
 * Manages form state, submission, and success feedback for
 * creating a new role. On success, sets a success message
 * and shows a toast notification.
 *
 * @returns Form instance, loading/error state, success message, and submit handler
 */
export const useCreateRole = (): IUseCreateRole => {
    const dispatch = useAppDispatch();
    const [form] = useForm<ICreateRoleCredentials>();
    const [success, setSuccess] = useState<string | null>(null);

    const { loading, error } = useAppSelector(({ roles: { create } }) => create);

    const onSubmit = async (values: ICreateRoleCredentials): Promise<void> => {
        const result = await dispatch(createRoleAction(values));

        if (createRoleAction.fulfilled.match(result)) {
            setSuccess(RolesNotification.createSuccess.description);
            showNotification(RolesNotification.createSuccess);
            form.resetFields();
        }
    };

    const resetCreate = () => {
        setSuccess(null);
    };

    return { form, loading, error, success, onSubmit, resetCreate };
};
