import { createInitialState } from "@/shared/presentation/store/action.wrapper";
import type { IArticlesState } from "./type";

/**
 * Initial state for the articles Redux slice.
 *
 * @description
 * Defines initial state for all articles-related operations.
 * All operations use `createInitialState` because paginated
 * results are objects, not arrays.
 */
export const articlesInitialState: IArticlesState = {
    getArticles: createInitialState(),
    getArticleById: createInitialState(),
    createArticle: createInitialState(),
    updateArticle: createInitialState(),
    submitArticle: createInitialState(),
    approveArticle: createInitialState(),
    publishArticle: createInitialState(),
    rejectArticle: createInitialState(),
    archiveArticle: createInitialState(),
    deleteArticle: createInitialState(),
    uploadArticleImage: createInitialState(),
    updateArticleSeo: createInitialState(),
    updateArticleTags: createInitialState(),
    unpromoteArticle: createInitialState()
};
