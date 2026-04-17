import type { ArticleAction } from "./articles.dropdown";

type ActionConfig = {
    title: string;
    description: string;
    confirmLabel: string;
    danger: boolean;
};

/**
 * Action configuration mapping for article confirmation modals.
 *
 * @description
 * Maps article action types to their French titles, descriptions,
 * confirm button labels, and danger styling. Only actions requiring
 * a confirmation modal are included — actions like "edit" that
 * navigate directly are intentionally omitted.
 */
export const ARTICLE_ACTION_CONFIG: Partial<Record<ArticleAction, ActionConfig>> = {
    submit: {
        title: "Soumettre l'article",
        description: "L'article sera soumis pour revue.",
        confirmLabel: "Soumettre",
        danger: false
    },
    approve: {
        title: "Approuver l'article",
        description: "L'article sera marqué comme approuvé.",
        confirmLabel: "Approuver",
        danger: false
    },
    publish: {
        title: "Publier l'article",
        description: "L'article sera visible publiquement.",
        confirmLabel: "Publier",
        danger: false
    },
    reject: {
        title: "Rejeter l'article",
        description: "L'article sera marqué comme rejeté.",
        confirmLabel: "Rejeter",
        danger: true
    },
    archive: {
        title: "Archiver l'article",
        description: "L'article ne sera plus visible.",
        confirmLabel: "Archiver",
        danger: false
    },
    delete: {
        title: "Supprimer l'article",
        description: "L'article sera supprimé définitivement. Cette action est irréversible.",
        confirmLabel: "Supprimer",
        danger: true
    }
};
