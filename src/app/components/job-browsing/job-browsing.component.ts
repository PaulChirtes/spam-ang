import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/shared/data-types/Job';
import { Router, ActivatedRoute } from '@angular/router';
import { JobService } from 'src/app/services/job-service/job.service';
import { JobType } from 'src/app/shared/data-types/job-type.enum';

@Component({
  selector: 'app-job-browsing',
  templateUrl: './job-browsing.component.html',
  styleUrls: ['./job-browsing.component.scss']
})
export class JobBrowsingComponent implements OnInit {
  category="";
  photo= "../../../assets/images/job-image-moque.png";
  jobs: Job[]=new Array<Job>();
  jobTitle =  "Jobs"
  
  check= true;

  constructor(public router:Router,
              private jobService: JobService,
              private route: ActivatedRoute,) { }

  ngOnInit() {
    var url = this.router.url;
    if(url==="/jobs"){
      this.getUnasignedJobs();
    } else if (url==="/myJobs"){
      this.getMyJobs();
    } else if(url=="/assignedJobs"){
      this.getAssignedJobs();
    } else {
      this.getJobsByType();
    }
  }


  getJobsByType(): any {
    this.route.params.subscribe( params =>{
      var type = params['type'];
      if(type){
        this.jobService.getJobsByType(type).subscribe(data=>{
          this.jobs = data;
          this.jobs.forEach(job => job.photo = this.photo);
          console.log(data)
          this.jobTitle+=" of type:"+ this.getStringValue(+type);
        },err=>{
          this.router.navigate(["/404"]);
        })
      } else{
        this.router.navigate(["/404"]);
      }
    });
  }

  getStringValue(jobType:JobType){
    switch(jobType){
      case 0 : return "School";
      case 1: return "Sport";
      case 2: return "Food";
      case 3 : return "Photography";
      case 4: return "Other";
      default: return null;
    }
  }

  getAssignedJobs() {  
    this.checkIfJobsExist();  
    this.jobService.getAssignedJobs().subscribe(data => {
      this.jobs = data;
      this.jobs.forEach(job => job.photo = this.photo);
    },err=>{
      this.router.navigate(["/404"]);
    });
  }

  getMyJobs(){
    this.jobService.getMyJobs().subscribe(data => {
      this.jobs = data;
      this.jobs.forEach(job => job.photo = this.photo);
    }, err=>{
      this.router.navigate(["/404"]);
    });
  }

  private getUnasignedJobs() {
    this.jobService.getJobs().subscribe(data => {
      this.jobs = data;
      this.jobs.forEach(job => job.photo = this.photo);
    },err=>{
      this.router.navigate(["/404"]);
    });
  }

  viewJob(id: number){
    this.router.navigate(['/viewJob/'+id.toString()]);
  }

  checkIfJobsExist(){
    if(this.jobs.length == 0){
      this.check= false;
    }
  }
}
