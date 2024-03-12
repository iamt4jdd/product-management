import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserReportDetailComponent } from './user-report-detail/user-report-detail.component';
import { UserReportSalaryComponent } from './user-report-salary/user-report-salary.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UsersRoutingModule
  ],
  declarations: [UserListComponent, UserDetailComponent, UserReportDetailComponent, UserReportSalaryComponent]
})
export class UsersModule { }
