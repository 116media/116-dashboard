import type { IArticleActionResponse } from "@/modules/articles/domain/entities/IArticleActionResponse";
import type { IArticleEntity } from "@/modules/articles/domain/entities/IArticleEntity";
import type { IArticleImageEntity } from "@/modules/articles/domain/entities/IArticleImageEntity";
import type { IArticleSummaryEntity } from "@/modules/articles/domain/entities/IArticleSummaryEntity";
import type { IPaginatedResult } from "@/shared/domain/types/pagination";
import type { IBasicInitialState } from "@/shared/presentation/store/action.wrapper";

/**
 * Redux state shape for the articles module.
 *
 * @description
 * Each key represents one async operation with its own
 * `loading`, `fetched`, `data`, and `error` state.
 */
export type IArticlesState = {
    getArticles: IBasicInitialState<IPaginatedResult<IArticleSummaryEntity>>;
    getArticleById: IBasicInitialState<IArticleEntity>;
    createArticle: IBasicInitialState<IArticleEntity>;
    updateArticle: IBasicInitialState<IArticleEntity>;
    submitArticle: IBasicInitialState<IArticleActionResponse>;
    approveArticle: IBasicInitialState<IArticleActionResponse>;
    publishArticle: IBasicInitialState<IArticleActionResponse>;
    rejectArticle: IBasicInitialState<IArticleActionResponse>;
    archiveArticle: IBasicInitialState<IArticleActionResponse>;
    deleteArticle: IBasicInitialState<IArticleActionResponse>;
    uploadArticleImage: IBasicInitialState<IArticleImageEntity>;
    updateArticleSeo: IBasicInitialState<IArticleEntity>;
    updateArticleTags: IBasicInitialState<IArticleActionResponse>;
};

export type ArticlesStateKey = keyof IArticlesState;
