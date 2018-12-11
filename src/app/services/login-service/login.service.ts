import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const url = 'http://localhost:idk/api/user/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  public login(username, password): Observable<any> {
    const httpOptions = {
      observe: 'response' as 'response',
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    const body = {
      username: btoa(username),
      password: btoa(password)
    };

    return this.http.post<any>(url, body, httpOptions);
  }

}
