/**
 * Domain enum for commissioned content types within an order.
 *
 * @description
 * Mirrors the backend EnumCoreContentType but lives in the domain layer.
 * Presentation code must import from here — never from the generated API.
 * The infrastructure mapper is the only place that references the API enum.
 */
export enum CoreContentType {
    Article = "Article",
    Video = "Video",
    Short = "Short",
    Custom = "Custom"
}
