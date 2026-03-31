import { useEffect, useRef } from "react";
import type { Failure } from "@/shared/domain/failures/failure";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

/**
 * Watches a Failure from Redux state and displays a toast notification
 * when a new error appears.
 *
 * Tracks error identity by reference to avoid duplicate notifications on
 * re-renders. Does not clear the Redux error state — that remains the
 * responsibility of the owning slice or hook.
 *
 * @param error - The failure from Redux state (e.g. from useAppSelector)
 * @param options - Optional overrides for notification title and duration
 *
 * @example
 * ```typescript
 * const { error } = useAppSelector(({ settings: { roles } }) => roles);
 * useErrorNotification(error);
 * ```
 */
export const useErrorNotification = (
    error: Failure | null | undefined,
    options?: { title?: string; duration?: number }
): void => {
    const prevErrorRef = useRef<Failure | null | undefined>(null);

    useEffect(() => {
        if (error && error !== prevErrorRef.current) {
            showNotification({
                type: "error",
                title: options?.title ?? error.title ?? "Erreur",
                description: error.detail ?? "Une erreur inattendue est survenue.",
                duration: options?.duration
            });
        }
        prevErrorRef.current = error;
    }, [error, options?.title, options?.duration]);
};
