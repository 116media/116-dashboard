import { Table } from "antd";
import { type FC, useEffect } from "react";
import { useAuthorization } from "@/modules/auth/presentation/hooks/UseAuthorization";
import { getAllCategoriesAction } from "@/modules/catalog/presentation/store/getallcategories.action";
import { getAllCustomersAction } from "@/modules/catalog/presentation/store/getallcustomers.action";
import { getAllPackagesAction } from "@/modules/catalog/presentation/store/getallpackages.action";
import OrderForm from "@/modules/commerce/presentation/components/forms/OrderForm";
import OrderItemForm from "@/modules/commerce/presentation/components/forms/OrderItemForm";
import { ordersTableColumns } from "@/modules/commerce/presentation/components/tables/OrdersTable/columns";
import OrderActionModal from "@/modules/commerce/presentation/components/ui/OrderActionModal";
import { ORDER_STATUS_OPTIONS } from "@/modules/commerce/presentation/constants/commerce.orders.status";
import { useAddOrderItem } from "@/modules/commerce/presentation/hooks/UseAddOrderItem";
import { useCreateOrder } from "@/modules/commerce/presentation/hooks/UseCreateOrder";
import { useOrderActions } from "@/modules/commerce/presentation/hooks/UseOrderActions";
import { useOrderModals } from "@/modules/commerce/presentation/hooks/UseOrderModals";
import { useOrdersList } from "@/modules/commerce/presentation/hooks/UseOrdersList";
import { getPromotionLevelsAction } from "@/modules/lookup/presentation/store/getpromotionlevels.action";
import { useResizableColumns } from "@/shared/presentation/hooks/UseResizableColumns";
import { useAppDispatch } from "@/shared/presentation/store/store";
import CreateEditModal from "@/shared/presentation/ui/CreateEditModal";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";
import { IconOrderedListOutlined } from "@/shared/presentation/ui/Icons";
import PageHeader from "@/shared/presentation/ui/PageHeader";
import ResizableTitle from "@/shared/presentation/ui/ResizableTable";
import TableToolbar from "@/shared/presentation/ui/TableToolbar";

/**
 * Container for the orders list view.
 *
 * @component
 *
 * @description
 * Orchestrates the orders table, create-order modal, add-item modal,
 * and action confirmation modal. Fetches lookup data (customers,
 * packages, categories, promotion levels) on mount for form Select
 * dropdowns. Uses server-side pagination and status filtering.
 */
const OrdersListContainer: FC = () => {
    const dispatch = useAppDispatch();
    const list = useOrdersList();
    const modals = useOrderModals(list.reload);
    const createOrder = useCreateOrder(list.reload);
    const addItem = useAddOrderItem(modals.selectedEntity?.id ?? null, list.reload);
    const actions = useOrderActions(list.reload);
    const { isSuperAdmin, isAdminOrSuperAdmin } = useAuthorization();

    useEffect(() => {
        dispatch(getAllCustomersAction({ pageIndex: 0, pageSize: 100 }));
        dispatch(getAllPackagesAction({ pageIndex: 0, pageSize: 100 }));
        dispatch(getAllCategoriesAction({ pageIndex: 0, pageSize: 100 }));
        dispatch(getPromotionLevelsAction());
    }, [dispatch]);

    const { columns: tableColumns } = useResizableColumns(
        ordersTableColumns(modals.handleAction, isSuperAdmin, isAdminOrSuperAdmin)
    );

    return (
        <>
            <ErrorAlert banner showIcon closable error={list.error} onClose={list.reload} />

            <PageHeader
                title="Commandes"
                subtitle="Gérer les commandes de contenu."
                icon={<IconOrderedListOutlined />}
                onCreate={isAdminOrSuperAdmin ? () => modals.setCreateOpen(true) : undefined}
                createLabel="Créer une commande"
            />

            <TableToolbar
                statusFilter={list.statusFilter}
                onStatusFilterChange={list.onStatusFilterChange}
                statusOptions={ORDER_STATUS_OPTIONS}
                searchValue={list.searchValue}
                onSearchChange={list.onSearchChange}
                onSearch={list.onSearch}
                searchLoading={list.loading}
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

            {modals.createOpen && (
                <CreateEditModal
                    width={480}
                    formContext="CREATE"
                    open={modals.createOpen}
                    loading={createOrder.loading}
                    success={createOrder.success}
                    onSubmit={() => createOrder.form.submit()}
                    onClose={() => modals.setCreateOpen(false)}
                    afterClose={() => createOrder.resetCreate()}
                    title={{
                        create: "Créer une commande",
                        edit: "Modifier la commande"
                    }}
                    onSuccessClose={() => {
                        modals.setCreateOpen(false);
                        createOrder.resetCreate();
                        list.reload();
                    }}
                >
                    <OrderForm
                        form={createOrder.form}
                        error={createOrder.error}
                        onSubmit={createOrder.onSubmit}
                    />
                </CreateEditModal>
            )}

            {modals.addItemOpen && (
                <CreateEditModal
                    width={480}
                    formContext="CREATE"
                    open={modals.addItemOpen}
                    loading={addItem.loading}
                    success={addItem.success}
                    onSubmit={() => addItem.form.submit()}
                    onClose={() => modals.setAddItemOpen(false)}
                    afterClose={() => addItem.resetAddItem()}
                    title={{
                        create: "Ajouter un produit",
                        edit: "Ajouter un produit"
                    }}
                    onSuccessClose={() => {
                        modals.setAddItemOpen(false);
                        addItem.resetAddItem();
                        list.reload();
                    }}
                >
                    <OrderItemForm
                        form={addItem.form}
                        error={addItem.error}
                        onSubmit={addItem.onSubmit}
                    />
                </CreateEditModal>
            )}

            <OrderActionModal
                open={modals.actionOpen}
                order={modals.selectedEntity}
                action={modals.currentAction}
                loading={actions.loading}
                error={actions.error}
                onConfirm={() =>
                    modals.handleActionConfirm({
                        submit: actions.onSubmit,
                        cancel: actions.onCancel
                    })
                }
                onCancel={() => modals.setActionOpen(false)}
                onAfterClose={actions.resetActionError}
            />
        </>
    );
};

export default OrdersListContainer;
