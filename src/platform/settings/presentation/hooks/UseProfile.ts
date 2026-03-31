import { useCallback } from "react";
import type { IUser } from "@/modules/auth/domain/entities/IUser";
import { getCurrentUserAction } from "@/platform/session/presentation/store/currentuser.action";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";

interface IUseProfile {
    profile: IUser;
    loading: boolean;
    error: Failure | null | undefined;
    fetchProfile: () => void;
}

/**
 * Custom hook for fetching and accessing the user profile.
 *
 * @description
 * Dispatches getCurrentUserAction and reads from the single
 * source of truth in session.currentUser.
 *
 * @returns Profile data and fetch utilities
 */
export const useProfile = (): IUseProfile => {
    const dispatch = useAppDispatch();
    const {
        data: profile,
        loading,
        error
    } = useAppSelector(({ session: { currentUser } }) => currentUser);

    const fetchProfile = useCallback(() => {
        dispatch(getCurrentUserAction());
    }, [dispatch]);

    return { profile, loading, error, fetchProfile };
};
