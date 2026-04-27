import type { FormInstance } from "antd";
import { Form, Select } from "antd";
import type { FC } from "react";
import { useMemo } from "react";
import type { ICustomerEntity } from "@/modules/catalog/domain/entities/ICustomerEntity";
import type { IPackageEntity } from "@/modules/catalog/domain/entities/IPackageEntity";
import type { ICreateOrderCredentials } from "@/modules/commerce/presentation/model/ICreateOrderCredentials";
import { OrdersValidator } from "@/modules/commerce/presentation/utils/validators/commerce.orders.validator";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppSelector } from "@/shared/presentation/store/store";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";
import { SelectOptionDetail } from "@/shared/presentation/ui/SelectOptions";

const { Item } = Form;

/**
 * Props for the OrderForm component.
 *
 * @interface IOrderFormProps
 * @property {FormInstance} form - Ant Design form instance for field control
 * @property {Failure | null | undefined} error - Backend error to display in the alert
 * @property {(values: ICreateOrderCredentials) => void} onSubmit - Callback when the form is submitted
 */
interface IOrderFormProps {
    form: FormInstance;
    error: Failure | null | undefined;
    onSubmit: (values: ICreateOrderCredentials) => void;
}

/**
 * Form for creating a new order.
 *
 * @component
 *
 * @description
 * Renders customer select and optional package select fields.
 * Customer and package options are loaded from the catalog store.
 *
 * @param {IOrderFormProps} props - Component props
 * @returns {JSX.Element} The rendered order creation form
 */
const OrderForm: FC<IOrderFormProps> = ({ form, error, onSubmit }) => {
    const { data: customers } = useAppSelector(
        ({ catalog: { getAllCustomers } }) => getAllCustomers
    );
    const { data: packages } = useAppSelector(({ catalog: { getAllPackages } }) => getAllPackages);

    const customerOptions = useMemo(
        () =>
            ((customers as { items: ICustomerEntity[] })?.items ?? []).map((c) => ({
                value: c.id,
                label: c.fullName,
                secondary: c.company ?? undefined
            })),
        [customers]
    );

    const packageOptions = useMemo(
        () =>
            ((packages as { items: IPackageEntity[] })?.items ?? [])
                .filter((p) => p.isActive)
                .map((p) => ({
                    value: p.id,
                    label: p.name,
                    secondary: `$${p.calculatedPriceUsd.toFixed(2)}`
                })),
        [packages]
    );

    return (
        <Form
            form={form}
            size="large"
            layout="vertical"
            name="order_form"
            onFinish={onSubmit}
            validateTrigger={["onSubmit", "onBlur"]}
        >
            <ErrorAlert error={error} showIcon closable banner={false} />

            <Item name="customerId" label="Client" rules={OrdersValidator.customerId("Client")}>
                <Select
                    showSearch
                    options={customerOptions}
                    optionRender={SelectOptionDetail}
                    placeholder="Sélectionner un client"
                />
            </Item>

            <Item name="packageId" label="Package">
                <Select
                    showSearch
                    allowClear
                    options={packageOptions}
                    optionRender={SelectOptionDetail}
                    placeholder="Sélectionner un package"
                />
            </Item>
        </Form>
    );
};

export default OrderForm;
