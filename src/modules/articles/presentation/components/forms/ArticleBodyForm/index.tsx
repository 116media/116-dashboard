import type { FormInstance } from "antd";
import { Form, Input, Select } from "antd";
import type { FC } from "react";
import { useCallback, useMemo } from "react";
import type { IUpdateArticleCredentials } from "@/modules/articles/presentation/model/IUpdateArticleCredentials";
import { ArticlesContentValidator } from "@/modules/articles/presentation/utils/validators/articles.content.validator";
import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppSelector } from "@/shared/presentation/store/store";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";
import FileUploader from "@/shared/presentation/ui/FileUploader";
import { IMAGE_PRESET } from "@/shared/presentation/ui/FileUploader/presets";
import { IconFireFilled, IconStarFilled } from "@/shared/presentation/ui/Icons";
import RichTextEditor from "@/shared/presentation/ui/RichTextEditor";
import SwitchField from "@/shared/presentation/ui/SwitchField";

const { Item } = Form;
const { TextArea } = Input;

interface IArticleBodyFormProps {
    form: FormInstance;
    error: Failure | null | undefined;
    onSubmit: (values: IUpdateArticleCredentials) => void;
    onImageUpload?: (file: File) => Promise<string>;
    onCoverUpload?: (file: File) => Promise<string>;
    showAllFields?: boolean;
}

/**
 * Content form for article creation step 2 and article editing.
 *
 * @component
 *
 * @description
 * When `showAllFields` is true (default, edit mode), renders all fields
 * including category, title, social boost, and featured toggles.
 * When false (wizard step 2), renders only headline, body, and cover image.
 * Cover image uses the shared FileUploader with crop support.
 */
const ArticleBodyForm: FC<IArticleBodyFormProps> = ({
    form,
    error,
    onSubmit,
    onImageUpload,
    onCoverUpload,
    showAllFields = true
}) => {
    const { data: categories } = useAppSelector(
        ({ catalog: { getAllCategories } }) => getAllCategories
    );

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
            name="article_content_form"
            validateTrigger={["onSubmit", "onBlur"]}
        >
            <ErrorAlert error={error} showIcon closable banner={false} />

            {showAllFields && (
                <>
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

                    <Item
                        name="title"
                        label="Titre"
                        rules={ArticlesContentValidator.title("Titre")}
                    >
                        <Input maxLength={200} placeholder="Titre de l'article" />
                    </Item>
                </>
            )}

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

            {showAllFields && (
                <>
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
                </>
            )}
        </Form>
    );
};

export default ArticleBodyForm;
