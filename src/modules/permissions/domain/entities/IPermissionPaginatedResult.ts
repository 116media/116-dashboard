import type { IPaginatedResult } from "@/shared/domain/types/pagination";
import type { IPermissionEntity } from "./IPermission";

/**
 * Paginated list of permissions returned by `GET /api/v1/admin/permissions`.
 */
export type IPermissionPaginatedResult = IPaginatedResult<IPermissionEntity>;
