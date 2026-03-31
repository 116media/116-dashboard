import { setCurrentUserAction } from "@/platform/session/presentation/store/currentuser.action";
import { updateAvatarAction } from "@/platform/settings/presentation/store/profile.action";
import { SettingsNotification } from "@/platform/settings/presentation/utils/notification/settings.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

interface IUseUpdateAvatar {
    loading: boolean;
    error: Failure | null | undefined;
    onUpload: (file: File) => void;
}

/**
 * Custom hook for avatar upload.
 *
 * @description
 * Handles file upload for the user's profile avatar. Shows a
 * success notification and syncs the updated user with the
 * auth store on success.
 *
 * @returns Loading/error state and upload handler
 */
export const useUpdateAvatar = (): IUseUpdateAvatar => {
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector(({ settings: { updateAvatar } }) => updateAvatar);

    const onUpload = async (file: File) => {
        const result = await dispatch(updateAvatarAction(file));
        if (updateAvatarAction.fulfilled.match(result)) {
            showNotification(SettingsNotification.avatarUpdateSuccess);
            dispatch(setCurrentUserAction(result.payload));
        } else if (updateAvatarAction.rejected.match(result) && result.payload) {
            showNotification({
                type: "error",
                title: result.payload.title,
                description: result.payload.detail
            });
        }
    };

    return { loading, error, onUpload };
};
