import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { OrderNewComponent } from './order-new/order-new.component';
import { OrderListComponent } from './order-list/order-list.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: OrderListComponent },
    ]
  },
  {
    path: 'new',
    component: LayoutComponent,
    children: [
      { path: '', component: OrderNewComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
