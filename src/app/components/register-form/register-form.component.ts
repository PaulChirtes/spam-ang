import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../shared/data-types/User';
import { Router } from '@angular/router';
import {UserService} from '../../services/user-service/user.service';
import { UserType } from 'src/app/shared/data-types/user-type.enum';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

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

  constructor(private service: UserService, public router: Router, private toastr : ToastrService) {}
  private userForm: FormGroup;

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
          this.toastr.success('Welcome to our application',"",{
            "closeButton": true,
            "positionClass": "toast-bottom-right",
            "tapToDismiss": true});
          this.router.navigate(["/dashboard"]);
        }, err => {
          this.toastr.error(err.error.Message,"",{
            "closeButton": true,
            "positionClass": "toast-bottom-right",
            "tapToDismiss": true});
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
