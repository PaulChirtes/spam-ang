import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router'
import { AuthDataStorage } from 'src/app/security/auth-data-storage';
import { UserType } from 'src/app/shared/data-types/user-type.enum';

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

  

  //TO DO: needs to be tested with backend and if works it will be used for add button
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

}
