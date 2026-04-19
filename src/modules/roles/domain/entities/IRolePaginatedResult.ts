import type { IPaginatedResult } from "@/shared/domain/types/pagination";
import type { IRoleEntity } from "./IRole";

/**
 * Paginated list of roles returned by `GET /api/v1/admin/roles`.
 */
export type IRolePaginatedResult = IPaginatedResult<IRoleEntity>;
