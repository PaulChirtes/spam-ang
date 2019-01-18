import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/shared/data-types/Job';
import { JobService } from 'src/app/services/job-service/job.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthDataStorage } from 'src/app/security/auth-data-storage';
import { UserType } from 'src/app/shared/data-types/user-type.enum';

@Component({
  selector: 'app-view-job',
  templateUrl: './view-job.component.html',
  styleUrls: ['./view-job.component.scss']
})
export class ViewJobComponent implements OnInit {
  job: Job = new Job();
  photo= "../../../assets/images/job-image-moque.png";
  canApply = false;
  constructor( private jobService: JobService,
              private route: ActivatedRoute,
              private authStorage: AuthDataStorage,
              public router: Router) { }
  ngOnInit() {
    this.route.params.subscribe( params =>{
      var id = params['id'];
      if(id){
        this.jobService.getById(id).subscribe(data=>{
          this.job=data;
          this.job.photo = this.photo;
        })
      }

      var user = this.authStorage.getUser();
      this.canApply = user!=null && user.UserType===UserType.Client;

    });
  }

  apply(){
    if(this.canApply){
      this.jobService.apply(this.job.Id).subscribe(_=>{
        this.router.navigate(["/dashboard"]);
      })
    }
  }

}
