/**
 * Redux action type constants for the lyrics module.
 */
export const ActionType = {
    GetLyrics: "Lyrics/getLyrics",
    CreateLyrics: "Lyrics/createLyrics",
    UpdateLyrics: "Lyrics/updateLyrics",
    UpdateLyricsSeo: "Lyrics/updateLyricsSeo"
} as const;

/**
 * Redux slice name for the lyrics module.
 */
export const SliceName = { Lyrics: "lyrics" } as const;
