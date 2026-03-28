import { CameraOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Spin } from "antd";
import { type FC, useEffect, useRef } from "react";
import AccountInfoModal from "@/platform/settings/presentation/components/forms/AccountInfoModal";
import SettingsCard from "@/platform/settings/presentation/components/ui/SettingsCard";
import SettingsField from "@/platform/settings/presentation/components/ui/SettingsField";
import SettingsPageHeader from "@/platform/settings/presentation/components/ui/SettingsPageHeader";
import { useProfile } from "@/platform/settings/presentation/hooks/UseProfile";
import { useUpdateAccount } from "@/platform/settings/presentation/hooks/UseUpdateAccount";
import { useUpdateAvatar } from "@/platform/settings/presentation/hooks/UseUpdateAvatar";
import styles from "./index.module.scss";

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
        return (
            <div className={styles.loader}>
                <Spin />
            </div>
        );
    }

    return (
        <div>
            <SettingsPageHeader
                icon={<UserOutlined />}
                title="Profil"
                description="Gérez vos informations personnelles et votre photo de profil."
            />
            <SettingsCard title="Profil">
                <div className={styles.avatarSection}>
                    <div className={styles.avatarWrapper}>
                        <Spin spinning={avatarLoading}>
                            <Avatar
                                size={64}
                                shape="circle"
                                src={profile?.avatar?.storageUrl}
                                icon={!profile?.avatar && <UserOutlined />}
                            >
                                {!profile?.avatar && getInitials()}
                            </Avatar>
                        </Spin>
                    </div>
                    <div className={styles.avatarInfo}>
                        <span className={styles.userName}>{profile?.userName}</span>
                        <span className={styles.role}>{profile?.roles?.[0]?.name}</span>
                        {profile?.countryName && (
                            <span className={styles.location}>{profile.countryName}</span>
                        )}
                    </div>
                    <Button icon={<CameraOutlined />} onClick={handleAvatarClick}>
                        Modifier
                    </Button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleFileChange}
                    />
                </div>
            </SettingsCard>

            <SettingsCard title="Informations du compte" onEdit={updateAccount.open}>
                <div className={styles.fieldsGrid}>
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
