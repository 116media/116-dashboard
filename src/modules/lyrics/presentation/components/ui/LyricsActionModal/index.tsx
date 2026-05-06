import type { FC } from "react";
import type { ILyricsEntity } from "@/modules/lyrics/domain/entities/ILyricsEntity";
import type { LyricsAction } from "@/modules/lyrics/presentation/constants/lyrics.dropdown";
import type { Failure } from "@/shared/domain/failures/failure";
import ActionModal from "@/shared/presentation/ui/ActionModal";

/**
 * Action configuration for lyrics workflow modals.
 */
const LYRICS_ACTION_CONFIG: Record<
    string,
    { title: string; description: string; confirmLabel: string; danger?: boolean }
> = {
    delete: {
        title: "Supprimer les paroles",
        description:
            "Êtes-vous sûr de vouloir supprimer définitivement ces paroles ? Cette action est irréversible.",
        confirmLabel: "Supprimer",
        danger: true
    }
};

/**
 * Props for the LyricsActionModal component.
 *
 * @interface ILyricsActionModalProps
 * @property {boolean} open - Whether the modal is visible
 * @property {LyricsAction | null} action - The action type
 * @property {ILyricsEntity | null} lyrics - The lyrics being acted upon
 * @property {boolean} loading - Loading state for the confirm button
 * @property {Failure | null | undefined} error - Backend error to display
 * @property {() => void} onConfirm - Confirm handler
 * @property {() => void} onCancel - Cancel/close handler
 */
interface ILyricsActionModalProps {
    open: boolean;
    action: LyricsAction | null;
    lyrics: ILyricsEntity | null;
    loading: boolean;
    error?: Failure | null | undefined;
    onConfirm: () => void;
    onCancel: () => void;
}

/**
 * Confirmation modal for lyrics actions.
 *
 * @component
 *
 * @description
 * Maps lyrics action types to French titles, descriptions, and danger
 * styling via `LYRICS_ACTION_CONFIG`. Delegates rendering to the shared
 * `ActionModal` component.
 */
const LyricsActionModal: FC<ILyricsActionModalProps> = ({
    open,
    action,
    lyrics,
    loading,
    error,
    onConfirm,
    onCancel
}) => {
    const config = action ? LYRICS_ACTION_CONFIG[action] : undefined;

    if (!config || !lyrics) return null;

    return (
        <ActionModal
            open={open}
            error={error ?? null}
            loading={loading}
            onCancel={onCancel}
            title={config.title}
            onConfirm={onConfirm}
            danger={config.danger}
            confirmLabel={config.confirmLabel}
            description={config.description}
        />
    );
};

export default LyricsActionModal;
