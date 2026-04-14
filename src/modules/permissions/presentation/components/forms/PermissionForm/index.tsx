import type { FormInstance } from "antd";
import { Form, Input } from "antd";
import type { FC } from "react";
import { useEffect } from "react";
import type { IPermissionEntity } from "@/modules/permissions/domain/entities/IPermission";
import type { ICreatePermissionCredentials } from "@/modules/permissions/presentation/model/ICreatePermissionCredentials";
import { PermissionsValidator } from "@/modules/permissions/presentation/utils/validators/permissions.validator";
import type { Failure } from "@/shared/domain/failures/failure";
import type { FormContext } from "@/shared/domain/types/pagination";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";

const { Item } = Form;
const { TextArea } = Input;

/**
 * Props for the PermissionForm component.
 *
 * @interface IPermissionFormProps
 * @property {FormInstance} form - Ant Design form instance
 * @property {Failure | null | undefined} error - API error to display
 * @property {FormContext} formContext - "CREATE" or "EDIT" mode
 * @property {IPermissionEntity} [initialValues] - Pre-populated values for edit mode
 */
interface IPermissionFormProps {
    form: FormInstance;
    error: Failure | null | undefined;
    formContext: FormContext;
    initialValues?: IPermissionEntity | null;
    onSubmit: (values: ICreatePermissionCredentials) => void;
}

/**
 * Shared form for creating and editing permissions.
 *
 * @component
 *
 * @description
 * Renders resource, action, and description fields with client-side
 * validation matching the backend constraints. Pre-populates from
 * `initialValues` when in EDIT mode.
 *
 * @param {IPermissionFormProps} props - Component props
 * @returns {JSX.Element} The permission form
 */
const PermissionForm: FC<IPermissionFormProps> = ({
    form,
    error,
    formContext,
    initialValues,
    onSubmit
}) => {
    useEffect(() => {
        if (formContext === "EDIT" && initialValues) {
            form.setFieldsValue({
                resource: initialValues.resource,
                action: initialValues.action,
                description: initialValues.description
            });
        }
    }, [formContext, initialValues, form]);

    return (
        <Form
            form={form}
            size="large"
            layout="vertical"
            onFinish={onSubmit}
            name="permission_form"
            validateTrigger={["onSubmit", "onBlur"]}
        >
            <ErrorAlert error={error} showIcon closable banner={false} />

            <Item
                name="resource"
                label="Ressource"
                rules={PermissionsValidator.resource("Ressource")}
            >
                <Input maxLength={15} placeholder="ex: users, articles" />
            </Item>

            <Item name="action" label="Action" rules={PermissionsValidator.action("Action")}>
                <Input maxLength={15} placeholder="ex: create, read, delete" />
            </Item>

            <Item
                name="description"
                label="Description"
                rules={PermissionsValidator.description("Description")}
            >
                <TextArea
                    showCount
                    maxLength={300}
                    autoSize={{ minRows: 3 }}
                    placeholder="Description de la permission"
                />
            </Item>
        </Form>
    );
};

export default PermissionForm;
