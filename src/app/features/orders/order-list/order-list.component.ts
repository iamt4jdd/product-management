import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { Order } from 'src/app/core/models/order.model';
import { NotificationService } from 'src/app/core/services/notification.service';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  displayedColumns: string[] = ['uuid', 'amount', 'productUuid', 'date'];
  dataSource = new MatTableDataSource<any>();
  isHasData: Boolean = false;
  pageSizeOptions: number[] = [1, 2, 5];
  Page: number = 0;
  Size: number = 10;
  recordCount = this.Size;
  queryParams: any;

  constructor(private orderSerice: OrderService,
    private logger: NGXLogger,
    private notificationService: NotificationService,
    private titleService: Title,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('order-management - Orders');
    this.logger.log('Orders loaded');
    this.notificationService.openSnackBar('Đang tải đơn hàng...');
    this.route.queryParams.subscribe(params => {
      this.queryParams = params;
    });
    this.getOrders(this.queryParams.productUuid);
    
  }

  getOrders(productUuid?: string) {
    this.orderSerice.getOrders(undefined,undefined, productUuid).subscribe((res: any) => {
      this.dataSource = new MatTableDataSource<Order[]>(res.results);
      this.isHasData = res.total !== 0;
    })
  }

  pageNavigations(event: PageEvent) {
    this.Page = event.pageIndex;
    this.Size = event.pageSize;
    this.reloadData(this.Page, this.Size);
  }

  reloadData(page: Number, size: Number) {
    this.orderSerice.getOrders(page, size).subscribe((res: any) => {
      this.recordCount = res.total;
      this.dataSource = new MatTableDataSource<Order[]>(res.results);
    })
  }
}
