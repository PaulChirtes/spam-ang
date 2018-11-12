import { LoginFormComponent } from './components/login-form/login-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full',
    },
    {
      path: 'login',
      component: LoginFormComponent
    }
  ];
    @NgModule({
        imports: [ RouterModule.forRoot(routes)],
        exports: [RouterModule]
      })
      export class AppRoutingModule {}