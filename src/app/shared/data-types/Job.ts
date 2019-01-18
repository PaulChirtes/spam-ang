import { User } from "./User";
import { UserDetails } from "./UserDetails";

export class Job{
    Id: number;
    asignee: UserDetails;
    photo: string;
    Title: string;
    Description: string;
}