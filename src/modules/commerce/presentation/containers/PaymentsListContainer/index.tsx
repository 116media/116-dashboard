import { Table } from "antd";
import type { FC } from "react";
import { useNavigate } from "react-router";
import type { IOrderSummaryEntity } from "@/modules/commerce/domain/entities/IOrderSummaryEntity";
import { paymentsTableColumns } from "@/modules/commerce/presentation/components/tables/PaymentsTable/columns";
import { usePendingPaymentsList } from "@/modules/commerce/presentation/hooks/UsePendingPaymentsList";
import { ORDERS_PATH } from "@/shared/presentation/constants/paths";
import { useResizableColumns } from "@/shared/presentation/hooks/UseResizableColumns";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";
import { IconCreditCardOutlined } from "@/shared/presentation/ui/Icons";
import PageHeader from "@/shared/presentation/ui/PageHeader";
import ResizableTitle from "@/shared/presentation/ui/ResizableTable";

/**
 * Container for the pending payments list view.
 *
 * @component
 *
 * @description
 * Displays orders awaiting payment verification. Clicking an order
 * navigates to the order detail page where the admin can attach
 * proof, verify, or reject the payment.
 */
const PaymentsListContainer: FC = () => {
    const navigate = useNavigate();
    const list = usePendingPaymentsList();

    const handleView = (order: IOrderSummaryEntity) => {
        navigate(`${ORDERS_PATH}/${order.id}`);
    };

    const { columns: tableColumns } = useResizableColumns(paymentsTableColumns(handleView));

    return (
        <>
            <ErrorAlert banner showIcon closable error={list.error} onClose={list.reload} />

            <PageHeader
                title="Paiements"
                subtitle="Commandes en attente de vérification de paiement."
                icon={<IconCreditCardOutlined />}
            />

            <Table
                rowKey="id"
                scroll={{ x: "200" }}
                loading={list.loading}
                columns={tableColumns}
                dataSource={list.orders?.items ?? []}
                components={{ header: { cell: ResizableTitle } }}
                rowSelection={{ type: "checkbox", columnWidth: 36 }}
                pagination={{
                    showSizeChanger: true,
                    current: (list.orders?.pageIndex ?? 0) + 1,
                    pageSize: list.orders?.pageSize ?? 10,
                    total: list.orders?.count ?? 0,
                    onChange: list.onPageChange
                }}
            />
        </>
    );
};

export default PaymentsListContainer;
