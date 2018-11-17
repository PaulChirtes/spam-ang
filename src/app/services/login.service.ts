import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../shared/dto/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private _http : HttpClient) { }

  public performLogin(user:User){
    let loginUrl = environment.apiUrl+"/login";
    return this._http.post<any>(loginUrl, user, {
      headers: this._headers,
      observe: 'response'
    });
  }
}
