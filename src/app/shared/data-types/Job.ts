import { User } from "./User";
import { UserDetails } from "./UserDetails";
import { JobType } from "./job-type.enum";

export class Job{
    Id: number;
    Assigne: UserDetails;
    photo: string;
    Title: string;
    Description: string;
    Type: JobType;
    Skills: string[];
    Owner: UserDetails;
}