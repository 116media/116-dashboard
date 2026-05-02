import type { FormInstance } from "antd";
import { Form, Select } from "antd";
import type { FC } from "react";
import { useMemo } from "react";
import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";
import type { IAddOrderItemCredentials } from "@/modules/commerce/presentation/model/IAddOrderItemCredentials";
import { OrderItemsValidator } from "@/modules/commerce/presentation/utils/validators/commerce.orderitems.validator";
import type { IContentTypeEntity } from "@/modules/lookup/domain/entities/IContentTypeEntity";
import type { IPromotionLevelEntity } from "@/modules/lookup/domain/entities/IPromotionLevelEntity";
import { CoreContentType } from "@/shared/domain/enums/core-content-type.enum";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppSelector } from "@/shared/presentation/store/store";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";
import { IconFireFilled, IconHeartOutlined } from "@/shared/presentation/ui/Icons";
import SelectOptionTagged from "@/shared/presentation/ui/SelectOptions/SelectOptionTagged";
import SwitchField from "@/shared/presentation/ui/SwitchField";

const { Item, useWatch } = Form;

/**
 * Props for the OrderItemForm component.
 *
 * @interface IOrderItemFormProps
 * @property {FormInstance} form - Ant Design form instance for field control
 * @property {boolean} [isBonusDefault] - Forces IsBonus on and disables the toggle (package overflow)
 * @property {Failure | null | undefined} error - Backend error to display
 * @property {(values: IAddOrderItemCredentials) => void} onSubmit - Form submission handler
 */
interface IOrderItemFormProps {
    form: FormInstance;
    isBonusDefault?: boolean;
    error: Failure | null | undefined;
    onSubmit: (values: IAddOrderItemCredentials) => void;
}

const CONTENT_KIND_OPTIONS = [
    { value: CoreContentType.Article, label: "Article" },
    { value: CoreContentType.Video, label: "Vidéo" },
    { value: CoreContentType.Short, label: "Short" }
];

/**
 * Form for adding a content item to an order.
 *
 * @component
 *
 * @description
 * Renders content kind, category, promotion level selects and
 * social boost / bonus checkboxes. Categories are filtered by
 * the selected content kind. When content kind changes, category
 * and promotion level selections are reset.
 *
 * @param {IOrderItemFormProps} props - Component props
 * @returns {JSX.Element} The rendered order item form
 */
const OrderItemForm: FC<IOrderItemFormProps> = ({ form, error, isBonusDefault, onSubmit }) => {
    const { data: categories } = useAppSelector(
        ({ catalog: { getAllCategories } }) => getAllCategories
    );
    const { data: contentTypes } = useAppSelector(
        ({ lookup: { getContentTypes } }) => getContentTypes
    );
    const { data: promotionLevels } = useAppSelector(
        ({ lookup: { getPromotionLevels } }) => getPromotionLevels
    );

    const selectedContentKind: CoreContentType | undefined = useWatch("contentKind", form);

    const matchedContentTypeId = useMemo(() => {
        if (!selectedContentKind) return null;
        const types = (contentTypes as IContentTypeEntity[]) ?? [];
        const match = types.find(
            (ct) => ct.name.toLowerCase() === selectedContentKind.toLowerCase()
        );
        return match?.id ?? null;
    }, [contentTypes, selectedContentKind]);

    const categoryOptions = useMemo(
        () =>
            ((categories as { items: ICategoryEntity[] })?.items ?? [])
                .filter((c) => c.isActive)
                .filter((c) => !matchedContentTypeId || c.contentTypeId === matchedContentTypeId)
                .map((c) => ({ label: c.name, value: c.id })),
        [categories, matchedContentTypeId]
    );

    const promotionLevelOptions = useMemo(
        () =>
            ((promotionLevels as IPromotionLevelEntity[]) ?? [])
                .filter((pl) => pl.isActive)
                .map((pl) => ({
                    value: pl.id,
                    label: pl.name,
                    tag: `${pl.durationDays} ${pl.durationDays > 1 ? "jours" : "jour"}`,
                    secondary: `$${pl.priceUsd.toFixed(2)}`
                })),
        [promotionLevels]
    );

    const handleContentKindChange = () => {
        form.setFieldsValue({ categoryId: undefined, promotionLevelId: undefined });
    };

    return (
        <Form
            form={form}
            size="large"
            layout="vertical"
            onFinish={onSubmit}
            name="order_item_form"
            validateTrigger={["onSubmit", "onBlur"]}
            initialValues={{ socialBoost: false, isBonus: isBonusDefault ?? false }}
        >
            <ErrorAlert error={error} showIcon closable banner={false} />

            <Item
                name="contentKind"
                label="Type de contenu"
                rules={OrderItemsValidator.contentKind("Type de contenu")}
            >
                <Select
                    options={CONTENT_KIND_OPTIONS}
                    placeholder="Sélectionner un type"
                    onChange={handleContentKindChange}
                />
            </Item>

            <Item
                name="categoryId"
                label="Catégorie"
                rules={OrderItemsValidator.categoryId("Catégorie")}
            >
                <Select
                    showSearch
                    options={categoryOptions}
                    disabled={!selectedContentKind}
                    placeholder="Sélectionner une catégorie"
                    notFoundContent={
                        selectedContentKind
                            ? "Aucune catégorie pour ce type"
                            : "Sélectionnez d'abord un type"
                    }
                />
            </Item>

            <Item name="promotionLevelId" label="Niveau de promotion">
                <Select
                    showSearch
                    allowClear
                    options={promotionLevelOptions}
                    placeholder="Sélectionner un niveau"
                    optionRender={SelectOptionTagged}
                />
            </Item>

            <Item name="socialBoost" valuePropName="checked">
                <SwitchField
                    title="Boost social"
                    icon={<IconFireFilled />}
                    description="Promouvoir ce contenu sur les réseaux sociaux."
                />
            </Item>

            <Item name="isBonus" valuePropName="checked">
                <SwitchField
                    title="Bonus"
                    disabled={isBonusDefault}
                    icon={<IconHeartOutlined />}
                    description="Cet article est offert gratuitement au client."
                />
            </Item>
        </Form>
    );
};

export default OrderItemForm;
