import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/shared/dto/user';

const url = environment.apiUrl + "/login"

@Injectable({
  providedIn: 'root'
})
export class LoginService {
 
  constructor(private http: HttpClient) { }

  public login(user: User): Observable<any> {
    user.Password = btoa(user.Password);
    user.UserName = btoa(user.UserName);
    const httpOptions = {
      observe: 'response' as 'response',
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.post<any>(url, user, httpOptions);
  }

}
