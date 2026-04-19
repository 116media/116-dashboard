import type { FormInstance } from "antd";
import { Form } from "antd";
import { useEffect, useState } from "react";
import type { IRoleEntity } from "@/modules/roles/domain/entities/IRole";
import type { IUpdateRoleCredentials } from "@/modules/roles/presentation/model/IUpdateRoleCredentials";
import { updateRoleAction } from "@/modules/roles/presentation/store/update.action";
import { RolesNotification } from "@/modules/roles/presentation/utils/notification/roles.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

const { useForm } = Form;

/**
 * Return type for the update role hook.
 *
 * @interface IUseUpdateRole
 */
interface IUseUpdateRole {
    form: FormInstance<IUpdateRoleCredentials>;
    loading: boolean;
    error: Failure | null | undefined;
    success: string | null;
    onSubmit: (values: IUpdateRoleCredentials) => Promise<void>;
    resetUpdate: () => void;
}

/**
 * Custom hook for the edit role form logic.
 *
 * @description
 * Manages form state, pre-population from initial values,
 * submission, and success feedback for updating a role.
 *
 * @param role - The role to edit (used for pre-population and ID)
 * @returns Form instance, loading/error state, success message, and submit handler
 */
export const useUpdateRole = (role: IRoleEntity | null): IUseUpdateRole => {
    const dispatch = useAppDispatch();
    const [form] = useForm<IUpdateRoleCredentials>();
    const [success, setSuccess] = useState<string | null>(null);

    const { loading, error } = useAppSelector(({ roles: { update } }) => update);

    useEffect(() => {
        if (role) {
            form.setFieldsValue({
                name: role.name,
                description: role.description
            });
        }
    }, [role, form]);

    const onSubmit = async (values: IUpdateRoleCredentials): Promise<void> => {
        if (!role) return;

        const result = await dispatch(updateRoleAction({ id: role.id, data: values }));

        if (updateRoleAction.fulfilled.match(result)) {
            setSuccess(RolesNotification.updateSuccess.description);
            showNotification(RolesNotification.updateSuccess);
        }
    };

    const resetUpdate = () => {
        setSuccess(null);
        form.resetFields();
    };

    return { form, loading, error, success, onSubmit, resetUpdate };
};
