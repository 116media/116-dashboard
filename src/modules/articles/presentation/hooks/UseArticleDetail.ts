import { useCallback, useEffect } from "react";
import type { IArticleEntity } from "@/modules/articles/domain/entities/IArticleEntity";
import { getArticleByIdAction } from "@/modules/articles/presentation/store/getarticlebyid.action";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";

/**
 * Return type for the article detail hook.
 *
 * @interface IUseArticleDetail
 */
interface IUseArticleDetail {
    article: IArticleEntity | null;
    loading: boolean;
    error: Failure | null | undefined;
    reload: () => void;
}

/**
 * Custom hook for loading an article detail by ID.
 *
 * @description
 * Dispatches `getArticleByIdAction` on mount and whenever
 * the `id` parameter changes. Provides a `reload` callback
 * to manually re-fetch.
 *
 * @param id - The article UUID to load
 * @returns Article data, loading/error state, and reload callback
 */
export const useArticleDetail = (id: string): IUseArticleDetail => {
    const dispatch = useAppDispatch();

    const {
        data: article,
        loading,
        error
    } = useAppSelector(({ articles: { getArticleById } }) => getArticleById);

    const reload = useCallback(() => {
        if (id) {
            dispatch(getArticleByIdAction(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        reload();
    }, [reload]);

    return {
        article: (article as IArticleEntity) ?? null,
        loading,
        error,
        reload
    };
};
