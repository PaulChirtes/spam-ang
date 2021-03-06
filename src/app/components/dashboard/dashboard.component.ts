import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router'
import { AuthDataStorage } from 'src/app/security/auth-data-storage';
import { UserType } from 'src/app/shared/data-types/user-type.enum';
import { JobType } from 'src/app/shared/data-types/job-type.enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: any;
  isProvider = false;
  allJobsText = "";
  canAdd=false;

  constructor(public router: Router,
              private authStorage: AuthDataStorage) { }

  ngOnInit() {
    this.user = this.authStorage.getUser();
    this.isProvider = this.user!=null && this.user.UserType === UserType.Provider;
    if(this.user==null){
      this.allJobsText = "view jobs";
    } else if(this.isAdmin()){
      this.allJobsText = "View my jobs";
      this.canAdd=true;
    } else {
      this.allJobsText = "View Unassigned jobs";
    }
  }  

  isAdmin(): boolean {
    return this.user!=null && this.user.UserType === UserType.Provider;
  }

  goToAllJobs() {
    if(!this.isAdmin()){
      this.router.navigate(['/jobs']);
    } else {
      this.router.navigate(["/myJobs"]);
    }
  }

  goToAddJob() {
    if(this.isAdmin()){
      this.router.navigate(['/addJob']);
    }
  }

  goToAssignedJobs(){
    if(this.user!=null && this.user.UserType===UserType.Client){
      this.router.navigate(["/assignedJobs"])
    }
  }

  goToJobsByType(type){
    this.router.navigate(["/jobsByType/"+this.getType(type)])
  }

  getType(type): JobType{
    switch(type){
      case "School": return JobType.School;
      case "Sport": return JobType.Sport;
      case "Food": return JobType.Food;
      case "Photography": return JobType.Photography;
      case "Other": return JobType.Other;
      default: return null;
    }
  }

}
