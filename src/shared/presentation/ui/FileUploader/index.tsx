import { type FC, useCallback, useMemo, useState } from "react";
import { FileUploaderNotification } from "@/shared/presentation/utils/notification/file-uploader.notification";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";
import DropZone from "./DropZone";
import FilePreview from "./FilePreview";
import type { IUploadPreset } from "./presets";
import UploadProgress from "./UploadProgress";
import { formatFileSize, isImageFile, isImageUrl } from "./utils";

/**
 * Base props shared by both upload modes.
 */
interface IFileUploaderBaseProps {
    preset: IUploadPreset;
    onRemove?: () => void;
    value?: string | null;
    label?: string;
    aspectRatio?: number;
    disabled?: boolean;
    showPreview?: boolean;
}

/**
 * Immediate mode — uploads the file on drop and returns the remote URL.
 * Used by article cover images, video thumbnails, short thumbnails.
 */
interface IImmediateUploadProps extends IFileUploaderBaseProps {
    mode?: "immediate";
    onFileSelect?: never;
    onUpload: (file: File) => Promise<string>;
}

/**
 * Deferred mode — captures the file locally without uploading.
 * The parent form handles the actual upload on submit.
 * Used by payment proof, short video creation.
 */
interface IDeferredUploadProps extends IFileUploaderBaseProps {
    mode: "deferred";
    onUpload?: never;
    onFileSelect: (file: File) => void;
}

type IFileUploaderProps = IImmediateUploadProps | IDeferredUploadProps;

/**
 * Shared file uploader with drag-and-drop and optional image cropping.
 *
 * @component
 *
 * @description
 * Reusable file upload component that adapts to different contexts
 * via presets. Supports two modes:
 *
 * - **immediate** (default): uploads the file on drop via `onUpload`,
 *   shows progress, and displays a preview of the uploaded URL.
 * - **deferred**: captures the file locally via `onFileSelect` without
 *   uploading. Shows a local blob preview. The parent form handles
 *   the actual upload on submit.
 *
 * Delegates rendering to three sub-components:
 * - `DropZone` — drag-and-drop area with optional crop wrapper
 * - `UploadProgress` — progress bar during immediate uploads
 * - `FilePreview` — image/file preview with remove button
 */
const FileUploader: FC<IFileUploaderProps> = (props) => {
    const {
        preset,
        onRemove,
        value,
        label,
        aspectRatio = 16 / 9,
        disabled = false,
        showPreview = true
    } = props;

    const isDeferred = props.mode === "deferred";
    const isVideo = useMemo(() => preset.accept.includes("video"), [preset.accept]);

    // Image-only presets render any selection (including local blob: previews) as an image,
    // since blob URLs carry no extension for isImageUrl to detect. Mixed presets that also
    // accept PDF stay false here and rely on per-file detection (isImageSelection) instead.
    const presetIsImage = useMemo(
        () => preset.accept.includes("image") && !preset.accept.includes("pdf"),
        [preset.accept]
    );

    const [progress, setProgress] = useState(0);
    const [removed, setRemoved] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [fileName, setFileName] = useState<string | null>(null);
    const [fileSize, setFileSize] = useState<string | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(value ?? null);

    // Kind of the actual selected file, used to preview a mixed preset's image vs PDF
    // correctly. Null until a file is chosen, then falls back to the initial value's kind.
    const [isImageSelection, setIsImageSelection] = useState<boolean | null>(
        value ? isImageUrl(value) : null
    );

    const maxSizeBytes = useMemo(() => preset.maxSizeMB * 1024 * 1024, [preset.maxSizeMB]);

    const handleImmediateUpload = useCallback(
        async (file: File) => {
            if (file.size > maxSizeBytes) {
                const notification = FileUploaderNotification.fileTooLarge(
                    formatFileSize(file.size),
                    formatFileSize(maxSizeBytes)
                );
                showNotification(notification);
                return false;
            }
            if (isDeferred) return false;

            setFileName(file.name);
            setFileSize(formatFileSize(file.size));
            setIsImageSelection(isImageFile(file));
            setUploading(true);
            setProgress(0);

            const interval = setInterval(() => {
                setProgress((prev) => Math.min(prev + 15, 90));
            }, 250);

            try {
                const url = await (props as IImmediateUploadProps).onUpload(file);
                clearInterval(interval);
                setProgress(100);
                setPreviewUrl(url);
                setRemoved(false);
            } catch {
                clearInterval(interval);
                setProgress(0);
                setPreviewUrl(null);
                setFileName(null);
                setFileSize(null);
            } finally {
                setUploading(false);
            }

            return false;
        },
        [props, maxSizeBytes, isDeferred]
    );

    const handleDeferredSelect = useCallback(
        (file: File) => {
            if (file.size > maxSizeBytes) {
                const notification = FileUploaderNotification.fileTooLarge(
                    formatFileSize(file.size),
                    formatFileSize(maxSizeBytes)
                );

                showNotification(notification);
                return false;
            }

            setFileName(file.name);
            setFileSize(formatFileSize(file.size));
            setIsImageSelection(isImageFile(file));
            setPreviewUrl(URL.createObjectURL(file));
            setRemoved(false);
            (props as IDeferredUploadProps).onFileSelect(file);

            return false;
        },
        [props, maxSizeBytes]
    );

    const handleBeforeUpload = useCallback(
        (file: File) => {
            if (isDeferred) return handleDeferredSelect(file);
            return handleImmediateUpload(file);
        },
        [isDeferred, handleDeferredSelect, handleImmediateUpload]
    );

    const handleRemove = useCallback(() => {
        setPreviewUrl(null);
        setFileName(null);
        setFileSize(null);
        setProgress(0);
        setRemoved(true);
        setIsImageSelection(null);
        onRemove?.();
    }, [onRemove]);

    const isImage = isImageSelection ?? presetIsImage;
    const currentPreview = removed ? null : (previewUrl ?? value);

    if (uploading) {
        return <UploadProgress fileName={fileName} fileSize={fileSize} percent={progress} />;
    }

    if (currentPreview && showPreview) {
        return (
            <FilePreview
                label={label}
                url={currentPreview}
                isVideo={isVideo}
                isImage={isImage}
                fileName={fileName}
                fileSize={fileSize}
                disabled={disabled}
                onRemove={handleRemove}
            />
        );
    }

    return (
        <DropZone
            preset={preset}
            disabled={disabled}
            aspectRatio={aspectRatio}
            onBeforeUpload={handleBeforeUpload}
        />
    );
};

export default FileUploader;
