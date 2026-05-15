import type { FormInstance } from "antd";
import { Form, Input, Select, Tag } from "antd";
import type { FC } from "react";
import { useCallback, useMemo } from "react";
import type { IUpdateArticleCredentials } from "@/modules/articles/presentation/model/IUpdateArticleCredentials";
import { ArticlesContentValidator } from "@/modules/articles/presentation/utils/validators/articles.content.validator";
import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";
import type { ICustomerEntity } from "@/modules/catalog/domain/entities/ICustomerEntity";
import type { IUsePaidOrderItems } from "@/modules/commerce/presentation/hooks/UsePaidOrderItems";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppSelector } from "@/shared/presentation/store/store";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";
import FileUploader from "@/shared/presentation/ui/FileUploader";
import { IMAGE_PRESET } from "@/shared/presentation/ui/FileUploader/presets";
import { IconFireFilled } from "@/shared/presentation/ui/Icons";
import RichTextEditor from "@/shared/presentation/ui/RichTextEditor";
import { SelectOptionBadged, SelectOptionDetail } from "@/shared/presentation/ui/SelectOptions";
import SwitchField from "@/shared/presentation/ui/SwitchField";

const { Item } = Form;
const { TextArea } = Input;

interface IArticleDetailsFormProps {
    form: FormInstance<IUpdateArticleCredentials>;
    error: Failure | null | undefined;
    orderItems: IUsePaidOrderItems;
    onSubmit: (values: IUpdateArticleCredentials) => void;
    onImageUpload?: (file: File) => Promise<string>;
    onCoverUpload?: (file: File) => Promise<string>;
}

/**
 * Full edit form for articles.
 *
 * @component
 *
 * @description
 * Renders all editable article fields: category, title, headline,
 * body (rich text), cover image, social boost, and optional B2B customer/order fields.
 * Used exclusively in the article edit modal.
 */
const ArticleDetailsForm: FC<IArticleDetailsFormProps> = ({
    form,
    error,
    orderItems,
    onSubmit,
    onImageUpload,
    onCoverUpload
}) => {
    const { data: categories } = useAppSelector(
        ({ catalog: { getAllCategories } }) => getAllCategories
    );
    const { data: customers } = useAppSelector(
        ({ catalog: { getAllCustomers } }) => getAllCustomers
    );

    const categoryOptions = useMemo(
        () =>
            ((categories as { items: ICategoryEntity[] })?.items ?? [])
                .filter((c) => c.isActive && c.isArticleType)
                .map((c) => ({ label: c.name, value: c.id })),
        [categories]
    );

    const customerOptions = useMemo(
        () =>
            ((customers as { items: ICustomerEntity[] })?.items ?? []).map((c) => ({
                label: c.fullName,
                value: c.id,
                secondary: c.company ?? undefined
            })),
        [customers]
    );

    const handleCoverUpload = useCallback(
        async (file: File): Promise<string> => {
            if (!onCoverUpload) throw new Error("Cover upload not available");
            const url = await onCoverUpload(file);
            form.setFieldValue("coverImageUrl", url);
            return url;
        },
        [onCoverUpload, form]
    );

    const handleCoverRemove = useCallback(() => {
        form.setFieldValue("coverImageUrl", null);
    }, [form]);

    return (
        <Form
            form={form}
            size="large"
            layout="vertical"
            onFinish={onSubmit}
            name="article_details_form"
            validateTrigger={["onSubmit", "onBlur"]}
        >
            <ErrorAlert error={error} showIcon closable banner={false} />

            <Item
                name="categoryId"
                label="Catégorie"
                rules={ArticlesContentValidator.categoryId("Catégorie")}
            >
                <Select
                    showSearch
                    options={categoryOptions}
                    placeholder="Sélectionner une catégorie"
                />
            </Item>

            <Item name="title" label="Titre" rules={ArticlesContentValidator.title("Titre")}>
                <Input maxLength={200} placeholder="Titre de l'article" />
            </Item>

            <Item
                name="headline"
                label="Sommaire"
                rules={ArticlesContentValidator.headline("Sommaire")}
            >
                <TextArea maxLength={500} showCount rows={3} placeholder="Sommaire de l'article" />
            </Item>

            <Item name="body" label="Contenu" rules={ArticlesContentValidator.body("Contenu")}>
                <RichTextEditor placeholder="Contenu de l'article" onImageUpload={onImageUpload} />
            </Item>

            <Item name="coverImageUrl" label="Image de couverture">
                <FileUploader
                    aspectRatio={16 / 9}
                    preset={IMAGE_PRESET}
                    disabled={!onCoverUpload}
                    onUpload={handleCoverUpload}
                    onRemove={handleCoverRemove}
                    value={form.getFieldValue("coverImageUrl")}
                />
            </Item>

            <Item name="customerId" label="Client">
                <Select
                    showSearch
                    allowClear
                    options={customerOptions}
                    placeholder="Sélectionner un client"
                    onChange={(value) => {
                        form.setFieldValue("orderItemId", undefined);
                        form.setFieldValue("socialBoost", false);
                        orderItems.fetchByCustomer(value || undefined);
                    }}
                    optionRender={SelectOptionDetail}
                />
            </Item>

            <Item name="orderItemId" label="Commande">
                <Select
                    showSearch
                    allowClear
                    loading={orderItems.loading}
                    disabled={orderItems.loading}
                    options={orderItems.options}
                    placeholder="Sélectionner une commande"
                    popupMatchSelectWidth={false}
                    optionRender={SelectOptionBadged}
                    onChange={(value) => {
                        const option = orderItems.options.find((o) => o.value === value);
                        form.setFieldValue("socialBoost", option ? option.socialBoost : false);
                    }}
                />
            </Item>

            <Item noStyle shouldUpdate={(prev, curr) => prev.orderItemId !== curr.orderItemId}>
                {({ getFieldValue }) => {
                    const selectedOption = orderItems.options.find(
                        (o) => o.value === getFieldValue("orderItemId")
                    );
                    const locked = selectedOption !== undefined;
                    return (
                        <>
                            {selectedOption?.isBonus && (
                                <Item>
                                    <Tag color="purple">Commande bonus</Tag>
                                </Item>
                            )}
                            <Item name="socialBoost" valuePropName="checked">
                                <SwitchField
                                    disabled={locked}
                                    title="Boost social"
                                    icon={<IconFireFilled />}
                                    description="Promouvoir cet article sur les réseaux sociaux."
                                />
                            </Item>
                        </>
                    );
                }}
            </Item>
        </Form>
    );
};

export default ArticleDetailsForm;
