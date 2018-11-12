import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PartTimeJobs';
  route: string;

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    this.route = this.router.url;
  }
}
