import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products.routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductListComponent } from './product-list/product-list.component';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ProductNewComponent } from './product-new/product-new.component';
import { ProductDetailDialogComponent} from './product-list/product-detail-dialog/product-detail-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        ProductsRoutingModule,
        SharedModule,
        MatButtonModule,
        MatPaginatorModule,
    ],
    declarations: [
        ProductListComponent,
        ProductNewComponent,
        ProductDetailDialogComponent
    ]
})
export class ProductsModule { }
