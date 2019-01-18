import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from 'src/app/shared/data-types/Job';
import { environment } from 'src/environments/environment';
import { AuthDataStorage } from 'src/app/security/auth-data-storage';
import { HttpParamsOptions } from '@angular/common/http/src/params';


@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient,
              private service : AuthDataStorage) { }

  public getJobs(): Observable<Job[]> {
    var url = `${environment.apiUrl}/unassignedJobs`;
    return this.http.get<Job[]>(url);
  }

  public getAssignedJobs(): Observable<Job[]> {
    var url = `${environment.apiUrl}/assignedJobs`;
    var httpOptions = {
      headers: new HttpHeaders({'token': this.service.getJwtToken()})
    };
    return this.http.get<Job[]>(url,httpOptions);
  }

  public getMyJobs(): Observable<Job[]> {
    var url = `${environment.apiUrl}/createdJobs`;
    var httpOptions = {
      headers: new HttpHeaders({'token': this.service.getJwtToken()})
    };
    return this.http.get<Job[]>(url,httpOptions);
  }

  public getById(id: number): Observable<Job>{
    var url = `${environment.apiUrl}/getJob/${id}`;
    return this.http.get<Job>(url);
  }

  public postJob(job: Job) {
    var url = `${environment.apiUrl}/unassignedJobs`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(url, job, httpOptions);
  }
}
