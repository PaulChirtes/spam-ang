import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { MatButtonModule, MatFormFieldModule, MatAutocompleteModule, MatInputModule, MatDividerModule, MatSelectModule,
  MatToolbarModule } from '@angular/material';
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


@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    JobCardComponent,
    JobBrowsingComponent,
    LoginFormComponent,
    RegisterFormComponent,
    AddJobComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    AppRoutingModule,
    BrowserModule,
    MatButtonModule,
    MatFormFieldModule,
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
  ],
  exports: [SharedModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
