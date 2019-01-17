import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoginFormComponent } from './components/login-form/login-form.component';
import {
  MatButtonModule, MatFormFieldModule, MatAutocompleteModule, MatInputModule, MatDividerModule, MatSelectModule,
  MatToolbarModule, MatTooltipModule, MatIconModule, MatCardModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JobCardComponent } from './components/job-card/job-card/job-card.component';
import { SharedModule } from './shared/shared.module';
import { JobBrowsingComponent } from './components/job-browsing/job-browsing.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { AddJobComponent } from './components/add-job/add-job.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { ViewJobComponent } from './components/view-job/view-job.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    JobCardComponent,
    JobBrowsingComponent,
    LoginFormComponent,
    RegisterFormComponent,
    AddJobComponent,
    UserProfileComponent,
    ViewJobComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    AppRoutingModule,
    BrowserModule,
    MatButtonModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatDividerModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatCardModule
  ],
  exports: [SharedModule,
  CommonModule,
BrowserModule,],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
