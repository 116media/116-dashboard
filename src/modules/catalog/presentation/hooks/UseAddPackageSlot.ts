import type { FormInstance } from "antd";
import { Form } from "antd";
import { useState } from "react";
import type { IAddPackageSlotCredentials } from "@/modules/catalog/presentation/model/IAddPackageSlotCredentials";
import { addPackageSlotAction } from "@/modules/catalog/presentation/store/addpackageslot.action";
import { PackagesNotification } from "@/modules/catalog/presentation/utils/notification/catalog.packages.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

const { useForm } = Form;

/**
 * Return type for the add package slot hook.
 *
 * @interface IUseAddPackageSlot
 */
interface IUseAddPackageSlot {
    form: FormInstance<IAddPackageSlotCredentials>;
    loading: boolean;
    error: Failure | null | undefined;
    success: string | null;
    onSubmit: (values: IAddPackageSlotCredentials) => Promise<void>;
    resetAdd: () => void;
}

/**
 * Custom hook for the add package slot form logic.
 *
 * @description
 * Manages form state, submission, and success feedback for
 * adding a slot to a package. On success, sets a success
 * message and shows a toast notification.
 *
 * @param packageId - The package to add a slot to
 * @returns Form instance, loading/error state, success message, and submit handler
 */
export const useAddPackageSlot = (
    packageId: string | null,
    onSuccess?: () => void
): IUseAddPackageSlot => {
    const dispatch = useAppDispatch();
    const [form] = useForm<IAddPackageSlotCredentials>();
    const [success, setSuccess] = useState<string | null>(null);

    const { loading, error } = useAppSelector(({ catalog: { addPackageSlot } }) => addPackageSlot);

    const onSubmit = async (values: IAddPackageSlotCredentials): Promise<void> => {
        if (!packageId) return;

        const result = await dispatch(addPackageSlotAction({ packageId, data: values }));

        if (addPackageSlotAction.fulfilled.match(result)) {
            setSuccess(PackagesNotification.addSlotSuccess.description);
            showNotification(PackagesNotification.addSlotSuccess);
            form.resetFields();
            onSuccess?.();
        }
    };

    const resetAdd = () => {
        setSuccess(null);
    };

    return { form, loading, error, success, onSubmit, resetAdd };
};
