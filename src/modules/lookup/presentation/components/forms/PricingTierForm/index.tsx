import type { FormInstance } from "antd";
import { Form, Input } from "antd";
import type { FC } from "react";
import { useEffect } from "react";
import type { IPricingTierEntity } from "@/modules/lookup/domain/entities/IPricingTierEntity";
import type { ICreatePricingTierCredentials } from "@/modules/lookup/presentation/model/ICreatePricingTierCredentials";
import { PricingTiersValidator } from "@/modules/lookup/presentation/utils/validators/lookup.pricing-tiers.validator";
import type { Failure } from "@/shared/domain/failures/failure";
import type { FormContext } from "@/shared/domain/types/pagination";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";

const { Item } = Form;
const { TextArea } = Input;

/**
 * Props for the PricingTierForm component.
 *
 * @interface IPricingTierFormProps
 * @property {FormInstance} form - Ant Design form instance
 * @property {Failure | null | undefined} error - API error to display
 * @property {FormContext} formContext - "CREATE" or "EDIT" mode
 * @property {IPricingTierEntity} [initialValues] - Pre-populated values for edit mode
 */
interface IPricingTierFormProps {
    form: FormInstance;
    formContext: FormContext;
    error: Failure | null | undefined;
    initialValues?: IPricingTierEntity | null;
    onSubmit: (values: ICreatePricingTierCredentials) => void;
}

/**
 * Shared form for creating and editing pricing tiers.
 *
 * @component
 *
 * @description
 * Renders name and description fields with client-side validation
 * matching the backend constraints. Pre-populates from `initialValues`
 * when in EDIT mode. Displays API errors via `ErrorAlert`.
 *
 * @param {IPricingTierFormProps} props - Component props
 * @returns {JSX.Element} The pricing tier form
 */
const PricingTierForm: FC<IPricingTierFormProps> = ({
    form,
    error,
    formContext,
    initialValues,
    onSubmit
}) => {
    useEffect(() => {
        if (formContext === "EDIT" && initialValues) {
            form.setFieldsValue({
                name: initialValues.name,
                description: initialValues.description
            });
        }
    }, [formContext, initialValues, form]);

    return (
        <Form
            form={form}
            size="large"
            layout="vertical"
            onFinish={onSubmit}
            name="pricing_tier_form"
            validateTrigger={["onSubmit", "onBlur"]}
        >
            <ErrorAlert error={error} showIcon closable banner={false} />

            <Item name="name" label="Nom" rules={PricingTiersValidator.name("Nom")}>
                <Input maxLength={50} placeholder="Nom du niveau tarifaire" />
            </Item>

            <Item
                name="description"
                label="Description"
                rules={PricingTiersValidator.description("Description")}
            >
                <TextArea
                    showCount
                    maxLength={300}
                    placeholder="Description du niveau tarifaire"
                    autoSize={{ minRows: 3 }}
                />
            </Item>
        </Form>
    );
};

export default PricingTierForm;
