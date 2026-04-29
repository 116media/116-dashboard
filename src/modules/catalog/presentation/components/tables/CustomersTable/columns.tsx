import { Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { ICustomerEntity } from "@/modules/catalog/domain/entities/ICustomerEntity";
import {
    CUSTOMER_DROPDOWN_ITEMS,
    type CustomerAction
} from "@/modules/catalog/presentation/constants/catalog.customers.dropdown";
import type { ITableActionItem } from "@/shared/presentation/ui/TableActionDropdown";
import TableActionDropdown from "@/shared/presentation/ui/TableActionDropdown";

const { Text } = Typography;

export type { CustomerAction };

/**
 * Generates Ant Design table column definitions for the customers table.
 *
 * @description
 * Defines columns for full name, email, phone, company, and an action
 * dropdown. Mutation actions are hidden based on authorization level.
 *
 * @param onAction - Callback when a row action is triggered
 * @param isAdminOrSuperAdmin - Whether the current user is Admin or SuperAdmin
 * @returns Column configuration for the Ant Design Table
 */
export const customersTableColumns = (
    onAction: (action: CustomerAction, customer: ICustomerEntity) => void,
    isAdminOrSuperAdmin: boolean
): ColumnsType<ICustomerEntity> => [
    {
        title: "Nom complet",
        dataIndex: "fullName",
        key: "fullName",
        width: 200,
        sorter: (a, b) => a.fullName.localeCompare(b.fullName),
        render: (fullName: string) => <Text strong>{fullName}</Text>
    },
    {
        title: "Email",
        dataIndex: "email",
        key: "email",
        width: 200,
        sorter: (a, b) => a.email.localeCompare(b.email)
    },
    {
        title: "Téléphone",
        dataIndex: "phone",
        key: "phone",
        width: 150,
        render: (phone: string | null) => phone ?? <Text type="secondary">—</Text>
    },
    {
        title: "Entreprise",
        dataIndex: "company",
        key: "company",
        width: 150,
        render: (company: string | null) => company ?? <Text type="secondary">—</Text>
    },
    {
        title: "Actions",
        key: "actions",
        width: 80,
        fixed: "end",
        align: "center",
        render: (_: unknown, record: ICustomerEntity) => {
            const items: ITableActionItem[] = CUSTOMER_DROPDOWN_ITEMS.map((item) => ({
                key: item.key,
                label: item.label,
                danger: item.danger,
                hidden: item.hidden(record, false, isAdminOrSuperAdmin),
                onClick: () => onAction(item.key, record)
            }));

            return <TableActionDropdown items={items} />;
        }
    }
];
