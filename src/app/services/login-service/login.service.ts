import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  public login(email, password): Observable<any> {
    const httpOptions = {
      observe: 'response' as 'response',
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    
    const body = {
      Email: btoa(email),
      Password: btoa(password)
    };

    return this.http.post<any>(`${environment.apiUrl}/login`, body, httpOptions);
  }

}
