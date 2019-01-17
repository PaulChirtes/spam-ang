import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/shared/data-types/Job';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-browsing',
  templateUrl: './job-browsing.component.html',
  styleUrls: ['./job-browsing.component.scss']
})
export class JobBrowsingComponent implements OnInit {
  category="moque category"
  jobs: Job[]=[
    {
      title: "Moque Job 1",
      owner:"Company 1",
      description: "This is a random long long description if you read this I promise it makes no sense it's just blabla for the moqueup yay have fun reading this mf. WE ARE HIRING -I tried.",
      datePublished: "12.08.2018",
      photo: "../../../assets/images/job-image-moque.png",
      requirements: ["awesomeness"],
      type: "part-time",
      asignee: "CLIENT"

    },
    {
      title: "Moque Job 2",
      owner:"Company 2",
      description: "This is a random long long description if you read this I promise it makes no sense it's just blabla for the moqueup yay have fun reading this mf. WE ARE HIRING -I tried.",
      datePublished: "12.08.2018",
      photo: "../../../assets/images/job-image-moque.png",
      requirements: ["awesomeness"],
      type: "part-time",
      asignee: "CLIENT"
    },
    {
      title: "Moque Job 3",
      owner:"Company 3",
      description: "This is a random long long description if you read this I promise it makes no sense it's just blabla for the moqueup yay have fun reading this mf. WE ARE HIRING -I tried.",
      datePublished: "12.08.2018",
      photo: "../../../assets/images/job-image-moque.png",
      requirements: ["awesomeness"],
      type: "part-time",
      asignee: "CLIENT"
    },
    {
      title: "Moque Job 4",
      owner:"Company 4",
      description: "This is a random long long description if you read this I promise it makes no sense it's just blabla for the moqueup yay have fun reading this mf. WE ARE HIRING -I tried.",
      datePublished: "12.08.2018",
      photo: "../../../assets/images/job-image-moque.png",
      requirements: ["awesomeness"],
      type: "part-time",
      asignee: "CLIENT"
    }
  ]
  constructor(public router:Router) { }

  ngOnInit() {
  }

  viewJob(){
    this.router.navigate(['/viewJob']);
  }
}
