import type { FormInstance } from "antd";
import { Form, Input } from "antd";
import type { FC } from "react";
import { useEffect } from "react";
import type { IRoleEntity } from "@/modules/roles/domain/entities/IRole";
import type { ICreateRoleCredentials } from "@/modules/roles/presentation/model/ICreateRoleCredentials";
import { RolesValidator } from "@/modules/roles/presentation/utils/validators/roles.validator";
import type { Failure } from "@/shared/domain/failures/failure";
import type { FormContext } from "@/shared/domain/types/pagination";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";

const { Item } = Form;
const { TextArea } = Input;

/**
 * Props for the RoleForm component.
 *
 * @interface IRoleFormProps
 * @property {FormInstance} form - Ant Design form instance
 * @property {Failure | null | undefined} error - API error to display
 * @property {FormContext} formContext - "CREATE" or "EDIT" mode
 * @property {IRoleEntity} [initialValues] - Pre-populated values for edit mode
 */
interface IRoleFormProps {
    form: FormInstance;
    error: Failure | null | undefined;
    formContext: FormContext;
    initialValues?: IRoleEntity | null;
    onSubmit: (values: ICreateRoleCredentials) => void;
}

/**
 * Shared form for creating and editing roles.
 *
 * @component
 *
 * @description
 * Renders name and description fields with client-side validation
 * matching the backend constraints. Pre-populates from `initialValues`
 * when in EDIT mode. Displays API errors via `ErrorAlert`.
 *
 * @param {IRoleFormProps} props - Component props
 * @returns {JSX.Element} The role form
 */
const RoleForm: FC<IRoleFormProps> = ({ form, error, formContext, initialValues, onSubmit }) => {
    useEffect(() => {
        if (formContext === "EDIT" && initialValues) {
            form.setFieldsValue({
                name: initialValues.name,
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
            name="role_form"
            validateTrigger={["onSubmit", "onBlur"]}
        >
            <ErrorAlert error={error} showIcon closable banner={false} />

            <Item name="name" label="Nom" rules={RolesValidator.name("Nom")}>
                <Input maxLength={20} placeholder="Nom du rôle" />
            </Item>

            <Item
                name="description"
                label="Description"
                rules={RolesValidator.description("Description")}
            >
                <TextArea
                    showCount
                    maxLength={200}
                    placeholder="Description du rôle"
                    autoSize={{ minRows: 3 }}
                />
            </Item>
        </Form>
    );
};

export default RoleForm;
