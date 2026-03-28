export interface IUpdateAccountCredentials {
    email: string;
    userName: string;
    countryName?: string | null;
    countryFlag?: string | null;
    phonePartial?: string | null;
    phoneISOCode?: string | null;
    phoneDialCode?: string | null;
}
