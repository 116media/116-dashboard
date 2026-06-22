import type { ChangeEvent, FC } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
    IconCloseCircleFilled,
    IconMutedOutlined,
    IconSoundOutlined
} from "@/shared/presentation/ui/Icons";
import VideoPlayer from "@/shared/presentation/ui/VideoPlayer";

import styles from "./index.module.scss";

/**
 * Plyr controls shown in the preview: the large center play button, the
 * play/pause toggle, the seek (progress) bar, and the current time. Volume
 * and mute are provided by a custom control in the overlay's top-left corner,
 * so they are excluded from the player's own control bar.
 */
const PREVIEW_CONTROLS = ["play-large", "play", "progress", "current-time"];

/**
 * Initial playback volume (0 to 1) applied when the réel loads.
 */
const DEFAULT_VOLUME = 0.8;

/**
 * Props for the VideoPreview component.
 *
 * @interface IVideoPreviewProps
 * @property {boolean} open - Whether the preview overlay is visible
 * @property {string | null} [src] - Direct video file URL to play
 * @property {string | null} [poster] - Optional poster shown before playback
 * @property {() => void} onClose - Called when the user dismisses the overlay
 * (mask click, close button, or Escape key)
 */
interface IVideoPreviewProps {
    open: boolean;
    src?: string | null;
    poster?: string | null;
    onClose: () => void;
}

/**
 * Full-screen lightbox that plays a vertical short inline.
 *
 * @component
 *
 * @description
 * Mirrors the Ant Design image-preview overlay, adapted for a réel: a dark
 * masked, portal-rendered overlay with the video centered in a vertical
 * (9:16) player. Playback starts unmuted; a custom mute toggle and horizontal
 * volume slider sit in the top-left corner. The overlay closes on a mask
 * click, the close button, or the Escape key, and locks body scroll while open.
 *
 * @param {IVideoPreviewProps} props - Component props
 * @returns {JSX.Element | null} The preview overlay, or null when closed
 */
const VideoPreview: FC<IVideoPreviewProps> = ({ open, src, poster, onClose }) => {
    const stageRef = useRef<HTMLDivElement>(null);
    const [muted, setMuted] = useState(false);
    const [volume, setVolume] = useState(DEFAULT_VOLUME);

    /**
     * Pushes the current mute/volume state onto the underlying media element.
     * Plyr controls the same <video> node, so it reflects these changes and
     * this overrides any muted/volume value Plyr restores from its storage.
     */
    const applyAudio = useCallback(() => {
        const video = stageRef.current?.querySelector("video");
        if (!video) return;

        video.muted = muted;
        video.volume = volume;
    }, [muted, volume]);

    useEffect(() => {
        applyAudio();
    }, [applyAudio]);

    useEffect(() => {
        if (!open) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [open, onClose]);

    const toggleMute = () => setMuted((previous) => !previous);

    const onVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
        const next = Number(event.target.value);
        setVolume(next);
        setMuted(next === 0);
    };

    if (!open || !src) return null;

    const isSilent = muted || volume === 0;

    return createPortal(
        <div
            role="dialog"
            aria-modal="true"
            aria-label="Aperçu du réel"
            className={styles.videoPreview}
        >
            <button
                type="button"
                onClick={onClose}
                aria-label="Fermer l'aperçu"
                className={styles.videoPreview__mask}
            />

            <div ref={stageRef} className={styles.videoPreview__stage}>
                <div className={styles.videoPreview__audio}>
                    <button
                        type="button"
                        onClick={toggleMute}
                        aria-label={isSilent ? "Activer le son" : "Couper le son"}
                        className={styles.videoPreview__muteButton}
                    >
                        {isSilent ? <IconMutedOutlined /> : <IconSoundOutlined />}
                    </button>

                    <input
                        min={0}
                        max={1}
                        step={0.05}
                        type="range"
                        aria-label="Volume"
                        onChange={onVolumeChange}
                        value={isSilent ? 0 : volume}
                        className={styles.videoPreview__volume}
                    />
                </div>

                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Fermer"
                    className={styles.videoPreview__close}
                >
                    <IconCloseCircleFilled />
                </button>

                <VideoPlayer
                    src={src}
                    poster={poster}
                    onReady={applyAudio}
                    ratio="9:16"
                    controls={PREVIEW_CONTROLS}
                />
            </div>
        </div>,
        document.body
    );
};

export default VideoPreview;
