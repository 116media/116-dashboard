import type { FormInstance } from "antd";
import { Form, Input } from "antd";
import type { FC } from "react";
import type { ICreatePackageCredentials } from "@/modules/catalog/presentation/model/ICreatePackageCredentials";
import { PackagesValidator } from "@/modules/catalog/presentation/utils/validators/catalog.packages.validator";
import type { Failure } from "@/shared/domain/failures/failure";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";

const { Item } = Form;
const { TextArea } = Input;

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
 * Renders name and description fields with client-side validation
 * matching backend constraints. The package price is derived from
 * the required slots' category tier prices — not set manually.
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
        </Form>
    );
};

export default PackageForm;
