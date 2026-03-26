/**
 * API error code mappings.
 *
 * @description
 * Maps backend exception types to user-friendly error titles in French.
 *
 * Used by the API client to normalize error responses.
 *
 * @property {Object} validation - Validation error mapping
 * @property {Object} authentication - Authentication error mapping
 * @property {Object} authorization - Authorization error mapping
 * @property {Object} notFound - Not found error mapping
 * @property {Object} conflict - Conflict error mapping
 * @property {Object} badRequest - Bad request error mapping
 * @property {Object} otpAttemptsLimit - OTP attempts limit exceeded error mapping
 * @property {Object} otpExpiration - OTP expiration error mapping
 */
export const apiErrors = {
    validation: { code: "ValidationException", title: "Validation" },
    authentication: { code: "AuthenticationException", title: "Authentification" },
    authorization: { code: "AuthorizationException", title: "Autorisation" },
    notFound: { code: "NotFoundException", title: "Introuvable" },
    conflict: { code: "ConflictException", title: "Conflit" },
    badRequest: { code: "BadRequestException", title: "Requête Invalide" },
    otpAttemptsLimit: { code: "OtpAttemptsLimitException", title: "Limite atteinte" },
    otpExpiration: { code: "OtpExpirationException", title: "Expiré" },
    accessDenied: { code: "AccessDeniedException", title: "Accès refusé" }
} as const;
