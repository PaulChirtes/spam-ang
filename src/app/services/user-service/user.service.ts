import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../shared/data-types/User';
import {Observable} from 'rxjs';

const url = 'http://localhost:idk/api/user/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public register(user: User): Observable<any> {
    return this.http.post<User>(url, user);

  }
}
