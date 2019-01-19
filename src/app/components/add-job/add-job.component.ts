import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import { Job } from 'src/app/shared/data-types/Job';
import { User } from 'src/app/shared/data-types/User';
import { JobService } from 'src/app/services/job-service/job.service';
import { Router } from '@angular/router';
import { OwlDateTimeModule } from 'ng-pick-datetime';
import { OwlDateTimeComponent, DateTimeAdapter, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { JobType } from 'src/app/shared/data-types/job-type.enum';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss']
})
export class AddJobComponent implements OnInit {
    title: string;
    description: string;
    jobType: string;
    skillList: string[] = [];
    currentSkill: string;

  constructor(public service : JobService,
              private router : Router, 
              private toastr : ToastrService) { }

  ngOnInit() {
  }

  createJob() {
    let job = new Job();
    job.Title = this.title;
    job.Description = this.description;
    job.Type = this.getType();
    job.Skills = this.skillList;
    if (this.isValid(job)) {
      this.service.postJob(job).subscribe(data => {
        this.toastr.success('The job has been successfully created',"",{
          "closeButton": true,
          "positionClass": "toast-bottom-right",
          "tapToDismiss": true});
        this.router.navigate(['/dashboard']);
      });
    }
    else {
      this.toastr.error('Job ' + job.Title + ' was not created. Please input values for all mandatory fields.',"",{
        "closeButton": true,
        "positionClass": "toast-bottom-right",
        "tapToDismiss": true});
    }
  }

  isValid(job: Job): boolean {
    return job.Title && job.Title!='' && job.Description && job.Description!='' && this.jobType && this.jobType!='';
  }

  getType(): JobType{
    switch(this.jobType){
      case "School": return JobType.School;
      case "Sport": return JobType.Sport;
      case "Food": return JobType.Food;
      case "Photography": return JobType.Photography;
      case "Other": return JobType.Other;
      default: return null;
    }
  }

  submit(): void {
    this.skillList.push(this.currentSkill);

    this.currentSkill = '';
  }

  deleteSkill(s: string): void {
    const index = this.skillList.indexOf(s);
    if(index >= 0){
      this.skillList.splice(index, 1);
    }
  }


}
