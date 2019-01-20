import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import { Job } from 'src/app/shared/data-types/Job';
import { User } from 'src/app/shared/data-types/User';
import { JobService } from 'src/app/services/job-service/job.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OwlDateTimeModule } from 'ng-pick-datetime';
import { OwlDateTimeComponent, DateTimeAdapter, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { JobType } from 'src/app/shared/data-types/job-type.enum';
import { AuthDataStorage } from 'src/app/security/auth-data-storage';
import { UserType } from 'src/app/shared/data-types/user-type.enum';

@Component({
  selector: 'app-update-job',
  templateUrl: './update-job.component.html',
  styleUrls: ['./update-job.component.scss']
})
export class UpdateJobComponent implements OnInit {

  title: string;
    description: string;
    jobType: string;
    skillList: string[] = [];
    currentSkill: string;
    user: any;
    job: Job = new Job();
    canUpdate= false;

  constructor(public service : JobService,
              private router : Router, 
              private toastr : ToastrService,
              private authStorage: AuthDataStorage,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = this.authStorage.getUser();
    this.route.params.subscribe( params =>{
      var id = params['id'];
      if(id){
        this.service.getById(id).subscribe(data=>{
          this.job=data;
          this.title= this.job.Title;
          this.description= this.job.Description;
          this.jobType= this.getStringValue(this.job.Type);
          this.skillList= this.job.Skills;
          var user = this.authStorage.getUser();

          this.canUpdate = user!=null && user.UserType===UserType.Provider;
        }, err=>{
          this.router.navigate(["/404"]);
        });
      }

    });
  }

  updateJob(){
    if(this.canUpdate){
      this.job.Title = this.title;
      this.job.Description = this.description;
      this.jobType = this.getStringValue(this.getType());
      console.log(this.job.Type);
      console.log(this.getStringValue(this.job.Type));
      console.log(this.jobType);
      this.job.Type = this.getType();
      this.jobType = this.getStringValue(this.job.Type);
      console.log("get id value");
      console.log(this.getIdValue(this.jobType));
      console.log(this.jobType);
      this.job.Type = this.getIdValue(this.jobType);
      console.log("initial");
      console.log(this.job.Type);
      this.job.Skills = this.skillList;
      console.log(this.job.Skills);
      this.service.putJob(this.job).subscribe(_=>{
        this.toastr.success('You updated job ' + this.job.Title,"",{
          "closeButton": true,
          "positionClass": "toast-bottom-right",
          "tapToDismiss": true});
        this.router.navigate(["/dashboard"]);
      },
      err => {
        this.toastr.error('Something went wrong',"",{
          "closeButton": true,
          "positionClass": "toast-bottom-right",
          "tapToDismiss": true});
      });
    }
  }

  getStringValue(jobType:JobType){
    switch(jobType){
      case JobType.School : return "School";
      case JobType.Sport: return "Sport";
      case JobType.Food: return "Food";
      case JobType.Photography : return "Photography";
      case JobType.Other: return "Other";
      default: return null;
    }
  }

  getIdValue(jobType:string){
    switch(jobType){
      case "School" : return JobType.School;
      case "Sport": return JobType.Sport;
      case "Food": return JobType.Food;
      case "Photography" : return JobType.Photography;
      case "Other": return JobType.Other;
      default: return null;
    }
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
