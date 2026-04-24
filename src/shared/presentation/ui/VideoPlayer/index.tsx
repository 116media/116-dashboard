import Plyr from "plyr";
import "plyr/dist/plyr.css";
import type { FC } from "react";
import { useEffect, useRef } from "react";
import styles from "./index.module.scss";

interface IVideoPlayerProps {
    src?: string | null;
    youtubeId?: string | null;
    poster?: string | null;
    maxHeight?: number;
}

/**
 * Shared video player powered by Plyr.
 *
 * @component
 *
 * @description
 * Renders a themed video player for HTML5 video files or YouTube embeds.
 * Uses Plyr for consistent playback controls across browsers.
 * Styled to match the dashboard design system via CSS custom properties.
 */
const VideoPlayer: FC<IVideoPlayerProps> = ({ src, youtubeId, poster, maxHeight }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<Plyr | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const element = containerRef.current.querySelector(
            youtubeId ? "[data-plyr-provider]" : "video"
        );
        if (!element) return;

        playerRef.current = new Plyr(element as HTMLElement, {
            controls: [
                "play-large",
                "play",
                "progress",
                "current-time",
                "mute",
                "volume",
                "fullscreen"
            ],
            resetOnEnd: true,
            clickToPlay: true,
            hideControls: true
        });

        return () => {
            playerRef.current?.destroy();
            playerRef.current = null;
        };
    }, [youtubeId, src]);

    if (!src && !youtubeId) return null;

    return (
        <div
            className={styles.videoPlayer}
            style={maxHeight ? { maxHeight, overflow: "hidden" } : undefined}
        >
            {youtubeId ? (
                <div data-plyr-provider="youtube" data-plyr-embed-id={youtubeId} />
            ) : (
                <video playsInline controls data-poster={poster ?? undefined}>
                    <source src={src!} type="video/mp4" />
                </video>
            )}
        </div>
    );
};

export default VideoPlayer;
