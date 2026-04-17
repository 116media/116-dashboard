import type { FormInstance } from "antd";
import { Form, Input } from "antd";
import type { FC } from "react";
import type { IRejectArticleCredentials } from "@/modules/articles/presentation/model/IRejectArticleCredentials";
import { ArticlesRejectValidator } from "@/modules/articles/presentation/utils/validators/articles.reject.validator";
import type { Failure } from "@/shared/domain/failures/failure";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";

const { Item } = Form;
const { TextArea } = Input;

/**
 * Props for the ArticleRejectForm component.
 *
 * @interface IArticleRejectFormProps
 * @property {FormInstance<IRejectArticleCredentials>} form - Ant Design form instance for field control
 * @property {Failure | null | undefined} error - Backend error to display in the alert
 * @property {(values: IRejectArticleCredentials) => void} onSubmit - Callback when the form is submitted
 */
interface IArticleRejectFormProps {
    form: FormInstance<IRejectArticleCredentials>;
    error: Failure | null | undefined;
    onSubmit: (values: IRejectArticleCredentials) => void;
}

/**
 * Form for rejecting an article with a reason.
 *
 * @component
 *
 * @description
 * Renders a single rejection reason textarea with character count.
 * Used inline within the workflow confirmation modal when the
 * "reject" action is selected.
 *
 * @param {IArticleRejectFormProps} props - Component props
 * @returns {JSX.Element} The rendered rejection form
 */
const ArticleRejectForm: FC<IArticleRejectFormProps> = ({ form, error, onSubmit }) => {
    return (
        <Form
            form={form}
            size="large"
            layout="vertical"
            onFinish={onSubmit}
            name="article_reject_form"
            validateTrigger={["onSubmit", "onBlur"]}
        >
            <ErrorAlert error={error} showIcon closable banner={false} />

            <Item
                name="rejectionReason"
                label="Raison du rejet"
                rules={ArticlesRejectValidator.rejectionReason("Raison du rejet")}
            >
                <TextArea
                    maxLength={500}
                    showCount
                    rows={4}
                    placeholder="Indiquez la raison du rejet"
                />
            </Item>
        </Form>
    );
};

export default ArticleRejectForm;
