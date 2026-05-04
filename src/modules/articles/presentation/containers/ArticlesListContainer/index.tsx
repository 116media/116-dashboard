import { Table } from "antd";
import { type FC, useEffect } from "react";
import { ArticleImageType } from "@/modules/articles/domain/enums/article-image-type.enum";
import ArticleDetailsForm from "@/modules/articles/presentation/components/forms/ArticleDetailsForm";
import { articlesTableColumns } from "@/modules/articles/presentation/components/tables/ArticlesTable/columns";
import ArticleCreateWizard from "@/modules/articles/presentation/components/ui/ArticleCreateWizard";
import ArticleSeoModal from "@/modules/articles/presentation/components/ui/ArticleSeoModal";
import ArticleTagsModal from "@/modules/articles/presentation/components/ui/ArticleTagsModal";
import ArticleWorkflowModal from "@/modules/articles/presentation/components/ui/ArticleWorkflowModal";
import { ARTICLE_STATUS_OPTIONS } from "@/modules/articles/presentation/constants/articles.status";
import { useArticleModals } from "@/modules/articles/presentation/hooks/UseArticleModals";
import { useArticlesList } from "@/modules/articles/presentation/hooks/UseArticlesList";
import { useArticleWorkflow } from "@/modules/articles/presentation/hooks/UseArticleWorkflow";
import { useUpdateArticle } from "@/modules/articles/presentation/hooks/UseUpdateArticle";
import { useUpdateArticleSeo } from "@/modules/articles/presentation/hooks/UseUpdateArticleSeo";
import { useUpdateArticleTags } from "@/modules/articles/presentation/hooks/UseUpdateArticleTags";
import { useUploadArticleImage } from "@/modules/articles/presentation/hooks/UseUploadArticleImage";
import { useAuthorization } from "@/modules/auth/presentation/hooks/UseAuthorization";
import { getAllCategoriesAction } from "@/modules/catalog/presentation/store/getallcategories.action";
import { getAllCustomersAction } from "@/modules/catalog/presentation/store/getallcustomers.action";
import { getTagsAction } from "@/modules/lookup/presentation/store/gettags.action";
import { useResizableColumns } from "@/shared/presentation/hooks/UseResizableColumns";
import { useAppDispatch } from "@/shared/presentation/store/store";
import CreateEditModal from "@/shared/presentation/ui/CreateEditModal";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";
import { IconFileTextOutlined } from "@/shared/presentation/ui/Icons";
import PageHeader from "@/shared/presentation/ui/PageHeader";
import ResizableTitle from "@/shared/presentation/ui/ResizableTable";
import TableToolbar from "@/shared/presentation/ui/TableToolbar";

/**
 * Container for the articles list page.
 *
 * @component
 *
 * @description
 * Orchestrates the articles table, create/edit modals, workflow
 * confirmation modal, SEO modal, tags modal, and image upload modal.
 * Fetches lookup data (categories, tags) on mount for form dropdowns.
 * Uses server-side pagination and status filtering.
 */
const ArticlesListContainer: FC = () => {
    const dispatch = useAppDispatch();
    const list = useArticlesList();
    const modals = useArticleModals(list.reload);
    const updateArticle = useUpdateArticle(modals.selectedEntity, list.reload);
    const updateSeo = useUpdateArticleSeo(modals.selectedEntity, list.reload);
    const updateTags = useUpdateArticleTags(modals.selectedEntity, list.reload);
    const uploadImage = useUploadArticleImage();
    const workflow = useArticleWorkflow(list.reload);
    const { isSuperAdmin, isAdminOrSuperAdmin } = useAuthorization();

    useEffect(() => {
        dispatch(getAllCategoriesAction({ pageIndex: 0, pageSize: 100 }));
        dispatch(getAllCustomersAction({ pageIndex: 0, pageSize: 100 }));
        dispatch(getTagsAction());
    }, [dispatch]);

    const { columns: tableColumns } = useResizableColumns(
        articlesTableColumns(modals.handleAction, isSuperAdmin, isAdminOrSuperAdmin)
    );

    return (
        <>
            <ErrorAlert banner showIcon closable error={list.error} onClose={list.reload} />

            <PageHeader
                title="Articles"
                createLabel="Créer un article"
                icon={<IconFileTextOutlined />}
                subtitle="Gérer les articles éditoriaux."
                onCreate={isSuperAdmin ? () => modals.setCreateOpen(true) : undefined}
            />

            <TableToolbar
                onSearch={list.onSearch}
                searchLoading={list.loading}
                searchValue={list.searchValue}
                statusFilter={list.statusFilter}
                onSearchChange={list.onSearchChange}
                statusOptions={ARTICLE_STATUS_OPTIONS}
                onStatusFilterChange={list.onStatusFilterChange}
            />

            <Table
                rowKey="id"
                scroll={{ x: "200" }}
                loading={list.loading}
                columns={tableColumns}
                dataSource={list.articles?.items ?? []}
                components={{ header: { cell: ResizableTitle } }}
                rowSelection={{ type: "checkbox", columnWidth: 36 }}
                pagination={{
                    showSizeChanger: true,
                    current: (list.articles?.pageIndex ?? 0) + 1,
                    pageSize: list.articles?.pageSize ?? 10,
                    total: list.articles?.count ?? 0,
                    onChange: list.onPageChange
                }}
            />

            {modals.createOpen && (
                <ArticleCreateWizard
                    open={modals.createOpen}
                    onClose={() => modals.setCreateOpen(false)}
                    onSuccess={() => {
                        modals.setCreateOpen(false);
                        list.reload();
                    }}
                />
            )}

            <CreateEditModal
                width={600}
                formContext="EDIT"
                open={modals.editOpen}
                loading={updateArticle.loading || updateArticle.detailLoading}
                success={updateArticle.success}
                onClose={() => {
                    modals.setEditOpen(false);
                    updateArticle.resetUpdate();
                    list.reload();
                }}
                onSubmit={() => updateArticle.form.submit()}
                afterClose={() => updateArticle.resetUpdate()}
                title={{
                    create: "Créer un article",
                    edit: "Modifier l'article"
                }}
                onSuccessClose={() => {
                    modals.setEditOpen(false);
                    updateArticle.resetUpdate();
                    list.reload();
                }}
            >
                <ArticleDetailsForm
                    form={updateArticle.form}
                    error={updateArticle.error}
                    orderItems={updateArticle.orderItems}
                    onSubmit={updateArticle.onSubmit}
                    onCoverUpload={async (file) => {
                        const entityId = modals.selectedEntity?.id;
                        if (!entityId) return "";
                        const url = await uploadImage.onUpload(
                            entityId,
                            file,
                            ArticleImageType.Cover
                        );
                        return url ?? "";
                    }}
                />
            </CreateEditModal>

            <ArticleWorkflowModal
                open={modals.actionOpen}
                loading={workflow.loading}
                error={workflow.error}
                action={modals.currentAction}
                article={modals.selectedEntity}
                onConfirm={() =>
                    modals.handleActionConfirm({
                        submit: workflow.onSubmit,
                        approve: workflow.onApprove,
                        publish: workflow.onPublish,
                        reject: async () => {},
                        archive: workflow.onArchive,
                        delete: workflow.onDelete
                    })
                }
                onRejectSubmit={async (values) => {
                    if (!modals.selectedEntity) return;
                    const success = await workflow.onReject({
                        id: modals.selectedEntity.id,
                        data: values
                    });
                    if (success) modals.setActionOpen(false);
                }}
                onCancel={() => modals.setActionOpen(false)}
            />

            <ArticleSeoModal
                open={modals.seoOpen}
                form={updateSeo.form}
                loading={updateSeo.loading}
                success={updateSeo.success}
                error={updateSeo.error}
                onSubmit={updateSeo.onSubmit}
                onReset={() => updateSeo.resetSeo()}
                onCancel={() => {
                    modals.setSeoOpen(false);
                    updateSeo.resetSeo();
                }}
                onSuccessClose={() => {
                    modals.setSeoOpen(false);
                    updateSeo.resetSeo();
                    list.reload();
                }}
            />

            <ArticleTagsModal
                open={modals.tagsOpen}
                loading={updateTags.loading}
                success={updateTags.success}
                tagNames={updateTags.tagNames}
                onTagsChange={updateTags.onTagsChange}
                onSubmit={updateTags.onSubmit}
                onCancel={() => {
                    modals.setTagsOpen(false);
                    updateTags.resetTags();
                }}
                onSuccessClose={() => {
                    modals.setTagsOpen(false);
                    updateTags.resetTags();
                    list.reload();
                }}
            />
        </>
    );
};

export default ArticlesListContainer;
