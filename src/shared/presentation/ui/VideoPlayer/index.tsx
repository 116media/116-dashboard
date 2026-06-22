import { Plyr as PlyrReact } from "plyr-react";
import "plyr-react/plyr.css";
import type { FC } from "react";
import { useEffect, useMemo, useRef } from "react";
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

/**
 * Props for the VideoPlayer component.
 *
 * @interface IVideoPlayerProps
 * @property {string | null} [src] - Direct video file URL to play with the HTML5 player; ignored when youtubeUrl is provided
 * @property {string | null} [youtubeUrl] - YouTube URL or video id to embed; takes precedence over src
 * @property {string | null} [poster] - Optional poster image shown before playback begins
 * @property {number} [maxHeight] - Caps the player height in pixels and clips any overflow
 * @property {() => void} [onReady] - Called once the underlying player has finished initializing
 * @property {Plyr.Options["controls"]} [controls] - Overrides the Plyr controls array; defaults to the full control set
 * @property {Plyr.Options["ratio"]} [ratio] - Overrides the player aspect ratio (e.g. "9:16" for vertical shorts); defaults to "16:9"
 */
interface IVideoPlayerProps {
    src?: string | null;
    youtubeUrl?: string | null;
    poster?: string | null;
    maxHeight?: number;
    onReady?: () => void;
    controls?: Plyr.Options["controls"];
    ratio?: Plyr.Options["ratio"];
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
const VideoPlayer: FC<IVideoPlayerProps> = ({
    src,
    youtubeUrl,
    poster,
    maxHeight,
    onReady,
    controls,
    ratio
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const options = useMemo<Plyr.Options>(() => {
        const base = youtubeUrl ? SHARED_PLYR_OPTIONS : HTML5_PLYR_OPTIONS;
        return {
            ...base,
            ...(controls ? { controls } : {}),
            ...(ratio ? { ratio } : {})
        };
    }, [youtubeUrl, controls, ratio]);

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

    // biome-ignore lint/correctness/useExhaustiveDependencies: re-attach the load listener when the source changes
    useEffect(() => {
        if (!onReady) return;

        const video = containerRef.current?.querySelector("video");
        if (!video) return;

        if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
            onReady();
            return;
        }

        video.addEventListener("loadeddata", onReady, { once: true });
        return () => video.removeEventListener("loadeddata", onReady);
    }, [onReady, src, youtubeUrl]);

    if (!source) return null;

    return (
        <div
            ref={containerRef}
            className={styles.videoPlayer}
            style={maxHeight ? { maxHeight, overflow: "hidden" } : undefined}
        >
            <PlyrReact source={source} options={options} />
        </div>
    );
};

export default VideoPlayer;
