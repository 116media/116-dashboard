import type { FormInstance } from "antd";
import { DatePicker, Form, Input, Select } from "antd";
import type { FC } from "react";
import { useCallback, useMemo } from "react";
import type { IUpdateArticleCredentials } from "@/modules/articles/presentation/model/IUpdateArticleCredentials";
import { ArticlesContentValidator } from "@/modules/articles/presentation/utils/validators/articles.content.validator";
import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";
import type { ICustomerEntity } from "@/modules/catalog/domain/entities/ICustomerEntity";
import { usePaidOrderItems } from "@/modules/commerce/presentation/hooks/UsePaidOrderItems";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppSelector } from "@/shared/presentation/store/store";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";
import FileUploader from "@/shared/presentation/ui/FileUploader";
import { IMAGE_PRESET } from "@/shared/presentation/ui/FileUploader/presets";
import { IconFireFilled, IconStarFilled } from "@/shared/presentation/ui/Icons";
import RichTextEditor from "@/shared/presentation/ui/RichTextEditor";
import { SelectOptionBadged, SelectOptionDetail } from "@/shared/presentation/ui/SelectOptions";
import SwitchField from "@/shared/presentation/ui/SwitchField";

const { Item } = Form;
const { TextArea } = Input;

interface IArticleDetailsFormProps {
    form: FormInstance<IUpdateArticleCredentials>;
    error: Failure | null | undefined;
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
 * body (rich text), cover image, social boost, featured toggle
 * with expiry date, and optional B2B customer/order fields.
 * Used exclusively in the article edit modal.
 */
const ArticleDetailsForm: FC<IArticleDetailsFormProps> = ({
    form,
    error,
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
    const orderItems = usePaidOrderItems();

    const categoryOptions = useMemo(
        () =>
            ((categories as { items: ICategoryEntity[] })?.items ?? [])
                .filter((c) => c.isActive)
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

            <Item name="socialBoost" valuePropName="checked">
                <SwitchField
                    title="Boost social"
                    icon={<IconFireFilled />}
                    description="Promouvoir cet article sur les réseaux sociaux."
                />
            </Item>

            <Item name="isFeatured" valuePropName="checked">
                <SwitchField
                    title="En vedette"
                    icon={<IconStarFilled />}
                    description="Afficher cet article en avant sur la page d'accueil."
                />
            </Item>

            <Item noStyle shouldUpdate={(prev, curr) => prev.isFeatured !== curr.isFeatured}>
                {({ getFieldValue }) =>
                    getFieldValue("isFeatured") ? (
                        <Item name="featuredUntil" label="En vedette jusqu'au">
                            <DatePicker style={{ width: "100%" }} placeholder="Date d'expiration" />
                        </Item>
                    ) : null
                }
            </Item>

            <Item name="customerId" label="Client">
                <Select
                    showSearch
                    allowClear
                    options={customerOptions}
                    placeholder="Sélectionner un client"
                    onChange={(value) => {
                        form.setFieldValue("orderItemId", undefined);
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
                />
            </Item>
        </Form>
    );
};

export default ArticleDetailsForm;
