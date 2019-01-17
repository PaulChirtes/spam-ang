import { LoginFormComponent } from './components/login-form/login-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { LoginService } from './services/login-service/login.service';
import { JobBrowsingComponent } from './components/job-browsing/job-browsing.component';
import {RegisterFormComponent} from './components/register-form/register-form.component';
import { AddJobComponent } from './components/add-job/add-job.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import { ViewJobComponent } from './components/view-job/view-job.component';

const routes: Routes = [
    {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full',
    },
    {
      path: 'login',
      component: LoginFormComponent
    },
    {
      path: 'dashboard',
      loadChildren: './components/dashboard/dashboard.module#DashboardModule',
      pathMatch: 'full',
    },
    {
      path: 'jobs',
      component: JobBrowsingComponent
    },
  {
    path: 'register',
    component: RegisterFormComponent
  },
  {
    path: 'addJob',
    component: AddJobComponent
  },
  {
    path: 'profile',
    component: UserProfileComponent
  },
  {
    path: 'viewJob',
    component: ViewJobComponent
  }

  ];
    @NgModule({
        imports: [ RouterModule.forRoot(routes)],
        exports: [RouterModule]
      })
      export class AppRoutingModule {}
