import { Flex, Segmented, Typography, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { type FC, useState } from "react";
import { IconInboxOutlined } from "@/shared/presentation/ui/Icons";
import { type IUploadPreset, isCroppableFile } from "../presets";
import styles from "./index.module.scss";

const { Dragger } = Upload;
const { Text } = Typography;

interface IAspectOption {
    label: string;
    value: number;
}

const ASPECT_OPTIONS: IAspectOption[] = [
    { label: "Libre", value: 0 },
    { label: "1:1", value: 1 },
    { label: "4:3", value: 4 / 3 },
    { label: "16:9", value: 16 / 9 },
    { label: "3:2", value: 3 / 2 },
    { label: "9:16", value: 9 / 16 }
];

interface IDropZoneProps {
    preset: IUploadPreset;
    disabled?: boolean;
    aspectRatio: number;
    onBeforeUpload: (file: File) => boolean | Promise<boolean>;
}

/**
 * Drag-and-drop zone with optional image crop wrapper.
 *
 * @component
 *
 * @description
 * Renders an Ant Design Dragger for file selection. When the preset
 * supports cropping, wraps with `antd-img-crop` which shows a crop
 * modal with a segmented aspect ratio picker (Libre, 1:1, 4:3, 16:9,
 * 3:2, 9:16). Skips cropping for GIF and PDF via `beforeCrop`.
 */
const DropZone: FC<IDropZoneProps> = ({
    preset,
    disabled = false,
    aspectRatio,
    onBeforeUpload
}) => {
    const [selectedAspect, setSelectedAspect] = useState(aspectRatio);

    const dragger = (
        <Dragger
            maxCount={1}
            disabled={disabled}
            accept={preset.accept}
            showUploadList={false}
            beforeUpload={onBeforeUpload as unknown as (file: File) => boolean}
        >
            <Flex vertical align="center" gap={8} className={styles.dropZone__content}>
                <IconInboxOutlined className={styles.dropZone__icon} />
                <Text>
                    <Text strong>Cliquer pour importer</Text> ou glisser-déposer
                </Text>
                <Text type="secondary" className={styles.dropZone__hint}>
                    {preset.hint}
                </Text>
            </Flex>
        </Dragger>
    );

    if (!preset.croppable) return dragger;

    const closestOption = ASPECT_OPTIONS.reduce((prev, curr) =>
        Math.abs(curr.value - selectedAspect) < Math.abs(prev.value - selectedAspect) ? curr : prev
    );

    return (
        <Flex vertical gap={12}>
            <Segmented
                block
                size="middle"
                className={styles.dropZone__aspectRatio}
                value={closestOption.value}
                onChange={(val) => setSelectedAspect(val as number)}
                options={ASPECT_OPTIONS.map((opt) => ({
                    label: opt.label,
                    value: opt.value
                }))}
            />
            <ImgCrop
                quality={1}
                showReset
                rotationSlider
                modalWidth={620}
                modalOk="Confirmer"
                modalCancel="Annuler"
                resetText="Réinitialiser"
                modalTitle="Recadrer l'image"
                aspect={selectedAspect || undefined}
                beforeCrop={(file) => isCroppableFile(file.name, preset)}
            >
                {dragger}
            </ImgCrop>
        </Flex>
    );
};

export default DropZone;
