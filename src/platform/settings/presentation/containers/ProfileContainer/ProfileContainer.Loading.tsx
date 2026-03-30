import { Card, Flex, Skeleton } from "antd";
import type { FC } from "react";
import styles from "./index.module.scss";

const ProfileContainerLoading: FC = () => {
    return (
        <div className={styles.profileContainer__loading}>
            <Skeleton active title={{ width: 120 }} paragraph={{ rows: 1, width: "50%" }} />

            <Card>
                <Skeleton active title={{ width: 80 }} paragraph={false} />
                <div className={styles.profileContainer__loading__avatarSection}>
                    <Skeleton.Avatar active size={64} shape="square" />
                    <div className={styles.profileContainer__loading__avatarInfo}>
                        <Skeleton
                            active
                            title={{ width: "20%" }}
                            paragraph={{ rows: 1, width: "25%" }}
                        />
                    </div>
                    <Skeleton.Button active size="medium" />
                </div>
            </Card>

            <div className={styles.profileContainer__loading__spacer} />

            <Card>
                <Skeleton active title={{ width: "45%" }} paragraph={false} />
                <div className={styles.profileContainer__loading__fieldsGrid}>
                    {Array.from({ length: 4 }, (_, i) => i + 1).map((key) => (
                        <Card key={key}>
                            <Flex gap={8}>
                                <Skeleton.Avatar active size={48} shape="square" />
                                <Skeleton
                                    active
                                    key={key}
                                    title={{ width: "40%" }}
                                    paragraph={{ rows: 1, width: "80%" }}
                                />
                            </Flex>
                        </Card>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default ProfileContainerLoading;
