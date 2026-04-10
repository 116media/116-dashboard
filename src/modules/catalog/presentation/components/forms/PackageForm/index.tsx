import type { FormInstance } from "antd";
import { Form, Input, InputNumber } from "antd";
import type { FC } from "react";
import type { ICreatePackageCredentials } from "@/modules/catalog/presentation/model/ICreatePackageCredentials";
import { PackagesValidator } from "@/modules/catalog/presentation/utils/validators/catalog.packages.validator";
import type { Failure } from "@/shared/domain/failures/failure";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";

const { Item } = Form;
const { TextArea } = Input;

/**
 * Props for the PackageForm component.
 *
 * @interface IPackageFormProps
 * @property {FormInstance} form - Ant Design form instance
 * @property {Failure | null | undefined} error - API error to display
 * @property {(values: ICreatePackageCredentials) => void} onSubmit - Form submission handler
 */
interface IPackageFormProps {
    form: FormInstance;
    error: Failure | null | undefined;
    onSubmit: (values: ICreatePackageCredentials) => void;
}

/**
 * Form for creating a new package.
 *
 * @component
 *
 * @description
 * Renders name, description, and flatPriceUsd fields with
 * client-side validation matching the backend constraints.
 * This is a create-only form — no edit mode or initial values
 * are needed. Displays API errors via `ErrorAlert`.
 *
 * @param {IPackageFormProps} props - Component props
 * @returns {JSX.Element} The package form
 */
const PackageForm: FC<IPackageFormProps> = ({ form, error, onSubmit }) => {
    return (
        <Form
            form={form}
            size="large"
            layout="vertical"
            onFinish={onSubmit}
            name="package_form"
            validateTrigger={["onSubmit", "onBlur"]}
        >
            <ErrorAlert error={error} showIcon closable banner={false} />

            <Item name="name" label="Nom" rules={PackagesValidator.name("Nom")}>
                <Input maxLength={100} placeholder="Nom du package" />
            </Item>

            <Item
                name="description"
                label="Description"
                rules={PackagesValidator.description("Description")}
            >
                <TextArea
                    showCount
                    maxLength={500}
                    placeholder="Description du package"
                    autoSize={{ minRows: 3 }}
                />
            </Item>

            <Item
                name="flatPriceUsd"
                label="Prix forfaitaire (USD)"
                rules={PackagesValidator.flatPriceUsd("Prix forfaitaire")}
            >
                <InputNumber min={0} step={0.5} placeholder="Prix forfaitaire en USD" />
            </Item>
        </Form>
    );
};

export default PackageForm;
