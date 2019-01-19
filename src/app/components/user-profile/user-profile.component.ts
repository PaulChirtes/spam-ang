import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {UserDetails} from '../../shared/data-types/UserDetails';
import {UserService} from '../../services/user-service/user.service';
import { UserType } from 'src/app/shared/data-types/user-type.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  image: string;
  skillFormControl = new FormControl();
  skillList: string[] = [];
  user: UserDetails = new UserDetails();
  url: string = "assets/images/user.png";
  name: string;
  email: string;
  phoneNo: string;
  isClient = false;

  constructor(private userService : UserService,
              private router: Router) { }

  ngOnInit() {
    this.userService.getUser().subscribe(data=> {
         this.user = data;
         if(this.user) {
            this.setFormInfo(this.user.Username, this.user.Email, this.user.PhoneNumber, this.user.Skills);
          }
          this.isClient = this.user.Type===UserType.Client;
          console.log(this.user);
          console.log(UserType.Client);
      });
    
  }

  setFormInfo(name, email, phone, skills) {
    this.name = name;
    this.email = email;
    this.phoneNo = phone;
    this.skillList = skills;
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
    this.skillList.push(this.skillFormControl.value);

    this.skillFormControl.setValue('');
  }

  deleteSkill(s: string): void {
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
    userDetails.Skills = this.isClient ? this.skillList : null;
    this.userService.saveProfile(userDetails).subscribe(()=>{
      this.router.navigate(["/dashboard"]);
    });
  }

}
