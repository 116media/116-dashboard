/**
 * Redux action type constants for the shorts module.
 */
export const ActionType = {
    GetShorts: "Shorts/getShorts",
    GetShortById: "Shorts/getShortById",
    CreateShort: "Shorts/createShort",
    ActivateShort: "Shorts/activateShort",
    DeactivateShort: "Shorts/deactivateShort",
    DeleteShort: "Shorts/deleteShort",
    UploadShortThumbnail: "Shorts/uploadShortThumbnail"
} as const;

/**
 * Redux slice name for the shorts module.
 */
export const SliceName = { Shorts: "shorts" } as const;
