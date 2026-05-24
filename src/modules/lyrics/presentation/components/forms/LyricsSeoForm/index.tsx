import type { FormInstance } from "antd";
import { Form, Input } from "antd";
import type { FC } from "react";
import type { IUpdateLyricsSeoCredentials } from "@/modules/lyrics/presentation/model/IUpdateLyricsSeoCredentials";
import { LyricsSeoValidator } from "@/modules/lyrics/presentation/utils/validators/lyrics.seo.validator";
import type { Failure } from "@/shared/domain/failures/failure";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";

const { Item } = Form;
const { TextArea } = Input;

/**
 * Props for the LyricsSeoForm component.
 *
 * @interface ILyricsSeoFormProps
 * @property {FormInstance<IUpdateLyricsSeoCredentials>} form - Ant Design form instance for field control
 * @property {Failure | null | undefined} error - Backend error to display in the alert
 * @property {(values: IUpdateLyricsSeoCredentials) => void} onSubmit - Callback when the form is submitted
 */
interface ILyricsSeoFormProps {
    form: FormInstance<IUpdateLyricsSeoCredentials>;
    error: Failure | null | undefined;
    onSubmit: (values: IUpdateLyricsSeoCredentials) => void;
}

/**
 * Form for editing lyrics SEO metadata.
 *
 * @component
 *
 * @description
 * Renders meta title, meta description, and optional meta keywords fields
 * with character count indicators. Validation rules enforce maximum lengths
 * matching backend constraints.
 *
 * @param {ILyricsSeoFormProps} props - Component props
 * @returns {JSX.Element} The rendered SEO form
 */
const LyricsSeoForm: FC<ILyricsSeoFormProps> = ({ form, error, onSubmit }) => {
    return (
        <Form
            form={form}
            size="large"
            layout="vertical"
            onFinish={onSubmit}
            name="lyrics_seo_form"
            validateTrigger={["onSubmit", "onBlur"]}
        >
            <ErrorAlert error={error} showIcon closable banner={false} />

            <Item
                name="metaTitle"
                label="Titre SEO"
                rules={LyricsSeoValidator.metaTitle("Titre SEO")}
            >
                <Input maxLength={70} showCount placeholder="Titre SEO des paroles" />
            </Item>

            <Item
                name="metaDescription"
                label="Description SEO"
                rules={LyricsSeoValidator.metaDescription("Description SEO")}
            >
                <TextArea
                    rows={3}
                    showCount
                    maxLength={160}
                    placeholder="Description SEO des paroles"
                />
            </Item>
        </Form>
    );
};

export default LyricsSeoForm;
