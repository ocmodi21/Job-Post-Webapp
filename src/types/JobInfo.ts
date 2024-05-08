import { UserInfoPropType } from "./UserInfo";

export type jobInfoPropType = {
  id: number;
  title: string;
  location: string;
  salary: string;
  description: string;
  company_name: string;
  responses: UserInfoPropType[];
};
