import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  @Output() userEventEmitter = new EventEmitter();
  
  error1 = '';
  username: string;
  password: string;

  constructor() { }

  ngOnInit() {
  }

}
