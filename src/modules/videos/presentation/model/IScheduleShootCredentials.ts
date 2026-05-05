import type { Dayjs } from "dayjs";

/**
 * Form model for scheduling a video shoot.
 *
 * @interface IScheduleShootCredentials
 * @property {Dayjs | string} shootingScheduledAt - Scheduled shoot date (Dayjs from form, string from API)
 */
export interface IScheduleShootCredentials {
    shootingScheduledAt: Dayjs | string;
}
