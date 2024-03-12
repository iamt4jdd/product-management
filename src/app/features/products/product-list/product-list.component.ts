import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NGXLogger } from 'ngx-logger';
import { Title } from '@angular/platform-browser';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/core/models/product.model';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailDialogComponent } from './product-detail-dialog/product-detail-dialog.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  displayedColumns: string[] = ['uuid', 'productName', 'amount', 'date','completionAmount', 'handle'];
  dataSource = new MatTableDataSource<Product[]>();
  Page: number = 0;
  Size: number = 10;
  recordCount = this.Size;
  pageSizeOptions: number[] = [10, 20, 50];
  isHasData: Boolean = false;


  constructor(
    private logger: NGXLogger,
    private notificationService: NotificationService,
    private titleService: Title,
    private productService: ProductService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.titleService.setTitle('product-management - Products');
    this.logger.log('Products loaded');
    this.notificationService.openSnackBar('Đang tải sản phẩm...');
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts(this.Page, this.Size).subscribe((res: any) => {
      this.dataSource = new MatTableDataSource<Product[]>(res.get("productsArray"));
      this.isHasData = res.get("productsArray").length !== 0;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  pageNavigations(event: PageEvent) {
    this.Page = event.pageIndex;
    this.Size = event.pageSize;
    this.reloadData(this.Page, this.Size);
  }

  reloadData(page: Number, size: Number) {
    this.productService.getProducts(page, size).subscribe((res: any) => {
      this.recordCount = res.get("totalsPage");
      this.dataSource = new MatTableDataSource<Product[]>(res.get("productsArray"));
    })
  }

  changeStatus(id: Number) {
    this.productService.changeStatus(id).subscribe({
      next: data => {
        if (data) {
          this.reloadData(this.Page, this.Size);
        }
        this.notificationService.openSnackBar("Cập nhập sản phẩm thành công.");
      },
      error: error => {
        this.notificationService.openSnackBar("Cập nhập sản phẩm thất bại.");
      }
    }
    )
  }
  openAddUserForm(id: number, amount: number) {
    const dialogRef = this.dialog.open(ProductDetailDialogComponent, {
      height: '70%',
      width: '500px',
      data: {id, amount}
    })
      .afterClosed()
      .subscribe((shouldReload: boolean) => {
        if (shouldReload) window.location.reload()
      })
  }
}
