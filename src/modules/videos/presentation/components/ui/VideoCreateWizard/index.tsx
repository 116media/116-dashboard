import { Button, Divider, Flex, Modal, Steps, Typography } from "antd";
import type { FC } from "react";
import { useState } from "react";
import { usePaidOrderItems } from "@/modules/commerce/presentation/hooks/UsePaidOrderItems";
import VideoContentForm from "@/modules/videos/presentation/components/forms/VideoContentForm";
import VideoInfoForm from "@/modules/videos/presentation/components/forms/VideoInfoForm";
import VideoSeoForm from "@/modules/videos/presentation/components/forms/VideoSeoForm";
import VideoTagsForm from "@/modules/videos/presentation/components/forms/VideoTagsForm";
import VideoCreateSummary from "@/modules/videos/presentation/components/ui/VideoCreateSummary";
import { useCreateVideoWizard } from "@/modules/videos/presentation/hooks/UseCreateVideoWizard";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";
import styles from "./index.module.scss";

const { Title } = Typography;

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
    const orderItems = usePaidOrderItems("video");

    const [socialBoostLocked, setSocialBoostLocked] = useState(false);

    const handleClose = () => {
        wizard.reset();
        setSocialBoostLocked(false);
        onClose();
    };

    const stepContent = [
        <VideoInfoForm
            key="step1"
            form={wizard.step1Form}
            error={wizard.error}
            orderItems={orderItems}
            onSubmit={() => wizard.goNext()}
            onOrderItemChange={(option) => {
                setSocialBoostLocked(option !== undefined);
                wizard.step2Form.setFieldValue("socialBoost", option?.socialBoost ?? false);
            }}
        />,
        <VideoContentForm
            key="step2"
            form={wizard.step2Form}
            socialBoostLocked={socialBoostLocked}
        />,
        <Flex key="step3" vertical gap={24}>
            <div>
                <Title level={5}>Tags</Title>
                <VideoTagsForm tagNames={wizard.tagNames} onTagsChange={wizard.onTagsChange} />
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
                size="small"
                titlePlacement="vertical"
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
