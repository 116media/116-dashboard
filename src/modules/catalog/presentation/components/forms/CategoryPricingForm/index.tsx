import type { FormInstance } from "antd";
import { Form, InputNumber, Select } from "antd";
import { type FC, useMemo } from "react";
import type { IAddCategoryPricingCredentials } from "@/modules/catalog/presentation/model/IAddCategoryPricingCredentials";
import type { IPricingTierEntity } from "@/modules/lookup/domain/entities/IPricingTierEntity";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppSelector } from "@/shared/presentation/store/store";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";

const { Item } = Form;

/**
 * Props for the CategoryPricingForm component.
 *
 * @interface ICategoryPricingFormProps
 * @property {FormInstance} form - Ant Design form instance
 * @property {Failure | null | undefined} error - API error to display
 * @property {(values: IAddCategoryPricingCredentials) => void} onSubmit - Form submission handler
 */
interface ICategoryPricingFormProps {
    form: FormInstance;
    error: Failure | null | undefined;
    onSubmit: (values: IAddCategoryPricingCredentials) => void;
}

/**
 * Form for adding a pricing tier to a category.
 *
 * @component
 *
 * @description
 * Renders pricingTierId and priceUsd fields. This is always a
 * create-only form — no edit mode or initial values are needed.
 * The pricingTierId field is a simple Input for now, to be
 * replaced with a Select component later. Displays API errors
 * via `ErrorAlert`.
 *
 * @param {ICategoryPricingFormProps} props - Component props
 * @returns {JSX.Element} The category pricing form
 */
const CategoryPricingForm: FC<ICategoryPricingFormProps> = ({ form, error, onSubmit }) => {
    const { data: pricingTiers } = useAppSelector(
        ({ lookup: { getPricingTiers } }) => getPricingTiers
    );

    const pricingTierOptions = useMemo(
        () =>
            ((pricingTiers as IPricingTierEntity[]) ?? [])
                .filter((pt) => pt.isActive)
                .map((pt) => ({ label: pt.name, value: pt.id })),
        [pricingTiers]
    );

    return (
        <Form
            form={form}
            size="large"
            layout="vertical"
            onFinish={onSubmit}
            name="category_pricing_form"
            validateTrigger={["onSubmit", "onBlur"]}
        >
            <ErrorAlert error={error} showIcon closable banner={false} />

            <Item
                name="pricingTierId"
                label="Niveau tarifaire"
                rules={[{ required: true, message: "Niveau tarifaire est requis" }]}
            >
                <Select
                    showSearch
                    optionFilterProp="label"
                    options={pricingTierOptions}
                    placeholder="Sélectionner un niveau tarifaire"
                />
            </Item>

            <Item
                name="priceUsd"
                label="Prix (USD)"
                rules={[
                    { required: true, message: "Prix en USD est requis" },
                    {
                        type: "number",
                        min: 0,
                        message: "Prix en USD doit être supérieur ou égal à 0"
                    }
                ]}
            >
                <InputNumber
                    min={0}
                    step={0.5}
                    placeholder="Prix en USD"
                    style={{ width: "100%" }}
                />
            </Item>
        </Form>
    );
};

export default CategoryPricingForm;
