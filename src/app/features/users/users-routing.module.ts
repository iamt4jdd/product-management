import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';

import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserReportDetailComponent } from './user-report-detail/user-report-detail.component';
import { UserReportSalaryComponent } from './user-report-salary/user-report-salary.component';
import { CanActivateRoleWithBoth } from '../auth/all-auth.security';
import { CanActivateRoleWithAdmin } from '../auth/admin-auth.security';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: UserListComponent },
    ],
    canActivate: [CanActivateRoleWithAdmin]
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'detail', component: UserDetailComponent },
    ],
    canActivate: [CanActivateRoleWithBoth]
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'report-detail', component: UserReportDetailComponent },
      
    ],
    canActivate: [CanActivateRoleWithAdmin]
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'report-salary', component: UserReportSalaryComponent },
    ],
    canActivate: [CanActivateRoleWithAdmin]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
