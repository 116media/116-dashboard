import type { FormInstance } from "antd";
import { Checkbox, Form, Select } from "antd";
import type { FC } from "react";
import { useMemo } from "react";
import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";
import type { IAddOrderItemCredentials } from "@/modules/commerce/presentation/model/IAddOrderItemCredentials";
import { OrderItemsValidator } from "@/modules/commerce/presentation/utils/validators/commerce.orderitems.validator";
import type { IPromotionLevelEntity } from "@/modules/lookup/domain/entities/IPromotionLevelEntity";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppSelector } from "@/shared/presentation/store/store";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";

const { Item } = Form;

/**
 * Props for the OrderItemForm component.
 *
 * @interface IOrderItemFormProps
 * @property {FormInstance} form - Ant Design form instance for field control
 * @property {Failure | null | undefined} error - Backend error to display in the alert
 * @property {(values: IAddOrderItemCredentials) => void} onSubmit - Callback when the form is submitted
 */
interface IOrderItemFormProps {
    form: FormInstance;
    error: Failure | null | undefined;
    onSubmit: (values: IAddOrderItemCredentials) => void;
}

const CONTENT_KIND_OPTIONS = [
    { value: "Article", label: "Article" },
    { value: "Video", label: "Vidéo" },
    { value: "Short", label: "Short" },
    { value: "PhotoShoot", label: "Shooting Photo" }
];

/**
 * Form for adding a content item to an order.
 *
 * @component
 *
 * @description
 * Renders content kind, category, promotion level selects and
 * social boost / bonus checkboxes. Category and promotion level
 * options are loaded from the catalog and lookup stores.
 *
 * @param {IOrderItemFormProps} props - Component props
 * @returns {JSX.Element} The rendered order item form
 */
const OrderItemForm: FC<IOrderItemFormProps> = ({ form, error, onSubmit }) => {
    const { data: categories } = useAppSelector(
        ({ catalog: { getAllCategories } }) => getAllCategories
    );
    const { data: promotionLevels } = useAppSelector(
        ({ lookup: { getPromotionLevels } }) => getPromotionLevels
    );

    const categoryOptions = useMemo(
        () =>
            ((categories as { items: ICategoryEntity[] })?.items ?? [])
                .filter((c) => c.isActive)
                .map((c) => ({ label: c.name, value: c.id })),
        [categories]
    );

    const promotionLevelOptions = useMemo(
        () =>
            ((promotionLevels as IPromotionLevelEntity[]) ?? [])
                .filter((pl) => pl.isActive)
                .map((pl) => ({ label: pl.name, value: pl.id })),
        [promotionLevels]
    );

    return (
        <Form
            form={form}
            size="large"
            layout="vertical"
            onFinish={onSubmit}
            name="order_item_form"
            validateTrigger={["onSubmit", "onBlur"]}
            initialValues={{ socialBoost: false, isBonus: false }}
        >
            <ErrorAlert error={error} showIcon closable banner={false} />

            <Item
                name="contentKind"
                label="Type de contenu"
                rules={OrderItemsValidator.contentKind("Type de contenu")}
            >
                <Select options={CONTENT_KIND_OPTIONS} placeholder="Sélectionner un type" />
            </Item>

            <Item
                name="categoryId"
                label="Catégorie"
                rules={OrderItemsValidator.categoryId("Catégorie")}
            >
                <Select
                    showSearch
                    optionFilterProp="label"
                    options={categoryOptions}
                    placeholder="Sélectionner une catégorie"
                />
            </Item>

            <Item name="promotionLevelId" label="Niveau de promotion">
                <Select
                    showSearch
                    allowClear
                    optionFilterProp="label"
                    options={promotionLevelOptions}
                    placeholder="Sélectionner un niveau"
                />
            </Item>

            <Item name="socialBoost" valuePropName="checked">
                <Checkbox>Boost social</Checkbox>
            </Item>

            <Item name="isBonus" valuePropName="checked">
                <Checkbox>Bonus</Checkbox>
            </Item>
        </Form>
    );
};

export default OrderItemForm;
