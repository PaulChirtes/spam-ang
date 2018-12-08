import { Component, OnInit, Input } from '@angular/core';
import { Job } from 'src/app/shared/data-types/Job';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss']
})
export class JobCardComponent implements OnInit {

  @Input() job: Job;
  constructor() { }

  ngOnInit() {

  }

}
