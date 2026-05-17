import { Avatar, Badge, Button, Flex, Skeleton, Typography } from "antd";
import { type FC, useEffect, useRef } from "react";
import AccountInfoModal from "@/platform/settings/presentation/components/forms/AccountInfoModal";
import SettingsCard from "@/platform/settings/presentation/components/ui/SettingsCard";
import { useProfile } from "@/platform/settings/presentation/hooks/UseProfile";
import { useUpdateAccount } from "@/platform/settings/presentation/hooks/UseUpdateAccount";
import { useUpdateAvatar } from "@/platform/settings/presentation/hooks/UseUpdateAvatar";
import DetailField from "@/shared/presentation/ui/DetailField";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";
import {
    IconCameraOutlined,
    IconEnvironmentOutlined,
    IconMailOutlined,
    IconMobileOutlined,
    IconUserOutlined
} from "@/shared/presentation/ui/Icons";
import PageHeader from "@/shared/presentation/ui/PageHeader";
import RoleBadge from "@/shared/presentation/ui/RoleBadge";
import styles from "./index.module.scss";
import ProfileContainerLoading from "./ProfileContainer.Loading";

const { Text } = Typography;

/**
 * Container for the Profile tab in Settings.
 *
 * @component
 *
 * @description
 * Manages the profile page layout including avatar upload,
 * account information display, and the account edit modal.
 * Fetches profile data on mount.
 */
const ProfileContainer: FC = () => {
    const { profile, loading, error: profileError, fetchProfile } = useProfile();
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

    const phoneDisplay =
        profile?.countryDialCode && profile?.partialPhoneNumber
            ? `${profile.countryDialCode} ${profile.partialPhoneNumber}`
            : null;

    if (loading) {
        return <ProfileContainerLoading />;
    }

    return (
        <div>
            <PageHeader
                title="Profil"
                icon={<IconUserOutlined />}
                subtitle="Gérez vos informations personnelles et votre photo de profil."
            />
            <ErrorAlert banner showIcon closable error={profileError} onClose={fetchProfile} />
            <SettingsCard title="Photo de profil">
                <div className={styles.profileContainer__avatarSection}>
                    <button
                        type="button"
                        onClick={handleAvatarClick}
                        className={styles.profileContainer__avatarWrapper}
                    >
                        <Skeleton
                            active
                            title={false}
                            paragraph={false}
                            loading={avatarLoading}
                            avatar={{ size: 82, shape: "square" }}
                        >
                            <Badge
                                count={
                                    <IconCameraOutlined
                                        className={styles.profileContainer__cameraIcon}
                                    />
                                }
                                offset={[-6, 72]}
                            >
                                <Avatar
                                    size={80}
                                    shape="square"
                                    src={profile?.avatar?.storageUrl}
                                    icon={!profile?.avatar && <IconUserOutlined />}
                                >
                                    {!profile?.avatar}
                                </Avatar>
                            </Badge>
                        </Skeleton>
                    </button>
                    <div className={styles.profileContainer__avatarInfo}>
                        <Flex align="center" gap={8}>
                            <span>{profile?.userName}</span>
                            <span>
                                {profile?.roles && <RoleBadge compact roles={profile.roles} />}
                            </span>
                        </Flex>
                        <Text type="secondary">{profile?.email}</Text>
                        {profile?.countryName && (
                            <Text
                                strong
                                type="secondary"
                                className={styles.profileContainer__location}
                            >
                                <IconEnvironmentOutlined /> {profile.countryName}
                            </Text>
                        )}
                    </div>
                    <Button
                        color="default"
                        variant="filled"
                        icon={<IconCameraOutlined />}
                        onClick={handleAvatarClick}
                    >
                        Changer la photo
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
                    <DetailField
                        label="Pseudo"
                        value={profile?.userName}
                        icon={<IconUserOutlined />}
                    />
                    <DetailField label="Email" value={profile?.email} icon={<IconMailOutlined />} />
                    <DetailField
                        label="Pays"
                        value={profile?.countryName}
                        icon={<IconEnvironmentOutlined />}
                    />
                    <DetailField
                        label="Téléphone"
                        value={phoneDisplay}
                        icon={<IconMobileOutlined />}
                    />
                </div>
            </SettingsCard>

            <AccountInfoModal
                user={profile}
                form={updateAccount.form}
                error={updateAccount.error}
                success={updateAccount.success}
                isOpen={updateAccount.isOpen}
                onClose={updateAccount.close}
                loading={updateAccount.loading}
                onSubmit={updateAccount.onSubmit}
                onReset={() => updateAccount.resetUpdate()}
            />
        </div>
    );
};

export default ProfileContainer;
