import type { FC } from "react";
import { useParams } from "react-router";
import VideoDetailSkeleton from "@/modules/videos/presentation/components/ui/VideoDetailSkeleton";
import VideoDetailView from "@/modules/videos/presentation/components/ui/VideoDetailView";
import { useVideoDetail } from "@/modules/videos/presentation/hooks/UseVideoDetail";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";

/**
 * Container for the video detail page.
 *
 * @component
 *
 * @description
 * Extracts the video ID from the URL params, fetches the full
 * video detail via `useVideoDetail`, and handles loading/error
 * states. Shows a skeleton matching the two-column layout while
 * loading, then renders the pure `VideoDetailView`.
 */
const VideoDetailContainer: FC = () => {
    const { id } = useParams<{ id: string }>();
    const { video, loading, error, reload } = useVideoDetail(id ?? "");

    if (loading && !video) {
        return <VideoDetailSkeleton />;
    }

    if (error && !video) {
        return <ErrorAlert error={error} showIcon closable banner onClose={reload} />;
    }

    if (!video) return null;

    return <VideoDetailView video={video} />;
};

export default VideoDetailContainer;
