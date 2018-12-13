import { Component, OnInit } from '@angular/core';
import {User} from '../../shared/data-types/User';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  image: string;
  skills: string[] = [];
  user: User = new User();
  url: string = "assets/images/user.png";
  name: string;
  email: string;
  password: string;
  phoneNo: string;

  constructor() { }

  ngOnInit() {
    if(this.user) {
      this.setFormInfo(this.user.Username, this.user.Email, this.user.PhoneNumber, this.user.Password);
    }
  }

  setFormInfo(name, email, phone, pass) {
    this.name = name;
    this.email = email;
    this.phoneNo = phone;
    this.password = pass;
  }
  onFileSelected(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsDataURL(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    const path = readerEvt.target.result;
    this.url= path;
    this.image = path;
  }

}
