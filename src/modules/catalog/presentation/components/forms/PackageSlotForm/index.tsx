import type { FormInstance } from "antd";
import { Form, InputNumber, Select } from "antd";
import { type FC, useMemo } from "react";
import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";
import type { IAddPackageSlotCredentials } from "@/modules/catalog/presentation/model/IAddPackageSlotCredentials";
import { PackagesValidator } from "@/modules/catalog/presentation/utils/validators/catalog.packages.validator";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppSelector } from "@/shared/presentation/store/store";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";
import { IconExclamationCircleOutlined } from "@/shared/presentation/ui/Icons";
import SwitchField from "@/shared/presentation/ui/SwitchField";

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
 * Renders a category Select (populated from the catalog store),
 * an isRequired checkbox, and a quantity InputNumber. Always
 * a create-only form with no edit mode.
 *
 * @param {IPackageSlotFormProps} props - Component props
 * @returns {JSX.Element} The package slot form
 */
const PackageSlotForm: FC<IPackageSlotFormProps> = ({ form, error, onSubmit }) => {
    const { data: categories } = useAppSelector(
        ({ catalog: { getAllCategories } }) => getAllCategories
    );

    const categoryOptions = useMemo(() => {
        const items = (categories as { items: ICategoryEntity[] } | null)?.items ?? [];
        return items
            .filter((c) => c.isActive)
            .map((c) => ({ label: `${c.name} (${c.contentTypeName})`, value: c.id }));
    }, [categories]);

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
                rules={PackagesValidator.categoryId("Catégorie")}
            >
                <Select
                    showSearch
                    options={categoryOptions}
                    placeholder="Sélectionner une catégorie"
                />
            </Item>

            <Item name="quantity" label="Quantité" rules={PackagesValidator.quantity("Quantité")}>
                <InputNumber min={1} placeholder="Quantité" />
            </Item>

            <Item name="isRequired" valuePropName="checked">
                <SwitchField
                    title="Obligatoire"
                    icon={<IconExclamationCircleOutlined />}
                    description="Ce créneau doit être rempli dans le package."
                />
            </Item>
        </Form>
    );
};

export default PackageSlotForm;
