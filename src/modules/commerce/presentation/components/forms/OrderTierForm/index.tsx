import type { FormInstance } from "antd";
import { Form, Select } from "antd";
import type { FC } from "react";
import { useMemo } from "react";
import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";
import type { IAddItemTierCredentials } from "@/modules/commerce/presentation/model/IAddItemTierCredentials";
import { OrderItemsValidator } from "@/modules/commerce/presentation/utils/validators/commerce.orderitems.validator";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppSelector } from "@/shared/presentation/store/store";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";
import { SelectOptionDetail } from "@/shared/presentation/ui/SelectOptions";

const { Item } = Form;

/**
 * Props for the OrderTierForm component.
 *
 * @interface IOrderTierFormProps
 * @property {FormInstance} form - Ant Design form instance for field control
 * @property {Failure | null | undefined} error - Backend error to display in the alert
 * @property {string | null} categoryName - Category name of the item to filter available tiers
 * @property {(values: IAddItemTierCredentials) => void} onSubmit - Callback when the form is submitted
 */
interface IOrderTierFormProps {
    form: FormInstance;
    error: Failure | null | undefined;
    categoryName: string | null;
    onSubmit: (values: IAddItemTierCredentials) => void;
}

/**
 * Form for attaching a pricing tier to an order item.
 *
 * @component
 *
 * @description
 * Renders a pricing tier select filtered by the item's category.
 * Only shows tiers that are configured for the category, with
 * their price in USD.
 *
 * @param {IOrderTierFormProps} props - Component props
 * @returns {JSX.Element} The rendered order tier form
 */
const OrderTierForm: FC<IOrderTierFormProps> = ({ form, error, categoryName, onSubmit }) => {
    const { data: categories } = useAppSelector(
        ({ catalog: { getAllCategories } }) => getAllCategories
    );

    const pricingTierOptions = useMemo(() => {
        if (!categoryName) return [];

        const allCategories = (categories as { items: ICategoryEntity[] })?.items ?? [];
        const category = allCategories.find((c) => c.name === categoryName);

        if (!category) return [];

        return category.pricing.map((p) => ({
            label: p.tierName,
            value: p.tierId,
            secondary: `$${p.priceUsd.toFixed(2)}`
        }));
    }, [categories, categoryName]);

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
                    options={pricingTierOptions}
                    optionRender={SelectOptionDetail}
                    placeholder="Sélectionner une tranche"
                    notFoundContent={
                        categoryName
                            ? "Aucune tranche configurée pour cette catégorie"
                            : "Catégorie inconnue"
                    }
                />
            </Item>
        </Form>
    );
};

export default OrderTierForm;
