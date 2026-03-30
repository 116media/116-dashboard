import { useCallback } from "react";
import type { IUser } from "@/modules/auth/domain/entities/IUser";
import { authSlice } from "@/modules/auth/presentation/store";
import { getProfileAction } from "@/platform/settings/presentation/store/profile.action";
import type { IApiProblemDetails } from "@/shared/infrastructure/api/type";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";

interface IUseProfile {
    profile: IUser;
    loading: boolean;
    error: IApiProblemDetails | null | undefined;
    fetchProfile: () => void;
}

/**
 * Custom hook for fetching and accessing the user profile.
 *
 * @description
 * Dispatches the profile fetch action and syncs the result
 * with the auth store. Returns profile data, loading, and error state.
 *
 * @returns Profile data and fetch utilities
 */
export const useProfile = (): IUseProfile => {
    const dispatch = useAppDispatch();
    const {
        data: profile,
        loading,
        error
    } = useAppSelector(({ settings: { profile } }) => profile);

    const fetchProfile = useCallback(async () => {
        const result = await dispatch(getProfileAction());
        if (getProfileAction.fulfilled.match(result)) {
            dispatch(authSlice.actions.updateUser(result.payload));
        }
    }, [dispatch]);

    return { profile, loading, error, fetchProfile };
};
