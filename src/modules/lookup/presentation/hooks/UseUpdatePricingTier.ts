import type { FormInstance } from "antd";
import { Form } from "antd";
import { useEffect, useState } from "react";
import type { IPricingTierEntity } from "@/modules/lookup/domain/entities/IPricingTierEntity";
import type { IUpdatePricingTierCredentials } from "@/modules/lookup/presentation/model/IUpdatePricingTierCredentials";
import { updatePricingTierAction } from "@/modules/lookup/presentation/store/updatepricingtier.action";
import { PricingTiersNotification } from "@/modules/lookup/presentation/utils/notification/lookup.pricing-tiers.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

const { useForm } = Form;

/**
 * Return type for the update pricing tier hook.
 *
 * @interface IUseUpdatePricingTier
 */
interface IUseUpdatePricingTier {
    form: FormInstance<IUpdatePricingTierCredentials>;
    loading: boolean;
    error: Failure | null | undefined;
    success: string | null;
    onSubmit: (values: IUpdatePricingTierCredentials) => Promise<void>;
    resetUpdate: () => void;
}

/**
 * Custom hook for the edit pricing tier form logic.
 *
 * @description
 * Manages form state, pre-population from initial values,
 * submission, and success feedback for updating a pricing tier.
 *
 * @param pricingTier - The pricing tier to edit (used for pre-population and ID)
 * @returns Form instance, loading/error state, success message, and submit handler
 */
export const useUpdatePricingTier = (
    pricingTier: IPricingTierEntity | null,
    onSuccess?: () => void
): IUseUpdatePricingTier => {
    const dispatch = useAppDispatch();
    const [form] = useForm<IUpdatePricingTierCredentials>();
    const [success, setSuccess] = useState<string | null>(null);

    const { loading, error } = useAppSelector(
        ({ lookup: { updatePricingTier } }) => updatePricingTier
    );

    useEffect(() => {
        if (pricingTier) {
            form.setFieldsValue({
                name: pricingTier.name,
                description: pricingTier.description ?? undefined
            });
        }
    }, [pricingTier, form]);

    const onSubmit = async (values: IUpdatePricingTierCredentials): Promise<void> => {
        if (!pricingTier) return;

        const result = await dispatch(
            updatePricingTierAction({ id: pricingTier.id, data: values })
        );

        if (updatePricingTierAction.fulfilled.match(result)) {
            setSuccess(PricingTiersNotification.updateSuccess.description);
            showNotification(PricingTiersNotification.updateSuccess);
            onSuccess?.();
        }
    };

    const resetUpdate = () => {
        setSuccess(null);
        form.resetFields();
    };

    return { form, loading, error, success, onSubmit, resetUpdate };
};
