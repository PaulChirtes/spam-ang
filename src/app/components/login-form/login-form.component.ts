import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/shared/dto/user';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  @Output() userEventEmitter = new EventEmitter();
  
  username: string;
  password: string;

  constructor(private _loginService: LoginService,
              private _cookieService: CookieService) { }

  ngOnInit() {
  }

  login(){
    let user = new User(this.username,this.password);
    this._loginService.performLogin(user).subscribe(obj => {
      if(obj.headers.get("token")){
        this._cookieService.set("token",obj.headers.get("token"));
      }
    })
  }

}
