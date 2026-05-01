import { ContentStatus } from "@/shared/domain/enums/content-status.enum";
import { EnumContentStatus } from "@/shared/infrastructure/api/generated/116.api";

/**
 * Exhaustive map from API enum to domain enum.
 * TypeScript will error here if the backend adds a new status that isn't handled.
 */
const contentStatusMap: Record<EnumContentStatus, ContentStatus> = {
    [EnumContentStatus.Draft]: ContentStatus.Draft,
    [EnumContentStatus.PendingPayment]: ContentStatus.PendingPayment,
    [EnumContentStatus.PendingReview]: ContentStatus.PendingReview,
    [EnumContentStatus.Approved]: ContentStatus.Approved,
    [EnumContentStatus.Published]: ContentStatus.Published,
    [EnumContentStatus.Rejected]: ContentStatus.Rejected,
    [EnumContentStatus.Archived]: ContentStatus.Archived
};

/**
 * Maps a generated API content status to the domain ContentStatus enum.
 *
 * @param {EnumContentStatus} status - API content status value
 * @returns {ContentStatus} Corresponding domain enum value
 */
export const mapContentStatus = (status: EnumContentStatus): ContentStatus =>
    contentStatusMap[status];
