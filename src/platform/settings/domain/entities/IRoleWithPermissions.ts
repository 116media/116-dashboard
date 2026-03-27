import type { IPermission } from "@/modules/auth/domain/entities/IPermission";

export interface IRoleWithPermissions {
    id: string;
    name: string;
    description: string;
    isActive: boolean;
    isDeleted: boolean;
    permissions: IPermission[];
    createdAt: string | null;
    updatedAt: string | null;
}
