import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/shared/data-types/Job';
import { JobService } from 'src/app/services/job-service/job.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-job',
  templateUrl: './view-job.component.html',
  styleUrls: ['./view-job.component.scss']
})
export class ViewJobComponent implements OnInit {
  job: Job = new Job();
  photo= "../../../assets/images/job-image-moque.png";
  constructor( private jobService: JobService,
              private route: ActivatedRoute) { }
  ngOnInit() {
    this.route.params.subscribe( params =>{
      var id = params['id'];
      if(id){
        this.jobService.getById(id).subscribe(data=>{
          console.log(data);
          this.job=data;
          this.job.photo = this.photo;
        })
      }

    });
  }

}
