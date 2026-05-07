/**
 * Redux action type constants for the articles module.
 */
export const ActionType = {
    GetArticles: "Articles/getArticles",
    GetArticleById: "Articles/getArticleById",
    CreateArticle: "Articles/createArticle",
    UpdateArticle: "Articles/updateArticle",
    SubmitArticle: "Articles/submitArticle",
    ApproveArticle: "Articles/approveArticle",
    PublishArticle: "Articles/publishArticle",
    RejectArticle: "Articles/rejectArticle",
    ArchiveArticle: "Articles/archiveArticle",
    DeleteArticle: "Articles/deleteArticle",
    UploadArticleImage: "Articles/uploadArticleImage",
    UpdateArticleSeo: "Articles/updateArticleSeo",
    UpdateArticleTags: "Articles/updateArticleTags"
} as const;

/**
 * Redux slice name for the articles module.
 */
export const SliceName = { Articles: "articles" } as const;
