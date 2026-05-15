import type { FormInstance } from "antd";
import { Form, Input } from "antd";
import type { FC } from "react";
import type { IUnpromoteArticleCredentials } from "@/modules/articles/presentation/model/IUnpromoteArticleCredentials";
import { ArticlesUnpromoteValidator } from "@/modules/articles/presentation/utils/validators/articles.unpromote.validator";
import type { Failure } from "@/shared/domain/failures/failure";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";

const { Item } = Form;
const { TextArea } = Input;

/**
 * Props for the ArticleUnpromoteForm component.
 *
 * @interface IArticleUnpromoteFormProps
 * @property {FormInstance<IUnpromoteArticleCredentials>} form - Ant Design form instance for field control
 * @property {Failure | null | undefined} error - Backend error to display in the alert
 * @property {(values: IUnpromoteArticleCredentials) => void} onSubmit - Callback when the form is submitted
 */
interface IArticleUnpromoteFormProps {
    form: FormInstance<IUnpromoteArticleCredentials>;
    error: Failure | null | undefined;
    onSubmit: (values: IUnpromoteArticleCredentials) => void;
}

/**
 * Form for removing the promotion of an article with an audit reason.
 *
 * @component
 *
 * @description
 * Renders a single reason textarea with character count.
 * Used inline within the workflow confirmation modal when the
 * "unpromote" action is selected.
 *
 * @param {IArticleUnpromoteFormProps} props - Component props
 * @returns {JSX.Element} The rendered unpromote form
 */
const ArticleUnpromoteForm: FC<IArticleUnpromoteFormProps> = ({ form, error, onSubmit }) => {
    return (
        <Form
            form={form}
            size="large"
            layout="vertical"
            onFinish={onSubmit}
            name="article_unpromote_form"
            validateTrigger={["onSubmit", "onBlur"]}
        >
            <ErrorAlert error={error} showIcon closable banner={false} />

            <Item name="reason" label="Raison" rules={ArticlesUnpromoteValidator.reason("Raison")}>
                <TextArea
                    rows={4}
                    maxLength={500}
                    showCount
                    placeholder="Indiquez la raison du retrait de la promotion"
                />
            </Item>
        </Form>
    );
};

export default ArticleUnpromoteForm;
