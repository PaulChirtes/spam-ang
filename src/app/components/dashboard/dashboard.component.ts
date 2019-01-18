import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: any;

  constructor(public router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem("curent user"));
  }

  //TO DO: needs to be tested with backend and if works it will be used for add button
  isAdmin(): boolean {
    return this.user.UserType == 0;
  }

  goToAllJobs() {
    this.router.navigate(['/jobs']);
  }

  goToAddJob() {
    this.router.navigate(['/addJob']);
  }

}
