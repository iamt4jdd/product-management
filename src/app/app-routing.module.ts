import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportFormComponent } from './features/report-form/report-form.component';
import { CanActivateRoleWithAdmin } from './features/auth/admin-auth.security';
import { ReportSalaryComponent } from './features/users-feature/report-salary/report-salary.component';
import { CanActivateRoleWithEmployee } from './features/auth/employee-auth.security';
import { LoginComponent } from './features/auth/login/login.component';

const appRoutes: Routes = [
  {
    path:'form-submit',
    component: ReportFormComponent
  },
  {
    path: 'employee-report-salary',
    component: ReportSalaryComponent,
    canActivate: [CanActivateRoleWithEmployee]
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [CanActivateRoleWithAdmin]
  },
  {
    path: 'products',
    loadChildren: () => import('./features/products/products.module').then(m => m.ProductsModule), 
    canActivate: [CanActivateRoleWithAdmin]
  },
  {
    path: 'orders',
    loadChildren: () => import('./features/orders/orders.module').then(m => m.OrdersModule), 
    canActivate: [CanActivateRoleWithAdmin]
  },
  {
    path: 'users',
    loadChildren: () => import('./features/users/users.module').then(m => m.UsersModule),
  },
  {
    path: 'account',
    loadChildren: () => import('./features/account/account.module').then(m => m.AccountModule),
    canActivate: [CanActivateRoleWithAdmin]
  },
  {
    path: '',
    redirectTo:'/auth/login',
    pathMatch:'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {useHash:true})
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
