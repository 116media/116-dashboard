import type { TagAction } from "@/modules/lookup/presentation/constants/lookup.tags.dropdown";

type ActionConfig = { title: string; description: string; danger: boolean };

/**
 * Action configuration mapping for tag confirmation modals.
 *
 * @description
 * Maps tag action types to their French titles, descriptions,
 * and danger styling. Only actions requiring a confirmation modal
 * are included — actions like "edit" that open separate modals are
 * intentionally omitted.
 */
export const TAG_ACTION_CONFIG: Partial<Record<TagAction, ActionConfig>> = {
    delete: {
        title: "Supprimer le tag",
        description: "Êtes-vous sûr de vouloir supprimer ce tag ? Cette action est irréversible.",
        danger: true
    }
};
