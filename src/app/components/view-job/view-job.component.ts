import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/shared/data-types/Job';
import { JobService } from 'src/app/services/job-service/job.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthDataStorage } from 'src/app/security/auth-data-storage';
import { UserType } from 'src/app/shared/data-types/user-type.enum';
import { JobType } from 'src/app/shared/data-types/job-type.enum';
import {ToastrService} from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ReviewComponent } from '../review/review.component';
import { Review } from 'src/app/shared/data-types/review';
import { ReviewService } from 'src/app/services/review-service/review.service';

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
  canReview = false;

  constructor( private jobService: JobService,
              private route: ActivatedRoute,
              private authStorage: AuthDataStorage,
              public router: Router,
              private toastr : ToastrService,
              private dialog: MatDialog,
              private reviewService: ReviewService) { }
  ngOnInit() {
    this.route.params.subscribe( params =>{
      var id = params['id'];
      if(id){
        this.jobService.getById(id).subscribe(data=>{
          this.job=data;
          this.job.photo = this.photo;        
          var user = this.authStorage.getUser();

          this.canApply = user!=null && user.UserType===UserType.Client && this.job.Assigne==null;
          this.canMakeFree = user!=null && user.UserType==UserType.Provider && this.job.Owner.Email===user.Email && this.job.Assigne!=null;
          this.canUnapply = user!=null && user.UserType==UserType.Client && this.job.Assigne!=null && this.job.Assigne.Email===user.Email;
          this.canReview = user!=null && (user.Email==this.job.Owner.Email || user.Email == this.job.Assigne.Email);
        }, err=>{
          this.router.navigate(["/404"]);
        });
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
        this.toastr.error(err.error.Message,"",{
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

  review(){
    if(this.canReview){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.height = '50%';
      dialogConfig.width = '50%';
      var review = '';
      var user = this.authStorage.getUser();
      if(user.Email == this.job.Owner.Email){
        review = this.job.OwnerReview;
      } else if( this.job.Assigne!=null && this.job.Assigne.Email==user.Email){
        review = this.job.AssigneeReview;
      }
      dialogConfig.data=review;
      const dialogRef = this.dialog.open(ReviewComponent,dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        if(result!=null){
          var rev = new Review();
          rev.Job = this.job;
          rev.AssigneeDescription = this.job.AssigneeReview;
          rev.OwnerDescription = this.job.OwnerReview;
          if(user.Email == this.job.Owner.Email){
            rev.OwnerDescription = result;
            this.job.OwnerReview = result;
          } else if( this.job.Assigne!=null && this.job.Assigne.Email==user.Email){
            rev.AssigneeDescription = result;
            this.job.AssigneeReview = result;
          }

          this.reviewService.postReview(rev).subscribe(_=>{
            this.toastr.success("Review added","",{
              "closeButton": true,
              "positionClass": "toast-bottom-right",
              "tapToDismiss": true});
          })

        }
      });
    }
  }

}
