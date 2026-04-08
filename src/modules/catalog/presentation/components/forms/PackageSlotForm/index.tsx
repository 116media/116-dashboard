import type { FormInstance } from "antd";
import { Checkbox, Form, Input, InputNumber } from "antd";
import type { FC } from "react";
import type { IAddPackageSlotCredentials } from "@/modules/catalog/presentation/model/IAddPackageSlotCredentials";
import type { Failure } from "@/shared/domain/failures/failure";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";

const { Item } = Form;

/**
 * Props for the PackageSlotForm component.
 *
 * @interface IPackageSlotFormProps
 * @property {FormInstance} form - Ant Design form instance
 * @property {Failure | null | undefined} error - API error to display
 * @property {(values: IAddPackageSlotCredentials) => void} onSubmit - Form submission handler
 */
interface IPackageSlotFormProps {
    form: FormInstance;
    error: Failure | null | undefined;
    onSubmit: (values: IAddPackageSlotCredentials) => void;
}

/**
 * Form for adding a slot to a package.
 *
 * @component
 *
 * @description
 * Renders categoryId, isRequired, and quantity fields. This is
 * always a create-only form. The categoryId field is a simple
 * Input for now, to be replaced with a Select component later.
 * Displays API errors via `ErrorAlert`.
 *
 * @param {IPackageSlotFormProps} props - Component props
 * @returns {JSX.Element} The package slot form
 */
const PackageSlotForm: FC<IPackageSlotFormProps> = ({ form, error, onSubmit }) => {
    return (
        <Form
            form={form}
            size="large"
            layout="vertical"
            onFinish={onSubmit}
            name="package_slot_form"
            validateTrigger={["onSubmit", "onBlur"]}
        >
            <ErrorAlert error={error} showIcon closable banner={false} />

            <Item
                name="categoryId"
                label="Catégorie"
                rules={[{ required: true, message: "Catégorie est requis" }]}
            >
                <Input placeholder="ID de la catégorie" />
            </Item>

            <Item name="isRequired" valuePropName="checked">
                <Checkbox>Obligatoire</Checkbox>
            </Item>

            <Item
                name="quantity"
                label="Quantité"
                rules={[{ required: true, message: "Quantité est requis" }]}
            >
                <InputNumber min={1} placeholder="Quantité" style={{ width: "100%" }} />
            </Item>
        </Form>
    );
};

export default PackageSlotForm;
