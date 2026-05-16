import type { FormInstance } from "antd";
import { Form, Input, Select } from "antd";
import type { FC } from "react";
import { useMemo } from "react";
import type { ICreateArticleCredentials } from "@/modules/articles/presentation/model/ICreateArticleCredentials";
import { ArticlesContentValidator } from "@/modules/articles/presentation/utils/validators/articles.content.validator";
import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";
import type { ICustomerEntity } from "@/modules/catalog/domain/entities/ICustomerEntity";
import { usePaidOrderItems } from "@/modules/commerce/presentation/hooks/UsePaidOrderItems";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppSelector } from "@/shared/presentation/store/store";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";
import { SelectOptionBadged, SelectOptionDetail } from "@/shared/presentation/ui/SelectOptions";

const { Item } = Form;

/**
 * Props for the ArticleInfoForm component.
 *
 * @interface IArticleInfoFormProps
 * @property {FormInstance<ICreateArticleCredentials>} form - Ant Design form instance for field control
 * @property {Failure | null | undefined} error - Backend error to display in the alert
 * @property {(values: ICreateArticleCredentials) => void} onSubmit - Callback when the form is submitted
 */
interface IArticleInfoFormProps {
    error: Failure | null | undefined;
    form: FormInstance<ICreateArticleCredentials>;
    onSubmit: (values: ICreateArticleCredentials) => void;
}

/**
 * Step 1 form for the article creation wizard.
 *
 * @component
 *
 * @description
 * Renders category, title, slug, optional customer, and optional order item
 * fields. Category and customer options are loaded from the Redux store.
 * This is the first step of the two-step article creation flow.
 *
 * @param {IArticleInfoFormProps} props - Component props
 * @returns {JSX.Element} The rendered step 1 creation form
 */
const ArticleInfoForm: FC<IArticleInfoFormProps> = ({ form, error, onSubmit }) => {
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
                .map((c) => ({
                    label: c.name,
                    value: c.id
                })),
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

    return (
        <Form
            form={form}
            size="large"
            layout="vertical"
            onFinish={onSubmit}
            name="article_create_step1_form"
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

export default ArticleInfoForm;
