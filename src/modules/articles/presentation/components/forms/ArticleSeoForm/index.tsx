import type { FormInstance } from "antd";
import { Form, Input } from "antd";
import type { FC } from "react";
import type { IUpdateArticleSeoCredentials } from "@/modules/articles/presentation/model/IUpdateArticleSeoCredentials";
import { ArticlesSeoValidator } from "@/modules/articles/presentation/utils/validators/articles.seo.validator";
import type { Failure } from "@/shared/domain/failures/failure";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";

const { Item } = Form;
const { TextArea } = Input;

/**
 * Props for the ArticleSeoForm component.
 *
 * @interface IArticleSeoFormProps
 * @property {FormInstance<IUpdateArticleSeoCredentials>} form - Ant Design form instance for field control
 * @property {Failure | null | undefined} error - Backend error to display in the alert
 * @property {(values: IUpdateArticleSeoCredentials) => void} onSubmit - Callback when the form is submitted
 */
interface IArticleSeoFormProps {
    form: FormInstance<IUpdateArticleSeoCredentials>;
    error?: Failure | null | undefined;
    onSubmit: (values: IUpdateArticleSeoCredentials) => void;
}

/**
 * Form for editing article SEO metadata.
 *
 * @component
 *
 * @description
 * Renders meta title and meta description fields with character
 * count indicators. Validation rules enforce maximum lengths
 * matching backend constraints.
 *
 * @param {IArticleSeoFormProps} props - Component props
 * @returns {JSX.Element} The rendered SEO form
 */
const ArticleSeoForm: FC<IArticleSeoFormProps> = ({ form, error, onSubmit }) => {
    return (
        <Form
            form={form}
            size="large"
            layout="vertical"
            onFinish={onSubmit}
            name="article_seo_form"
            validateTrigger={["onSubmit", "onBlur"]}
        >
            <ErrorAlert error={error} showIcon closable banner={false} />

            <Item
                name="metaTitle"
                label="Titre SEO"
                rules={ArticlesSeoValidator.metaTitle("Titre SEO")}
            >
                <Input maxLength={70} showCount placeholder="Titre SEO de l'article" />
            </Item>

            <Item
                name="metaDescription"
                label="Description SEO"
                rules={ArticlesSeoValidator.metaDescription("Description SEO")}
            >
                <TextArea
                    rows={3}
                    showCount
                    maxLength={160}
                    placeholder="Description SEO de l'article"
                />
            </Item>
        </Form>
    );
};

export default ArticleSeoForm;
