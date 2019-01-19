import { User } from "./User";
import { UserDetails } from "./UserDetails";
import { JobType } from "./job-type.enum";

export class Job{
    Id: number;
    asignee: UserDetails;
    photo: string;
    Title: string;
    Description: string;
    Type: JobType;
    Skills: string[];
}