/**
 * Form model for scheduling a video shoot.
 *
 * @interface IScheduleShootCredentials
 * @property {string} shootingScheduledAt - ISO date for the scheduled shoot (required)
 */
export interface IScheduleShootCredentials {
    shootingScheduledAt: string;
}
