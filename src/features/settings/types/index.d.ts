import { GetAccountResponse } from "../api/getAccount";

export interface SettingsAccountFormValues {
  phone: string;
  wilaya: string;
  town: string;
  fullName: string;
  address: string;
}

export type AccountDetail = GetAccountResponse;

export type ThemeType = "dark" | "light" | "system";
