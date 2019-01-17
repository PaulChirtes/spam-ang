import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../../shared/data-types/User';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import {AuthDataStorage} from '../../security/auth-data-storage';
import {UserDetails} from '../../shared/data-types/UserDetails';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private service : AuthDataStorage) { }

  public register(user: User): Observable<any> {
    return this.http.post<User>(`${environment.apiUrl}/register`, user);

  }

  public getUser(): Observable<UserDetails> {
    console.log(this.service.getJwtToken());
    const httpOptions = {
      headers: new HttpHeaders({'token': this.service.getJwtToken()})
    };
    return this.http.get<UserDetails>(`${environment.apiUrl}/profile`, httpOptions);
  }

  public saveProfile(userDetails : UserDetails): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'token': this.service.getJwtToken()})
    };
    return this.http.post(`${environment.apiUrl}/profile`, userDetails, httpOptions);
  }
}
