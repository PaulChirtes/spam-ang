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

    owner: string;
    asignee: string;
    photo: string;
    title: string;
    type:string;
    requirements: string[];
    description: string;
    datePublished: string;

  constructor(public service : JobService, private router : Router, private toastr : ToastrService) { }

  ngOnInit() {
  }

  setJobDetails(job) {
    this.owner = job.owner;
    this.photo = job.photo;
    this.title = job.title;
    this.type = job.type;
    this.requirements = job.requirements;
    this.description = job.description;
    this.datePublished = job.datePublished;
  }

  isValid(job: Job) {
    return job.datePublished != null &&
    job.description != null &&
    job.requirements != null &&
    job.title != null;
  }

  createJob() {
    let job = new Job();
    job.owner = this.owner;
    job.photo = this.photo;
    job.title = this.title;
    job.type = this.type;
    job.requirements = this.requirements;
    job.description = this.description;
    job.datePublished = this.datePublished;
    console.log(job);
    if (this.isValid(job)) {
      this.service.postJob(job).subscribe(data => {
        this.toastr.success('The job has been successfully created',"",{
          "closeButton": true,
          "positionClass": "toast-top-center",
          "tapToDismiss": true});
        this.router.navigate(['/dashboard']);
      });
    }
    else {
      this.toastr.error('Job ' + job.title + ' was not created. Please input values for all mandatory fields.',"",{
        "closeButton": true,
        "positionClass": "toast-top-center",
        "tapToDismiss": true});
    }
  }

}
