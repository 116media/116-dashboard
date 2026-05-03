import { Plyr as PlyrReact } from "plyr-react";
import "plyr-react/plyr.css";
import type { FC } from "react";
import { useMemo } from "react";
import { extractYoutubeId } from "@/modules/videos/presentation/utils/youtube/youtube.utils";
import styles from "./index.module.scss";

const SHARED_PLYR_OPTIONS: Plyr.Options = {
    controls: [
        "play-large",
        "play",
        "progress",
        "current-time",
        "mute",
        "volume",
        "settings",
        "fullscreen"
    ],
    settings: ["quality", "speed"],
    ratio: "16:9",
    resetOnEnd: true,
    clickToPlay: true,
    hideControls: true
};

const HTML5_PLYR_OPTIONS: Plyr.Options = {
    ...SHARED_PLYR_OPTIONS,
    settings: ["quality", "speed"],
    quality: {
        default: 1080,
        options: [4320, 2880, 2160, 1440, 1080, 720, 480, 360, 240]
    }
};

interface IVideoPlayerProps {
    src?: string | null;
    youtubeUrl?: string | null;
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
const VideoPlayer: FC<IVideoPlayerProps> = ({ src, youtubeUrl, poster, maxHeight }) => {
    const source = useMemo<Plyr.SourceInfo | undefined>(() => {
        if (youtubeUrl) {
            const id = extractYoutubeId(youtubeUrl) ?? youtubeUrl;
            return { type: "video", sources: [{ src: id, provider: "youtube" }] };
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
    }, [src, youtubeUrl, poster]);

    if (!source) return null;

    return (
        <div
            className={styles.videoPlayer}
            style={maxHeight ? { maxHeight, overflow: "hidden" } : undefined}
        >
            <PlyrReact
                source={source}
                options={youtubeUrl ? SHARED_PLYR_OPTIONS : HTML5_PLYR_OPTIONS}
            />
        </div>
    );
};

export default VideoPlayer;
