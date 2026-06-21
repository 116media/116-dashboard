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
import FileUploader from "@/shared/presentation/ui/FileUploader";
import { IMAGE_PRESET } from "@/shared/presentation/ui/FileUploader/presets";
import {
    IconDollarOutlined,
    IconStarOutlined,
    IconTagOutlined
} from "@/shared/presentation/ui/Icons";
import SwitchField from "@/shared/presentation/ui/SwitchField";

const { Item } = Form;
const { TextArea } = Input;

/**
 * Props for the CategoryForm component.
 *
 * @interface ICategoryFormProps
 * @property {FormInstance} form - Ant Design form instance
 * @property {Failure | null | undefined} error - API error to display
 * @property {FormContext} formContext - "CREATE" or "EDIT" mode
 * @property {ICategoryEntity} [initialValues] - Pre-populated values for edit mode
 * @property {File | null} [posterFile] - Locally captured poster file (edit mode)
 * @property {string | null} [posterUrl] - Current poster URL (edit mode)
 * @property {(values: ICreateCategoryCredentials) => void} onSubmit - Form submission handler
 * @property {(file: File | null) => void} [onPosterFileChange] - Captures the poster file locally
 */
interface ICategoryFormProps {
    form: FormInstance;
    formContext: FormContext;
    error: Failure | null | undefined;
    initialValues?: ICategoryEntity | null;
    posterFile?: File | null;
    posterUrl?: string | null;
    onSubmit: (values: ICreateCategoryCredentials) => void;
    onPosterFileChange?: (file: File | null) => void;
}

/**
 * Shared form for creating and editing categories.
 *
 * @component
 *
 * @description
 * Renders the category fields with client-side validation matching the backend. In edit mode it
 * also exposes the exclusive toggle (video categories) and a poster uploader; the poster file is
 * captured locally and uploaded by the parent on save.
 *
 * @param {ICategoryFormProps} props - Component props
 * @returns {JSX.Element} The category form
 */
const CategoryForm: FC<ICategoryFormProps> = ({
    form,
    error,
    formContext,
    initialValues,
    posterFile,
    posterUrl,
    onSubmit,
    onPosterFileChange
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
    const isVideoType = selectedContentType?.name === "Video";

    const posterPreviewUrl = useMemo(
        () => (posterFile ? URL.createObjectURL(posterFile) : null),
        [posterFile]
    );

    useEffect(() => {
        if (formContext === "EDIT" && initialValues) {
            setSelectedContentTypeId(initialValues.contentTypeId);
            form.setFieldsValue({
                name: initialValues.name,
                isFree: initialValues.isFree,
                isGossip: initialValues.isGossip,
                isExclusive: initialValues.isExclusive,
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
                formContext === "CREATE"
                    ? { isFree: false, isGossip: false, isExclusive: false }
                    : undefined
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

            {isVideoType && (
                <Item name="isExclusive" valuePropName="checked">
                    <SwitchField
                        title="Émission exclusive"
                        icon={<IconStarOutlined />}
                        description="Cette catégorie sera en contenu exclusive sur l'accueil."
                    />
                </Item>
            )}

            <Item label="Affiche">
                <FileUploader
                    mode="deferred"
                    aspectRatio={16 / 9}
                    preset={IMAGE_PRESET}
                    value={posterPreviewUrl ?? posterUrl}
                    onFileSelect={(file) => onPosterFileChange?.(file)}
                    onRemove={() => onPosterFileChange?.(null)}
                />
            </Item>
        </Form>
    );
};

export default CategoryForm;
