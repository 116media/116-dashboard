import { Table } from "antd";
import type { FC } from "react";
import { useAuthorization } from "@/modules/auth/presentation/hooks/UseAuthorization";
import CustomerForm from "@/modules/catalog/presentation/components/forms/CustomerForm";
import { customersTableColumns } from "@/modules/catalog/presentation/components/tables/CustomersTable/columns";
import { useCreateCustomer } from "@/modules/catalog/presentation/hooks/UseCreateCustomer";
import { useCustomerModals } from "@/modules/catalog/presentation/hooks/UseCustomerModals";
import { useCustomersList } from "@/modules/catalog/presentation/hooks/UseCustomersList";
import { useUpdateCustomer } from "@/modules/catalog/presentation/hooks/UseUpdateCustomer";
import { useResizableColumns } from "@/shared/presentation/hooks/UseResizableColumns";
import CreateEditModal from "@/shared/presentation/ui/CreateEditModal";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";
import { IconTeamOutlined } from "@/shared/presentation/ui/Icons";
import PageHeader from "@/shared/presentation/ui/PageHeader";
import ResizableTitle from "@/shared/presentation/ui/ResizableTable";
import TableToolbar from "@/shared/presentation/ui/TableToolbar";

/**
 * Container for the customers list tab.
 *
 * @component
 *
 * @description
 * Orchestrates the customers table and create/edit modals.
 * Uses server-side pagination with debounced search.
 * No status filter or action modal — customers have no
 * active/inactive state.
 */
const CustomersListContainer: FC = () => {
    const list = useCustomersList();
    const modals = useCustomerModals();
    const createCustomer = useCreateCustomer(list.reload);
    const updateCustomer = useUpdateCustomer(modals.selectedEntity, list.reload);
    const { isAdminOrSuperAdmin } = useAuthorization();

    const { columns: tableColumns } = useResizableColumns(
        customersTableColumns(modals.handleAction, isAdminOrSuperAdmin)
    );

    return (
        <>
            <ErrorAlert banner showIcon closable error={list.error} onClose={list.reload} />

            <PageHeader
                title="Clients"
                subtitle="Gérer les clients B2B."
                icon={<IconTeamOutlined />}
                onCreate={isAdminOrSuperAdmin ? () => modals.setCreateOpen(true) : undefined}
                createLabel="Créer un client"
            />

            <TableToolbar
                canFilter={false}
                searchValue={list.searchValue}
                onSearchChange={list.onSearchChange}
                onSearch={list.onSearch}
                searchLoading={list.loading}
            />

            <Table
                rowKey="id"
                columns={tableColumns}
                loading={list.loading}
                scroll={{ x: "max-content" }}
                dataSource={list.customers?.items ?? []}
                components={{ header: { cell: ResizableTitle } }}
                rowSelection={{ type: "checkbox", columnWidth: 36 }}
                pagination={{
                    showSizeChanger: true,
                    current: (list.customers?.pageIndex ?? 0) + 1,
                    pageSize: list.customers?.pageSize ?? 10,
                    total: list.customers?.count ?? 0,
                    onChange: list.onPageChange
                }}
            />

            {modals.createOpen && (
                <CreateEditModal
                    width={520}
                    formContext="CREATE"
                    open={modals.createOpen}
                    loading={createCustomer.loading}
                    success={createCustomer.success}
                    onClose={() => modals.setCreateOpen(false)}
                    onSubmit={() => createCustomer.form.submit()}
                    afterClose={() => createCustomer.resetCreate()}
                    title={{
                        create: "Créer un client",
                        edit: "Modifier le client"
                    }}
                    onSuccessClose={() => {
                        modals.setCreateOpen(false);
                        createCustomer.resetCreate();
                        list.reload();
                    }}
                >
                    <CustomerForm
                        form={createCustomer.form}
                        error={createCustomer.error}
                        formContext="CREATE"
                        onSubmit={createCustomer.onSubmit}
                    />
                </CreateEditModal>
            )}

            {modals.editOpen && (
                <CreateEditModal
                    width={520}
                    formContext="EDIT"
                    open={modals.editOpen}
                    loading={updateCustomer.loading}
                    success={updateCustomer.success}
                    onClose={() => {
                        modals.setEditOpen(false);
                        updateCustomer.resetUpdate();
                    }}
                    onSubmit={() => updateCustomer.form.submit()}
                    afterClose={() => updateCustomer.resetUpdate()}
                    title={{
                        create: "Créer un client",
                        edit: "Modifier le client"
                    }}
                    onSuccessClose={() => {
                        modals.setEditOpen(false);
                        updateCustomer.resetUpdate();
                        list.reload();
                    }}
                >
                    <CustomerForm
                        formContext="EDIT"
                        form={updateCustomer.form}
                        error={updateCustomer.error}
                        initialValues={modals.selectedEntity}
                        onSubmit={updateCustomer.onSubmit}
                    />
                </CreateEditModal>
            )}
        </>
    );
};

export default CustomersListContainer;
