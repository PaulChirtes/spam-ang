import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../shared/data-types/User';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public register(user: User): Observable<any> {
    return this.http.post<User>(`${environment.apiUrl}/register`, user);

  }
}
