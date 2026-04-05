import type { FormInstance } from "antd";
import { Form, Input } from "antd";
import type { FC } from "react";
import { useEffect } from "react";
import type { IContentTypeEntity } from "@/modules/lookup/domain/entities/IContentTypeEntity";
import { ContentTypesValidator } from "@/modules/lookup/presentation/utils/validators/lookup.content-types.validator";
import type { Failure } from "@/shared/domain/failures/failure";
import type { FormContext } from "@/shared/domain/types/pagination";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";

const { Item } = Form;

/**
 * Props for the ContentTypeForm component.
 *
 * @interface IContentTypeFormProps
 * @property {FormInstance} form - Ant Design form instance
 * @property {Failure | null | undefined} error - API error to display
 * @property {FormContext} formContext - "CREATE" or "EDIT" mode
 * @property {IContentTypeEntity} [initialValues] - Pre-populated values for edit mode
 */
interface IContentTypeFormProps {
    form: FormInstance;
    formContext: FormContext;
    error: Failure | null | undefined;
    initialValues?: IContentTypeEntity | null;
}

/**
 * Shared form for creating and editing content types.
 *
 * @component
 *
 * @description
 * Renders a name field with client-side validation matching the
 * backend constraints. Pre-populates from `initialValues` when in
 * EDIT mode. Displays API errors via `ErrorAlert`.
 *
 * @param {IContentTypeFormProps} props - Component props
 * @returns {JSX.Element} The content type form
 */
const ContentTypeForm: FC<IContentTypeFormProps> = ({
    form,
    error,
    formContext,
    initialValues
}) => {
    useEffect(() => {
        if (formContext === "EDIT" && initialValues) {
            form.setFieldsValue({
                name: initialValues.name
            });
        }
    }, [formContext, initialValues, form]);

    return (
        <Form
            form={form}
            size="large"
            layout="vertical"
            name="content_type_form"
            validateTrigger={["onSubmit", "onBlur"]}
        >
            <ErrorAlert error={error} showIcon closable banner={false} />

            <Item name="name" label="Nom" rules={ContentTypesValidator.name("Nom")}>
                <Input maxLength={50} placeholder="Nom du type de contenu" />
            </Item>
        </Form>
    );
};

export default ContentTypeForm;
