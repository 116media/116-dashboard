import { Button, Divider, Flex, Form, Input, Modal, Steps, Typography } from "antd";
import type { FC } from "react";
import VideoInfoForm from "@/modules/videos/presentation/components/forms/VideoInfoForm";
import VideoSeoForm from "@/modules/videos/presentation/components/forms/VideoSeoForm";
import VideoTagsForm from "@/modules/videos/presentation/components/forms/VideoTagsForm";
import VideoCreateSummary from "@/modules/videos/presentation/components/ui/VideoCreateSummary";
import { useCreateVideoWizard } from "@/modules/videos/presentation/hooks/UseCreateVideoWizard";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";
import { IconFireFilled, IconStarFilled } from "@/shared/presentation/ui/Icons";
import SwitchField from "@/shared/presentation/ui/SwitchField";
import styles from "./index.module.scss";

const { Title } = Typography;
const { Item } = Form;
const { TextArea } = Input;

interface IVideoCreateWizardProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const STEP_TITLES = ["Informations", "Contenu", "Tags & SEO", "Résumé"];

/**
 * 4-step video creation wizard modal.
 *
 * @component
 */
const VideoCreateWizard: FC<IVideoCreateWizardProps> = ({ open, onClose, onSuccess }) => {
    const wizard = useCreateVideoWizard(() => {
        wizard.reset();
        onSuccess();
    });

    const handleClose = () => {
        wizard.reset();
        onClose();
    };

    const stepContent = [
        <VideoInfoForm
            key="step1"
            form={wizard.step1Form}
            error={wizard.error}
            onSubmit={() => wizard.goNext()}
        />,
        <Form
            key="step2"
            form={wizard.step2Form}
            size="large"
            layout="vertical"
            name="video_wizard_step2"
        >
            <Item name="description" label="Description">
                <TextArea
                    rows={4}
                    showCount
                    maxLength={2000}
                    placeholder="Description de la vidéo"
                />
            </Item>

            <Item name="socialBoost" valuePropName="checked">
                <SwitchField
                    icon={<IconFireFilled />}
                    title="Boost social"
                    description="Promouvoir cette vidéo sur les réseaux sociaux."
                />
            </Item>

            <Item name="isFeatured" valuePropName="checked">
                <SwitchField
                    icon={<IconStarFilled />}
                    title="En vedette"
                    description="Afficher cette vidéo en avant sur la page d'accueil."
                />
            </Item>
        </Form>,
        <Flex key="step3" vertical gap={24}>
            <div>
                <Title level={5}>Tags</Title>
                <VideoTagsForm tagIds={wizard.tagIds} onTagsChange={wizard.onTagsChange} />
            </div>
            <Divider />
            <div>
                <Title level={5}>SEO</Title>
                <VideoSeoForm form={wizard.seoForm} error={wizard.error} onSubmit={() => {}} />
            </div>
        </Flex>,
        <VideoCreateSummary key="step4" video={wizard.video} />
    ];

    return (
        <Modal
            centered
            open={open}
            width={700}
            destroyOnHidden
            onCancel={handleClose}
            title="Créer une vidéo"
            footer={
                <Flex justify="space-between">
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
                current={wizard.currentStep}
                className={styles.videoWizard__steps}
                items={STEP_TITLES.map((title) => ({ title }))}
            />

            <ErrorAlert error={wizard.error} banner showIcon closable={false} />

            <div className={styles.videoWizard__content}>{stepContent[wizard.currentStep]}</div>
        </Modal>
    );
};

export default VideoCreateWizard;
