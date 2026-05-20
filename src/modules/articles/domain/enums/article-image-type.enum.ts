/**
 * Domain enum for article image attachment type.
 *
 * @description
 * Mirrors the backend EnumArticleImageType but lives in the domain layer.
 * Presentation code must import from here — never from the generated API.
 * The infrastructure mapper is the only place that references the API enum.
 */
export enum ArticleImageType {
    Cover = "Cover",
    Body = "Body"
}
