import { UserType } from "./user-type.enum";

export class User {
  Id: number;
  Username: string;
  Email: string;
  Password: string;
  UserType: UserType;
  PhoneNumber: string;
}
