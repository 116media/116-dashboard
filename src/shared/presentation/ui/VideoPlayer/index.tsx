import { Plyr as PlyrReact } from "plyr-react";
import "plyr-react/plyr.css";
import type { FC } from "react";
import { useMemo } from "react";
import styles from "./index.module.scss";

const PLYR_OPTIONS: Plyr.Options = {
    controls: ["play-large", "play", "progress", "current-time", "mute", "volume", "fullscreen"],
    resetOnEnd: true,
    clickToPlay: true,
    hideControls: true
};

interface IVideoPlayerProps {
    src?: string | null;
    youtubeId?: string | null;
    poster?: string | null;
    maxHeight?: number;
}

/**
 * Shared video player powered by plyr-react.
 *
 * @component
 *
 * @description
 * Renders a Plyr-powered player for both HTML5 video files and YouTube embeds.
 * Styles are applied via CSS custom properties in the companion SCSS module.
 */
const VideoPlayer: FC<IVideoPlayerProps> = ({ src, youtubeId, poster, maxHeight }) => {
    const source = useMemo<Plyr.SourceInfo | undefined>(() => {
        if (youtubeId) {
            return { type: "video", sources: [{ src: youtubeId, provider: "youtube" }] };
        }
        if (src) {
            const ext = src.split("?")[0].split(".").pop()?.toLowerCase();
            const mimeTypes: Record<string, string> = {
                mp4: "video/mp4",
                mov: "video/quicktime",
                webm: "video/webm",
                avi: "video/x-msvideo",
                mkv: "video/x-matroska",
                "3gp": "video/3gpp"
            };
            const mimeType = (ext && mimeTypes[ext]) || "video/mp4";
            return {
                type: "video",
                poster: poster ?? undefined,
                sources: [{ src, type: mimeType }]
            };
        }
        return undefined;
    }, [src, youtubeId, poster]);

    if (!source) return null;

    return (
        <div
            className={styles.videoPlayer}
            style={maxHeight ? { maxHeight, overflow: "hidden" } : undefined}
        >
            <PlyrReact source={source} options={PLYR_OPTIONS} />
        </div>
    );
};

export default VideoPlayer;
