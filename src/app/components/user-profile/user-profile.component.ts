import { Component, OnInit } from '@angular/core';
import {User} from '../../shared/data-types/User';
import {Skill} from '../../shared/data-types/Skill';
import {FormControl} from '@angular/forms';
import {UserDetails} from '../../shared/data-types/UserDetails';
import {UserService} from '../../services/user-service/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  image: string;
  skillFormControl = new FormControl();
  skillList: Skill[] = [];
  user: User = new User();
  url: string = "assets/images/user.png";
  name: string;
  email: string;
  password: string;
  phoneNo: string;

  constructor(private userService : UserService) { }

  ngOnInit() {
    this.userService.getUser().subscribe(data=> this.user=data);
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

  submit(): void {
    let currentSkill: Skill = new Skill();
    currentSkill.text = this.skillFormControl.value;
    this.skillList.push(currentSkill);

    this.skillFormControl.setValue('');
  }

  deleteSkill(s: Skill): void {
    const index = this.skillList.indexOf(s);
    if(index >= 0){
      this.skillList.splice(index, 1);
    }
  }

  saveProfile() : void {
    let userDetails : UserDetails = new UserDetails();
    userDetails.Email = this.email;
    userDetails.Username = this.name;
    userDetails.PhoneNumber = this.phoneNo;
    userDetails.Id = this.user.Id;
    this.userService.saveProfile(userDetails);
  }

}
