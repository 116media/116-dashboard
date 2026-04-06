import type { IFile } from "./IFile";
import type { IPermission } from "./IPermission";
import type { IRole } from "./IRole";

/**
 * User entity representing authenticated users in the system.
 *
 * @interface IUser
 *
 * @description
 * Core domain entity for users containing authentication state,
 * profile information, authorization data, and contact details.
 *
 * @property {string} id - Unique user identifier
 * @property {string | null} email - User email address (optional)
 * @property {string} userName - Display username
 * @property {IRole[]} roles - Assigned roles for authorization
 * @property {IPermission[]} permissions - Direct permissions (in addition to role permissions)
 * @property {string} authProvider - Authentication provider (e.g., "Local", "Google", "Facebook")
 * @property {boolean} isVerified - Whether user has verified their email/account
 * @property {boolean} isActive - Whether user account is active
 * @property {IFile | null} avatar - User avatar/profile picture
 * @property {string | null} countryName - User's country name
 * @property {string | null} countryIsoCode - ISO country code (e.g., "FR", "US")
 * @property {string | null} countryDialCode - Phone country dial code (e.g., "+33", "+1")
 * @property {string | null} partialPhoneNumber - Phone number without country code
 * @property {string | null} fullPhoneNumber - Complete phone number with country code
 * @property {string | null} createdAt - ISO timestamp of account creation
 * @property {string | null} updatedAt - ISO timestamp of last profile update
 */
export interface IUser {
    id: string;
    email?: string | null;
    userName: string;
    roles: IRole[];
    permissions: IPermission[];
    authProvider: string;
    isVerified: boolean;
    isActive: boolean;
    avatar?: IFile | null;
    countryName?: string | null;
    countryIsoCode?: string | null;
    countryDialCode?: string | null;
    partialPhoneNumber?: string | null;
    fullPhoneNumber?: string | null;
    createdAt?: string | null;
    updatedAt?: string | null;
}
