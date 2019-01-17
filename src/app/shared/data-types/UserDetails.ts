import { UserType } from "./user-type.enum";

export class UserDetails {
  Id : number;
  Type: UserType;
  Email: string;
  Username: string;
  PhoneNumber: string;
  Skills: string[];
}
