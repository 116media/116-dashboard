import type { FormInstance } from "antd";
import { Form, Input } from "antd";
import { type FC, useEffect } from "react";
import type { ITagEntity } from "@/modules/lookup/domain/entities/ITagEntity";
import type { ICreateTagCredentials } from "@/modules/lookup/presentation/model/ICreateTagCredentials";
import { TagsValidator } from "@/modules/lookup/presentation/utils/validators/lookup.tags.validator";
import type { Failure } from "@/shared/domain/failures/failure";
import type { FormContext } from "@/shared/domain/types/pagination";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";

const { Item } = Form;

/**
 * Props for the TagForm component.
 *
 * @interface ITagFormProps
 * @property {FormInstance} form - Ant Design form instance
 * @property {Failure | null | undefined} error - API error to display
 * @property {FormContext} formContext - "CREATE" or "EDIT" mode
 * @property {ITagEntity | null} [initialValues] - Pre-populated values for edit mode
 */
interface ITagFormProps {
    form: FormInstance;
    error: Failure | null | undefined;
    formContext: FormContext;
    initialValues?: ITagEntity | null;
    onSubmit: (values: ICreateTagCredentials) => void;
}

/**
 * Form for creating and editing tags.
 *
 * @component
 *
 * @description
 * Renders a name field with client-side validation. The slug
 * is auto-generated from the name via `generateSlug` in the
 * hook — the user never sees or edits it. Pre-populates from
 * `initialValues` when in EDIT mode.
 *
 * @param {ITagFormProps} props - Component props
 * @returns {JSX.Element} The tag form
 */
const TagForm: FC<ITagFormProps> = ({ form, error, formContext, initialValues, onSubmit }) => {
    useEffect(() => {
        if (formContext === "EDIT" && initialValues) {
            form.setFieldsValue({ name: initialValues.name });
        }
    }, [formContext, initialValues, form]);
    return (
        <Form
            form={form}
            size="large"
            layout="vertical"
            onFinish={onSubmit}
            name="tag_form"
            validateTrigger={["onSubmit", "onBlur"]}
        >
            <ErrorAlert error={error} showIcon closable banner={false} />

            <Item name="name" label="Nom" rules={TagsValidator.name("Nom")}>
                <Input maxLength={50} placeholder="Nom du tag" />
            </Item>
        </Form>
    );
};

export default TagForm;
