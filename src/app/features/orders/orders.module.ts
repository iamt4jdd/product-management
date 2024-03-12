import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { OrderNewComponent } from './order-new/order-new.component';
import { OrdersRoutingModule } from '../orders/orders.routing.module';
import { OrderListComponent } from './order-list/order-list.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        MatButtonModule,
        MatPaginatorModule,
        OrdersRoutingModule
    ],
    declarations: [
        OrderNewComponent,
        OrderListComponent
    ]
})
export class OrdersModule { }
