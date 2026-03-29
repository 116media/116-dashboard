import { Avatar, Button, Skeleton } from "antd";
import { type FC, useEffect, useRef } from "react";
import AccountInfoModal from "@/platform/settings/presentation/components/forms/AccountInfoModal";
import SettingsCard from "@/platform/settings/presentation/components/ui/SettingsCard";
import SettingsField from "@/platform/settings/presentation/components/ui/SettingsField";
import SettingsPageHeader from "@/platform/settings/presentation/components/ui/SettingsPageHeader";
import { useProfile } from "@/platform/settings/presentation/hooks/UseProfile";
import { useUpdateAccount } from "@/platform/settings/presentation/hooks/UseUpdateAccount";
import { useUpdateAvatar } from "@/platform/settings/presentation/hooks/UseUpdateAvatar";
import {
    IconCameraOutlined,
    IconEnvironmentOutlined,
    IconUserOutlined
} from "@/shared/presentation/ui/Icons";
import RoleBadge from "@/shared/presentation/ui/RoleBadge";
import styles from "./index.module.scss";
import ProfileContainerLoading from "./ProfileContainer.Loading";

const ProfileContainer: FC = () => {
    const { profile, loading, fetchProfile } = useProfile();
    const updateAccount = useUpdateAccount();
    const { loading: avatarLoading, onUpload } = useUpdateAvatar();
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onUpload(file);
            e.target.value = "";
        }
    };

    const getInitials = () => {
        return profile?.userName?.charAt(0)?.toUpperCase() ?? "?";
    };

    const phoneDisplay =
        profile?.countryDialCode && profile?.partialPhoneNumber
            ? `${profile.countryDialCode} ${profile.partialPhoneNumber}`
            : null;

    if (loading) {
        return <ProfileContainerLoading />;
    }

    return (
        <div>
            <SettingsPageHeader
                icon={<IconUserOutlined />}
                title="Profil"
                description="Gérez vos informations personnelles et votre photo de profil."
            />
            <SettingsCard title="Profil">
                <div className={styles.profileContainer__avatarSection}>
                    <div className={styles.profileContainer__avatarWrapper}>
                        <Skeleton
                            loading={avatarLoading}
                            active
                            avatar={{ size: 80, shape: "square" }}
                            paragraph={false}
                            title={false}
                        >
                            <Avatar
                                size={80}
                                shape="square"
                                src={profile?.avatar?.storageUrl}
                                icon={!profile?.avatar && <IconUserOutlined />}
                            >
                                {!profile?.avatar && getInitials()}
                            </Avatar>
                        </Skeleton>
                    </div>
                    <div className={styles.profileContainer__avatarInfo}>
                        <span className={styles.profileContainer__userName}>
                            {profile?.userName}
                        </span>
                        {profile?.roles && <RoleBadge compact roles={profile.roles} />}
                        {profile?.countryName && (
                            <span className={styles.profileContainer__location}>
                                <IconEnvironmentOutlined /> {profile.countryName}
                            </span>
                        )}
                    </div>
                    <Button icon={<IconCameraOutlined />} onClick={handleAvatarClick}>
                        Modifier
                    </Button>
                    <input
                        hidden
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                    />
                </div>
            </SettingsCard>

            <SettingsCard title="Informations du compte" onEdit={updateAccount.open}>
                <div className={styles.profileContainer__fieldsGrid}>
                    <SettingsField label="Pseudo" value={profile?.userName} />
                    <SettingsField label="Email" value={profile?.email} />
                    <SettingsField label="Pays" value={profile?.countryName} />
                    <SettingsField label="Téléphone" value={phoneDisplay} />
                </div>
            </SettingsCard>

            <AccountInfoModal
                user={profile}
                form={updateAccount.form}
                error={updateAccount.error}
                isOpen={updateAccount.isOpen}
                onClose={updateAccount.close}
                loading={updateAccount.loading}
                onSubmit={updateAccount.onSubmit}
            />
        </div>
    );
};

export default ProfileContainer;
