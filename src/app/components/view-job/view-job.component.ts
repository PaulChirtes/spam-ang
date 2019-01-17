import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/shared/data-types/Job';

@Component({
  selector: 'app-view-job',
  templateUrl: './view-job.component.html',
  styleUrls: ['./view-job.component.scss']
})
export class ViewJobComponent implements OnInit {
  job: Job = {
    title: "Moque Job 1",
      owner:"Company 1",
      description: "This is a random long long description if you read this I promise it makes no sense it's just blabla for the moqueup yay have fun reading this mf. WE ARE HIRING -I tried.",
      datePublished: "12.08.2018",
      photo: "../../../assets/images/job-image-moque.png",
      requirements: ["awesomeness"],
      type: "part-time",
      asignee: null
  }
  constructor() { }
  ngOnInit() {
  }

}
