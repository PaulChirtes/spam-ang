import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import { Job } from 'src/app/shared/data-types/Job';
import { User } from 'src/app/shared/data-types/User';
import { JobService } from 'src/app/services/job-service/job.service';
import { Router } from '@angular/router';
import { OwlDateTimeModule } from 'ng-pick-datetime';
import { OwlDateTimeComponent, DateTimeAdapter, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss']
})
export class AddJobComponent implements OnInit {
    title: string;
    description: string;

  constructor(public service : JobService,
              private router : Router, 
              private toastr : ToastrService) { }

  ngOnInit() {
  }

  createJob() {
    let job = new Job();
    job.Title = this.title;
    job.Description = this.description;
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
    return job.Title && job.Title!='' && job.Description && job.Description!='';
  }

}
