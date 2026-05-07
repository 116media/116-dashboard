import { useCallback, useEffect } from "react";
import type { IVideoEntity } from "@/modules/videos/domain/entities/IVideoEntity";
import { getVideoByIdAction } from "@/modules/videos/presentation/store/getvideobyid.action";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";

/**
 * Return type for the video detail hook.
 *
 * @interface IUseVideoDetail
 */
interface IUseVideoDetail {
    video: IVideoEntity | null;
    loading: boolean;
    error: Failure | null | undefined;
    reload: () => void;
}

/**
 * Custom hook for loading a video detail by ID.
 *
 * @description
 * Dispatches `getVideoByIdAction` on mount and whenever
 * the `id` parameter changes. Provides a `reload` callback
 * to manually re-fetch.
 *
 * @param id - The video UUID to load
 * @returns Video data, loading/error state, and reload callback
 */
export const useVideoDetail = (id: string): IUseVideoDetail => {
    const dispatch = useAppDispatch();

    const {
        data: video,
        loading,
        error
    } = useAppSelector(({ videos: { getVideoById } }) => getVideoById);

    const reload = useCallback(() => {
        if (id) {
            dispatch(getVideoByIdAction(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        reload();
    }, [reload]);

    return {
        video: (video as IVideoEntity) ?? null,
        loading,
        error,
        reload
    };
};
