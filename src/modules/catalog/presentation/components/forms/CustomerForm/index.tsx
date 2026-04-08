import type { FormInstance } from "antd";
import { Form, Input } from "antd";
import type { FC } from "react";
import { useEffect } from "react";
import type { ICustomerEntity } from "@/modules/catalog/domain/entities/ICustomerEntity";
import type { ICreateCustomerCredentials } from "@/modules/catalog/presentation/model/ICreateCustomerCredentials";
import { CustomersValidator } from "@/modules/catalog/presentation/utils/validators/catalog.customers.validator";
import type { Failure } from "@/shared/domain/failures/failure";
import type { FormContext } from "@/shared/domain/types/pagination";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";

const { Item } = Form;
const { TextArea } = Input;

/**
 * Props for the CustomerForm component.
 *
 * @interface ICustomerFormProps
 * @property {FormInstance} form - Ant Design form instance
 * @property {Failure | null | undefined} error - API error to display
 * @property {FormContext} formContext - "CREATE" or "EDIT" mode
 * @property {ICustomerEntity} [initialValues] - Pre-populated values for edit mode
 * @property {(values: ICreateCustomerCredentials) => void} onSubmit - Form submission handler
 */
interface ICustomerFormProps {
    form: FormInstance;
    formContext: FormContext;
    error: Failure | null | undefined;
    initialValues?: ICustomerEntity | null;
    onSubmit: (values: ICreateCustomerCredentials) => void;
}

/**
 * Shared form for creating and editing customers.
 *
 * @component
 *
 * @description
 * Renders fullName, email, phone, company, and notes fields with
 * client-side validation matching the backend constraints.
 * Pre-populates from `initialValues` when in EDIT mode. The email
 * field is disabled in EDIT mode since it cannot be updated.
 * Displays API errors via `ErrorAlert`.
 *
 * @param {ICustomerFormProps} props - Component props
 * @returns {JSX.Element} The customer form
 */
const CustomerForm: FC<ICustomerFormProps> = ({
    form,
    error,
    formContext,
    initialValues,
    onSubmit
}) => {
    useEffect(() => {
        if (formContext === "EDIT" && initialValues) {
            form.setFieldsValue({
                fullName: initialValues.fullName,
                email: initialValues.email,
                phone: initialValues.phone ?? undefined,
                company: initialValues.company ?? undefined,
                notes: initialValues.notes ?? undefined
            });
        }
    }, [formContext, initialValues, form]);

    return (
        <Form
            form={form}
            size="large"
            layout="vertical"
            onFinish={onSubmit}
            name="customer_form"
            validateTrigger={["onSubmit", "onBlur"]}
        >
            <ErrorAlert error={error} showIcon closable banner={false} />

            <Item
                name="fullName"
                label="Nom complet"
                rules={CustomersValidator.fullName("Nom complet")}
            >
                <Input maxLength={100} placeholder="Nom complet" />
            </Item>

            <Item name="email" label="Email" rules={CustomersValidator.email("Email")}>
                <Input
                    maxLength={200}
                    placeholder="Adresse e-mail"
                    disabled={formContext === "EDIT"}
                />
            </Item>

            <Item name="phone" label="Téléphone" rules={CustomersValidator.phone("Téléphone")}>
                <Input maxLength={20} placeholder="Numéro de téléphone" />
            </Item>

            <Item
                name="company"
                label="Entreprise"
                rules={CustomersValidator.company("Entreprise")}
            >
                <Input maxLength={100} placeholder="Entreprise / Label" />
            </Item>

            <Item name="notes" label="Notes" rules={CustomersValidator.notes("Notes")}>
                <TextArea
                    showCount
                    maxLength={500}
                    placeholder="Notes internes"
                    autoSize={{ minRows: 3 }}
                />
            </Item>
        </Form>
    );
};

export default CustomerForm;
