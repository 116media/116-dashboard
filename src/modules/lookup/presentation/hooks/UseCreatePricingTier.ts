import type { FormInstance } from "antd";
import { Form } from "antd";
import { useState } from "react";
import type { ICreatePricingTierCredentials } from "@/modules/lookup/presentation/model/ICreatePricingTierCredentials";
import {
    createPricingTierAction,
    resetCreatePricingTierAction
} from "@/modules/lookup/presentation/store/createpricingtier.action";
import { PricingTiersNotification } from "@/modules/lookup/presentation/utils/notification/lookup.pricing-tiers.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

const { useForm } = Form;

/**
 * Return type for the create pricing tier hook.
 *
 * @interface IUseCreatePricingTier
 */
interface IUseCreatePricingTier {
    form: FormInstance<ICreatePricingTierCredentials>;
    loading: boolean;
    error: Failure | null | undefined;
    success: string | null;
    onSubmit: (values: ICreatePricingTierCredentials) => Promise<void>;
    resetCreate: () => void;
}

/**
 * Custom hook for the create pricing tier form logic.
 *
 * @description
 * Manages form state, submission, and success feedback for
 * creating a new pricing tier. On success, sets a success message
 * and shows a toast notification.
 *
 * @returns Form instance, loading/error state, success message, and submit handler
 */
export const useCreatePricingTier = (onSuccess?: () => void): IUseCreatePricingTier => {
    const dispatch = useAppDispatch();
    const [form] = useForm<ICreatePricingTierCredentials>();
    const [success, setSuccess] = useState<string | null>(null);

    const { loading, error } = useAppSelector(
        ({ lookup: { createPricingTier } }) => createPricingTier
    );

    const onSubmit = async (values: ICreatePricingTierCredentials): Promise<void> => {
        const result = await dispatch(createPricingTierAction(values));

        if (createPricingTierAction.fulfilled.match(result)) {
            setSuccess(PricingTiersNotification.createSuccess.description);
            showNotification(PricingTiersNotification.createSuccess);
            form.resetFields();
            onSuccess?.();
        }
    };

    const resetCreate = () => {
        setSuccess(null);
        form.resetFields();
        dispatch(resetCreatePricingTierAction());
    };

    return { form, loading, error, success, onSubmit, resetCreate };
};
