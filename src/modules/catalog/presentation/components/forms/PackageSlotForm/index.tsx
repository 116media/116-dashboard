import type { FormInstance } from "antd";
import { Checkbox, Form, InputNumber, Select } from "antd";
import { type FC, useMemo } from "react";
import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";
import type { IAddPackageSlotCredentials } from "@/modules/catalog/presentation/model/IAddPackageSlotCredentials";
import { PackagesValidator } from "@/modules/catalog/presentation/utils/validators/catalog.packages.validator";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppSelector } from "@/shared/presentation/store/store";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";

const { Item } = Form;

interface IPackageSlotFormProps {
    form: FormInstance;
    error: Failure | null | undefined;
    onSubmit: (values: IAddPackageSlotCredentials) => void;
}

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

            <Item name="isRequired" valuePropName="checked">
                <Checkbox>Obligatoire</Checkbox>
            </Item>

            <Item
                name="quantity"
                label="Quantité"
                rules={PackagesValidator.quantity("Quantité")}
            >
                <InputNumber min={1} placeholder="Quantité" style={{ width: "100%" }} />
            </Item>
        </Form>
    );
};

export default PackageSlotForm;
