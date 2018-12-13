import { Component, OnInit, HostListener } from '@angular/core';
import { LoginService } from 'src/app/services/login-service/login.service';
import { AuthDataStorage } from 'src/app/security/auth-data-storage';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  error = '';
  username: string;
  password: string;

  constructor(private authDataStorage: AuthDataStorage, private service: LoginService,
    public router : Router) { }

  ngOnInit() {
  }

  logIn(): void {
    this.service.login(this.username, this.password).subscribe(
      response => {
        let jwtToken = response.headers.get('Authorization');
        this.authDataStorage.setJwtToken(jwtToken);
        console.log("User has logged in");
        //set logged in user
        this.router.navigate(['/dashboard']);
      },
      err => {
        this.error = err;
      });
  }

  @HostListener('document:keypress', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      this.logIn();
    }
  }

}
