import { Button, Flex, Select, Table } from "antd";
import type { FC } from "react";
import { useNavigate } from "react-router";
import type { IPaymentSummaryEntity } from "@/modules/commerce/domain/entities/IPaymentSummaryEntity";
import { paymentsTableColumns } from "@/modules/commerce/presentation/components/tables/PaymentsTable/columns";
import {
    PAYMENT_METHOD_FILTER_OPTIONS,
    PAYMENT_STATUS_OPTIONS
} from "@/modules/commerce/presentation/constants/commerce.payment.status";
import { usePaymentsList } from "@/modules/commerce/presentation/hooks/UsePaymentsList";
import { ORDER_DETAIL_PATH } from "@/shared/presentation/constants/paths";
import { useResizableColumns } from "@/shared/presentation/hooks/UseResizableColumns";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";
import { IconCreditCardOutlined, IconDollarOutlined } from "@/shared/presentation/ui/Icons";
import PageHeader from "@/shared/presentation/ui/PageHeader";
import ResizableTitle from "@/shared/presentation/ui/ResizableTable";
import TableSearchInput from "@/shared/presentation/ui/TableSearchInput";
import TableStatusFilter from "@/shared/presentation/ui/TableStatusFilter";

import styles from "@/shared/presentation/ui/TableToolbar/index.module.scss";

/**
 * Container for the payments list view.
 *
 * @component
 *
 * @description
 * Displays payment records with real payment status (Pending,
 * Verified, Rejected), payment method, and customer info.
 * Defaults to showing Pending payments. Supports filtering
 * by status and payment method, search by customer info,
 * and pagination. Clicking a payment navigates to the linked
 * order detail page.
 */
const PaymentsListContainer: FC = () => {
    const navigate = useNavigate();
    const list = usePaymentsList();

    const handleView = (payment: IPaymentSummaryEntity) => {
        navigate(`${ORDER_DETAIL_PATH}/${payment.orderId}`);
    };

    const { columns: tableColumns } = useResizableColumns(paymentsTableColumns(handleView));

    return (
        <>
            <ErrorAlert banner showIcon closable error={list.error} onClose={list.reload} />

            <PageHeader
                title="Paiements"
                subtitle="Gérer les paiements des commandes."
                icon={<IconCreditCardOutlined />}
            />

            <Flex align="center" className={styles.tableToolbar} justify="space-between">
                <Flex gap={8} align="center">
                    <TableStatusFilter
                        value={list.statusFilter}
                        options={PAYMENT_STATUS_OPTIONS}
                        loading={list.loading}
                        onChange={list.onStatusFilterChange}
                    />
                    <Select
                        value={list.methodFilter}
                        loading={list.loading}
                        disabled={list.loading}
                        onChange={list.onMethodFilterChange}
                        style={{ width: 160 }}
                        prefix={<Button type="text" size="small" icon={<IconDollarOutlined />} />}
                        options={PAYMENT_METHOD_FILTER_OPTIONS.map((opt) => ({
                            value: opt.value,
                            label: opt.label
                        }))}
                    />
                </Flex>
                <TableSearchInput
                    value={list.searchValue}
                    onSearch={list.onSearch}
                    onChange={list.onSearchChange}
                    loading={list.loading}
                />
            </Flex>

            <Table
                rowKey="id"
                scroll={{ x: "300" }}
                loading={list.loading}
                columns={tableColumns}
                dataSource={list.payments?.items ?? []}
                components={{ header: { cell: ResizableTitle } }}
                rowSelection={{ type: "checkbox", columnWidth: 36 }}
                pagination={{
                    showSizeChanger: true,
                    current: (list.payments?.pageIndex ?? 0) + 1,
                    pageSize: list.payments?.pageSize ?? 10,
                    total: list.payments?.count ?? 0,
                    onChange: list.onPageChange
                }}
            />
        </>
    );
};

export default PaymentsListContainer;
