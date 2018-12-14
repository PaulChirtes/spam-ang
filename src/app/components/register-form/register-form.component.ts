import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../shared/data-types/User';
import {UserService} from '../../services/user-service/user.service';
import { UserType } from 'src/app/shared/data-types/user-type.enum';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  name: string;
  email: string;
  password: string;
  phoneNo: string;
  userType: string;

  private userForm: FormGroup;

  constructor(private service: UserService,
              private router : Router) {}


  ngOnInit() {
    this.userForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      phoneNo: new FormControl(''),
      password: new FormControl(''),
      userType: new FormControl(this.userType)
    })
  }

  register() {
    const user: User = this.getUser();
    this.service.register(user)
        .subscribe(_ => {
          this.router.navigate(["/login"]);
        }, err => {
          console.log(err);
        });
  }


  getUser():User {
    let currentUser = this.userForm.value;
    const user: User = new User();
    user.Username = currentUser.name;
    user.Email = currentUser.email;
    user.PhoneNumber = this.userForm.controls.phoneNo.valid ? currentUser.phoneNo : '';
    user.Password = currentUser.password;
    user.UserType = currentUser.userType === "Provider" ? UserType.Provider : UserType.Client;
    user.Id = 0;
    return user;
  }
}
