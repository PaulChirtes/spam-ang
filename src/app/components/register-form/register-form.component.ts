import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../shared/data-types/User';
import {UserService} from '../../services/user-service/user.service';

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

  constructor(private service: UserService) {}


  ngOnInit() {
  }

  register() {
    const user: User = new User();
    user.username = this.name;
    user.email = this.email;
    user.phoneNo = this.phoneNo;
    user.password = this.password;
    user.userType = this.userType;
    this.service.register(user);
    //login
    // //set logged in use
  }

  selected(e) {
    this.userType = e.option.value;
  }


}
