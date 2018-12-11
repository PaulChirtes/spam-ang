// import { NgModule } from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';

// const routes: Routes = [];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class DashboardRoutingModule { }
import { DashboardModule } from './dashboard.module';

describe('DashbordModule', () => {
  let dashbordModule: DashboardModule;

  beforeEach(() => {
    dashbordModule = new DashboardModule();
  });

  it('should create an instance', () => {
    expect(dashbordModule).toBeTruthy();
  });
});
