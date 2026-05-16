import { Button, Divider, Flex, Modal, Steps, Typography } from "antd";
import type { FC } from "react";
import ArticleBodyForm from "@/modules/articles/presentation/components/forms/ArticleBodyForm";
import ArticleInfoForm from "@/modules/articles/presentation/components/forms/ArticleInfoForm";
import ArticleSeoForm from "@/modules/articles/presentation/components/forms/ArticleSeoForm";
import ArticleTagsForm from "@/modules/articles/presentation/components/forms/ArticleTagsForm";
import ArticleCreateSummary from "@/modules/articles/presentation/components/ui/ArticleCreateSummary";
import { useCreateArticleWizard } from "@/modules/articles/presentation/hooks/UseCreateArticleWizard";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";
import styles from "./index.module.scss";

const { Title } = Typography;

interface IArticleCreateWizardProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const STEP_TITLES = ["Informations", "Contenu", "Tags & SEO", "Résumé"];

/**
 * 4-step article creation wizard modal.
 *
 * @component
 *
 * @description
 * Orchestrates the multi-step creation flow using Ant Design Steps.
 * Step 1 creates the draft, Step 2 fills content with rich text editor,
 * Step 3 assigns tags and SEO, Step 4 shows a summary with submit button.
 */
const ArticleCreateWizard: FC<IArticleCreateWizardProps> = ({ open, onClose, onSuccess }) => {
    const wizard = useCreateArticleWizard(() => {
        wizard.reset();
        onSuccess();
    });

    const handleClose = () => {
        wizard.reset();
        onClose();
    };

    const stepContent = [
        <ArticleInfoForm
            key="step1"
            error={wizard.error}
            form={wizard.step1Form}
            onSubmit={() => wizard.goNext()}
        />,
        <ArticleBodyForm
            key="step2"
            error={wizard.error}
            form={wizard.step2Form}
            onSubmit={() => wizard.goNext()}
            onImageUpload={wizard.onImageUpload}
            onCoverUpload={wizard.onCoverUpload}
        />,
        <Flex key="step3" vertical gap={24}>
            <div>
                <Title level={5}>Tags</Title>
                <ArticleTagsForm tagIds={wizard.tagIds} onTagsChange={wizard.onTagsChange} />
            </div>
            <Divider />
            <div>
                <Title level={5}>SEO</Title>
                <ArticleSeoForm form={wizard.seoForm} error={wizard.error} onSubmit={() => {}} />
            </div>
        </Flex>,
        <ArticleCreateSummary key="step4" article={wizard.article} />
    ];

    return (
        <Modal
            centered
            open={open}
            width={600}
            destroyOnHidden
            onCancel={handleClose}
            title="Créer un article"
            footer={
                <Flex justify="space-between" flex={1}>
                    <Button onClick={handleClose} danger>
                        Annuler
                    </Button>
                    <Flex gap={8}>
                        {wizard.currentStep > 0 && (
                            <Button onClick={wizard.goBack} disabled={wizard.loading}>
                                Précédent
                            </Button>
                        )}

                        {wizard.currentStep < 3 ? (
                            <Button type="primary" loading={wizard.loading} onClick={wizard.goNext}>
                                Suivant
                            </Button>
                        ) : (
                            <Button
                                type="primary"
                                loading={wizard.loading}
                                onClick={wizard.onSubmit}
                            >
                                Soumettre
                            </Button>
                        )}
                    </Flex>
                </Flex>
            }
        >
            <Steps
                titlePlacement="vertical"
                current={wizard.currentStep}
                className={styles.articleWizard__steps}
                items={STEP_TITLES.map((title) => ({ title }))}
            />

            <ErrorAlert error={wizard.error} banner showIcon closable={false} />

            <div className={styles.articleWizard__content}>{stepContent[wizard.currentStep]}</div>
        </Modal>
    );
};

export default ArticleCreateWizard;
