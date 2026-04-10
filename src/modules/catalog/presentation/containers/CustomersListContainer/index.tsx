import { Table } from "antd";
import { type FC, useCallback, useState } from "react";
import { useAuthorization } from "@/modules/auth/presentation/hooks/UseAuthorization";
import type { ICustomerEntity } from "@/modules/catalog/domain/entities/ICustomerEntity";
import CustomerForm from "@/modules/catalog/presentation/components/forms/CustomerForm";
import type { CustomerAction } from "@/modules/catalog/presentation/components/tables/CustomersTable/columns";
import { customersTableColumns } from "@/modules/catalog/presentation/components/tables/CustomersTable/columns";
import { useCreateCustomer } from "@/modules/catalog/presentation/hooks/UseCreateCustomer";
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
    const createCustomer = useCreateCustomer(list.reload);
    const [selectedEntity, setSelectedEntity] = useState<ICustomerEntity | null>(null);
    const updateCustomer = useUpdateCustomer(selectedEntity, list.reload);

    const [createOpen, setCreateOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);

    const { isAdminOrSuperAdmin } = useAuthorization();

    const handleAction = useCallback((_action: CustomerAction, entity: ICustomerEntity) => {
        setSelectedEntity(entity);
        setEditOpen(true);
    }, []);

    const { columns: tableColumns } = useResizableColumns(
        customersTableColumns(handleAction, isAdminOrSuperAdmin)
    );

    return (
        <>
            <ErrorAlert banner showIcon closable error={list.error} onClose={list.reload} />

            <PageHeader
                title="Clients"
                subtitle="Gérer les clients B2B."
                icon={<IconTeamOutlined />}
                onCreate={isAdminOrSuperAdmin ? () => setCreateOpen(true) : undefined}
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
                loading={list.loading}
                dataSource={list.customers?.items ?? []}
                columns={tableColumns}
                components={{ header: { cell: ResizableTitle } }}
                rowSelection={{ type: "checkbox", columnWidth: 36 }}
                scroll={{ x: "max-content" }}
                pagination={{
                    showSizeChanger: true,
                    current: (list.customers?.pageIndex ?? 0) + 1,
                    pageSize: list.customers?.pageSize ?? 10,
                    total: list.customers?.count ?? 0,
                    onChange: list.onPageChange
                }}
            />

            {createOpen && (
                <CreateEditModal
                    width={520}
                    open={createOpen}
                    formContext="CREATE"
                    loading={createCustomer.loading}
                    success={createCustomer.success}
                    onClose={() => setCreateOpen(false)}
                    onSubmit={() => createCustomer.form.submit()}
                    title={{
                        create: "Créer un client",
                        edit: "Modifier le client"
                    }}
                    onSuccessClose={() => {
                        setCreateOpen(false);
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

            {editOpen && (
                <CreateEditModal
                    width={520}
                    open={editOpen}
                    formContext="EDIT"
                    loading={updateCustomer.loading}
                    success={updateCustomer.success}
                    onClose={() => {
                        setEditOpen(false);
                        updateCustomer.resetUpdate();
                    }}
                    onSubmit={() => updateCustomer.form.submit()}
                    title={{
                        create: "Créer un client",
                        edit: "Modifier le client"
                    }}
                    onSuccessClose={() => {
                        setEditOpen(false);
                        updateCustomer.resetUpdate();
                        list.reload();
                    }}
                >
                    <CustomerForm
                        formContext="EDIT"
                        form={updateCustomer.form}
                        error={updateCustomer.error}
                        initialValues={selectedEntity}
                        onSubmit={updateCustomer.onSubmit}
                    />
                </CreateEditModal>
            )}
        </>
    );
};

export default CustomersListContainer;
