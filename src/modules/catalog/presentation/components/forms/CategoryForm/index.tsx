import type { FormInstance } from "antd";
import { Form, Input, Select } from "antd";
import type { FC } from "react";
import { useEffect, useMemo, useState } from "react";
import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";
import type { ICreateCategoryCredentials } from "@/modules/catalog/presentation/model/ICreateCategoryCredentials";
import { CategoriesValidator } from "@/modules/catalog/presentation/utils/validators/catalog.categories.validator";
import type { IContentTypeEntity } from "@/modules/lookup/domain/entities/IContentTypeEntity";
import type { Failure } from "@/shared/domain/failures/failure";
import type { FormContext } from "@/shared/domain/types/pagination";
import { useAppSelector } from "@/shared/presentation/store/store";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";
import { IconDollarOutlined, IconTagOutlined } from "@/shared/presentation/ui/Icons";
import SwitchField from "@/shared/presentation/ui/SwitchField";

const { Item } = Form;
const { TextArea } = Input;

/**s
 * Props for the CategoryForm component.
 *
 * @interface ICategoryFormProps
 * @property {FormInstance} form - Ant Design form instance
 * @property {Failure | null | undefined} error - API error to display
 * @property {FormContext} formContext - "CREATE" or "EDIT" mode
 * @property {ICategoryEntity} [initialValues] - Pre-populated values for edit mode
 * @property {(values: ICreateCategoryCredentials) => void} onSubmit - Form submission handler
 */
interface ICategoryFormProps {
    form: FormInstance;
    formContext: FormContext;
    error: Failure | null | undefined;
    initialValues?: ICategoryEntity | null;
    onSubmit: (values: ICreateCategoryCredentials) => void;
}

/**
 * Shared form for creating and editing categories.
 *
 * @component
 *
 * @description
 * Renders name, description, and isFree fields with client-side
 * validation matching the backend constraints. Pre-populates from
 * `initialValues` when in EDIT mode. Displays API errors via
 * `ErrorAlert`. The `contentTypeId` is handled separately by the
 * container and is not part of this form.
 *
 * @param {ICategoryFormProps} props - Component props
 * @returns {JSX.Element} The category form
 */
const CategoryForm: FC<ICategoryFormProps> = ({
    form,
    error,
    formContext,
    initialValues,
    onSubmit
}) => {
    const { data: contentTypes } = useAppSelector(
        ({ lookup: { getContentTypes } }) => getContentTypes
    );

    const contentTypeOptions = useMemo(
        () =>
            ((contentTypes as IContentTypeEntity[]) ?? [])
                .filter((ct) => ct.isActive)
                .map((ct) => ({ label: ct.name, value: ct.id })),
        [contentTypes]
    );

    const [selectedContentTypeId, setSelectedContentTypeId] = useState<string | undefined>(
        initialValues?.contentTypeId
    );

    const selectedContentType = useMemo(
        () =>
            ((contentTypes as IContentTypeEntity[]) ?? []).find(
                (ct) => ct.id === selectedContentTypeId
            ),
        [contentTypes, selectedContentTypeId]
    );

    const isArticleType = selectedContentType?.name === "Article";

    useEffect(() => {
        if (formContext === "EDIT" && initialValues) {
            setSelectedContentTypeId(initialValues.contentTypeId);
            form.setFieldsValue({
                name: initialValues.name,
                isFree: initialValues.isFree,
                isGossip: initialValues.isGossip,
                description: initialValues.description,
                contentTypeId: initialValues.contentTypeId
            });
        }
    }, [formContext, initialValues, form]);

    return (
        <Form
            form={form}
            size="large"
            layout="vertical"
            onFinish={onSubmit}
            name="category_form"
            validateTrigger={["onSubmit", "onBlur"]}
            initialValues={
                formContext === "CREATE" ? { isFree: false, isGossip: false } : undefined
            }
        >
            <ErrorAlert error={error} showIcon closable banner={false} />

            <Item
                name="contentTypeId"
                label="Type de contenu"
                rules={CategoriesValidator.contentTypeId("Type de contenu")}
            >
                <Select
                    showSearch
                    options={contentTypeOptions}
                    disabled={formContext === "EDIT"}
                    placeholder="Sélectionner un type de contenu"
                    onSelect={(val: string) => setSelectedContentTypeId(val)}
                />
            </Item>

            <Item name="name" label="Nom" rules={CategoriesValidator.name("Nom")}>
                <Input maxLength={60} placeholder="Nom de la catégorie" />
            </Item>

            <Item
                name="description"
                label="Description"
                rules={CategoriesValidator.description("Description")}
            >
                <TextArea
                    showCount
                    maxLength={300}
                    autoSize={{ minRows: 3 }}
                    placeholder="Description de la catégorie"
                />
            </Item>

            <br />

            <Item name="isFree" valuePropName="checked">
                <SwitchField
                    title="Contenu gratuit"
                    icon={<IconDollarOutlined />}
                    description="Le contenu est accessible sans paiement."
                />
            </Item>

            {isArticleType && (
                <Item name="isGossip" valuePropName="checked">
                    <SwitchField
                        title="Catégorie gossip"
                        icon={<IconTagOutlined />}
                        description="Catégorie d'article actualités non-confirmées et rumeurs"
                    />
                </Item>
            )}
        </Form>
    );
};

export default CategoryForm;
