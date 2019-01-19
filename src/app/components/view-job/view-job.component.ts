import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/shared/data-types/Job';
import { JobService } from 'src/app/services/job-service/job.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthDataStorage } from 'src/app/security/auth-data-storage';
import { UserType } from 'src/app/shared/data-types/user-type.enum';
import { JobType } from 'src/app/shared/data-types/job-type.enum';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-view-job',
  templateUrl: './view-job.component.html',
  styleUrls: ['./view-job.component.scss']
})
export class ViewJobComponent implements OnInit {
  job: Job = new Job();
  photo= "../../../assets/images/job-image-moque.png";
  canApply = false;
  canUnapply = false;
  canMakeFree = false;
  constructor( private jobService: JobService,
              private route: ActivatedRoute,
              private authStorage: AuthDataStorage,
              public router: Router,
              private toastr : ToastrService) { }
  ngOnInit() {
    this.route.params.subscribe( params =>{
      var id = params['id'];
      if(id){
        this.jobService.getById(id).subscribe(data=>{
          this.job=data;
          this.job.photo = this.photo;        
          var user = this.authStorage.getUser();

          this.canApply = user!=null && user.UserType===UserType.Client && this.job.Assigne==null;
          console.log(user);
          console.log(this.job);
          this.canMakeFree = user!=null && user.UserType==UserType.Provider && this.job.Owner.Email===user.Email && this.job.Assigne!=null;
          this.canUnapply = user!=null && user.UserType==UserType.Client && this.job.Assigne!=null && this.job.Assigne.Email===user.Email;
          console.log(this.job.Assigne!=null)
        })
      }

    });
  }

  apply(){
    if(this.canApply){
      this.jobService.apply(this.job.Id).subscribe(_=>{
        this.toastr.success('You applied to job ' + this.job.Title,"",{
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

  unapply(){
    if(this.canUnapply){
      this.jobService.unapply(this.job.Id).subscribe(_=>{
        this.toastr.success('You unapplied to job ' + this.job.Title,"",{
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

  makeFree(){
    if(this.canMakeFree){
      this.jobService.unapply(this.job.Id).subscribe(_=>{
        this.toastr.success('You made available job ' + this.job.Title,"",{
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

}
