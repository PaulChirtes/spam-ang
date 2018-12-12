import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from 'src/app/shared/data-types/Job';

//TODO: the right job url will be in this constant
const job_url = 'http://localhost:8133/job';
@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) { }

  public getJobs(): Observable<any> {
    const url = 'http://localhost:????/api/jobs';
    return this.http.get(url);
  }

  public postJob(job: Job) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(job_url, job, httpOptions);
  }
}
