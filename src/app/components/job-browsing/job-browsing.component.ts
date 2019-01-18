import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/shared/data-types/Job';
import { Router } from '@angular/router';
import { JobService } from 'src/app/services/job-service/job.service';

@Component({
  selector: 'app-job-browsing',
  templateUrl: './job-browsing.component.html',
  styleUrls: ['./job-browsing.component.scss']
})
export class JobBrowsingComponent implements OnInit {
  category="";
  photo= "../../../assets/images/job-image-moque.png";
  jobs: Job[]=new Array<Job>();
  
  constructor(public router:Router,
              private jobService: JobService) { }

  ngOnInit() {
    this.jobService.getJobs().subscribe(data => {
      this.jobs = data;
      this.jobs.forEach(job=>job.photo=this.photo);
    })
  }

  viewJob(id: number){
    this.router.navigate(['/viewJob/'+id.toString()]);
  }
}
