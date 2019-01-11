
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material';
import {ToastrModule} from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
  imports: 
  [CommonModule,
  RouterModule,
  MatFormFieldModule,
  ToastrModule.forRoot(),
  ],
  exports: [
    HeaderComponent,
    ToastrModule,
  ],
  declarations: [HeaderComponent],
})
export class SharedModule { }
