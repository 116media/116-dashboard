import type { FormInstance } from "antd";
import { Form, Select } from "antd";
import type { FC } from "react";
import { useMemo } from "react";
import type { IAddItemTierCredentials } from "@/modules/commerce/presentation/model/IAddItemTierCredentials";
import { OrderItemsValidator } from "@/modules/commerce/presentation/utils/validators/commerce.orderitems.validator";
import type { IPricingTierEntity } from "@/modules/lookup/domain/entities/IPricingTierEntity";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppSelector } from "@/shared/presentation/store/store";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";

const { Item } = Form;

/**
 * Props for the OrderTierForm component.
 *
 * @interface IOrderTierFormProps
 * @property {FormInstance} form - Ant Design form instance for field control
 * @property {Failure | null | undefined} error - Backend error to display in the alert
 * @property {(values: IAddItemTierCredentials) => void} onSubmit - Callback when the form is submitted
 */
interface IOrderTierFormProps {
    form: FormInstance;
    error: Failure | null | undefined;
    onSubmit: (values: IAddItemTierCredentials) => void;
}

/**
 * Form for attaching a pricing tier to an order item.
 *
 * @component
 *
 * @description
 * Renders a pricing tier select field. Tier options are loaded
 * from the lookup store.
 *
 * @param {IOrderTierFormProps} props - Component props
 * @returns {JSX.Element} The rendered order tier form
 */
const OrderTierForm: FC<IOrderTierFormProps> = ({ form, error, onSubmit }) => {
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
            name="order_tier_form"
            validateTrigger={["onSubmit", "onBlur"]}
        >
            <ErrorAlert error={error} showIcon closable banner={false} />

            <Item
                name="pricingTierId"
                label="Tranche tarifaire"
                rules={OrderItemsValidator.pricingTierId("Tranche tarifaire")}
            >
                <Select
                    showSearch
                    optionFilterProp="label"
                    options={pricingTierOptions}
                    placeholder="Sélectionner une tranche"
                />
            </Item>
        </Form>
    );
};

export default OrderTierForm;
