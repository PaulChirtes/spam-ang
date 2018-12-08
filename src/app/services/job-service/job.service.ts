import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) { }

  public getJobs(): Observable<any> {
    const url = 'http://localhost:????/api/jobs';
    return this.http.get(url);
  }
}
