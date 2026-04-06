import type { IRoleWithPermissions } from "@/platform/settings/domain/entities/IRoleWithPermissions";
import { getRolesAction } from "@/platform/settings/presentation/store/security.action";
import type { IApiProblemDetails } from "@/shared/infrastructure/api/type";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";

interface IUseRoles {
    roles: IRoleWithPermissions[];
    loading: boolean;
    error: IApiProblemDetails | null | undefined;
    fetchRoles: () => void;
}

export const useRoles = (): IUseRoles => {
    const dispatch = useAppDispatch();
    const { data: roles, loading, error } = useAppSelector(({ settings: { roles } }) => roles);

    const fetchRoles = () => {
        dispatch(getRolesAction());
    };

    return { roles: Array.isArray(roles) ? roles : [], loading, error, fetchRoles };
};
