import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthDataStorage } from 'src/app/security/auth-data-storage';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authDataStorage : AuthDataStorage, public router: Router) {}

  ngOnInit() {
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  goToProfile(){
    this.router.navigate(['/profile']);
  }

  isLoggedInH() : boolean {
    return this.authDataStorage.isLoggedIn();
  }

  Logout()
  {
    this.router.navigate(['/dashboard']);
  }
}
