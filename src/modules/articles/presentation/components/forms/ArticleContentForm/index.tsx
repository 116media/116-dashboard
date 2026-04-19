import type { FormInstance } from "antd";
import { Form, Input, Select, Switch } from "antd";
import type { FC } from "react";
import { useMemo } from "react";
import type { IUpdateArticleCredentials } from "@/modules/articles/presentation/model/IUpdateArticleCredentials";
import { ArticlesContentValidator } from "@/modules/articles/presentation/utils/validators/articles.content.validator";
import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppSelector } from "@/shared/presentation/store/store";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";

const { Item } = Form;
const { TextArea } = Input;

/**
 * Props for the ArticleContentForm component.
 *
 * @interface IArticleContentFormProps
 * @property {FormInstance<IUpdateArticleCredentials>} form - Ant Design form instance for field control
 * @property {Failure | null | undefined} error - Backend error to display in the alert
 * @property {(values: IUpdateArticleCredentials) => void} onSubmit - Callback when the form is submitted
 */
interface IArticleContentFormProps {
    form: FormInstance<IUpdateArticleCredentials>;
    error: Failure | null | undefined;
    onSubmit: (values: IUpdateArticleCredentials) => void;
}

/**
 * Content form for article creation step 2 and article editing.
 *
 * @component
 *
 * @description
 * Renders category, title, slug, headline, body, cover image URL,
 * social boost, and featured toggle fields. Category options are
 * loaded from the catalog store.
 *
 * @param {IArticleContentFormProps} props - Component props
 * @returns {JSX.Element} The rendered article content form
 */
const ArticleContentForm: FC<IArticleContentFormProps> = ({ form, error, onSubmit }) => {
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
                label="Accroche"
                rules={ArticlesContentValidator.headline("Accroche")}
            >
                <TextArea maxLength={500} showCount rows={3} placeholder="Accroche de l'article" />
            </Item>

            <Item name="body" label="Contenu" rules={ArticlesContentValidator.body("Contenu")}>
                <TextArea rows={8} placeholder="Contenu de l'article" />
            </Item>

            <Item name="coverImageUrl" label="URL de l'image de couverture">
                <Input placeholder="https://exemple.com/image.jpg" />
            </Item>

            <Item name="socialBoost" label="Boost social" valuePropName="checked">
                <Switch />
            </Item>

            <Item name="isFeatured" label="En vedette" valuePropName="checked">
                <Switch />
            </Item>
        </Form>
    );
};

export default ArticleContentForm;
