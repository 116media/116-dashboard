import type { VideoAction } from "./videos.dropdown";

type ActionConfig = {
    title: string;
    description: string;
    confirmLabel: string;
    danger: boolean;
};

/**
 * Action configuration mapping for video confirmation modals.
 *
 * @description
 * Maps video action types to their French titles, descriptions,
 * confirm button labels, and danger styling. Only actions requiring
 * a confirmation modal are included -- actions like "edit" that
 * navigate directly are intentionally omitted.
 */
export const VIDEO_ACTION_CONFIG: Partial<Record<VideoAction, ActionConfig>> = {
    submit: {
        title: "Soumettre la vidéo",
        description: "La vidéo sera soumise pour revue.",
        confirmLabel: "Soumettre",
        danger: false
    },
    approve: {
        title: "Approuver la vidéo",
        description: "La vidéo sera marquée comme approuvée.",
        confirmLabel: "Approuver",
        danger: false
    },
    publish: {
        title: "Publier la vidéo",
        description: "La vidéo sera visible publiquement.",
        confirmLabel: "Publier",
        danger: false
    },
    reject: {
        title: "Rejeter la vidéo",
        description: "La vidéo sera marquée comme rejetée.",
        confirmLabel: "Rejeter",
        danger: true
    },
    archive: {
        title: "Archiver la vidéo",
        description: "La vidéo ne sera plus visible.",
        confirmLabel: "Archiver",
        danger: false
    },
    delete: {
        title: "Supprimer la vidéo",
        description: "La vidéo sera supprimée définitivement. Cette action est irréversible.",
        confirmLabel: "Supprimer",
        danger: true
    }
};
