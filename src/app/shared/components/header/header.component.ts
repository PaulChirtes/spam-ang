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
  private isLoggedIn = false;

  ngOnInit() {
    this.isLoggedIn = this.authDataStorage.isLoggedIn();
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

  Logout(){
    this.authDataStorage.clearAuthData();
    this.router.navigate(['/login']);
  }
}
