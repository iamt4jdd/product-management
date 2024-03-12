import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NGXLogger } from 'ngx-logger';
import { Title } from '@angular/platform-browser';
import { NotificationService } from 'src/app/core/services/notification.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StageService } from 'src/app/core/services/stage.service';
import { StageResponse } from 'src/app/core/models/response/stage-response.model';

@Component({
  selector: 'app-product-detail-dialog',
  templateUrl: './product-detail-dialog.component.html',
  styleUrls: ['./product-detail-dialog.component.css']
})
export class ProductDetailDialogComponent implements OnInit {
  displayedColumns: string[] = ['stageName', 'cost', 'completionAmount',"total"];
  dataSource = new MatTableDataSource<StageResponse[]>();
  dollarUSLocale = Intl.NumberFormat('vi');
  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort;
  productId?: number;

  constructor(
    private logger: NGXLogger,
    private titleService: Title,
    public dialogRef: MatDialogRef<ProductDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private stageService: StageService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('product-detail-management - products');
    this.logger.log('Customers loaded');
    this.getStages();
    this.dataSource.sort = this.sort;
  }
  getStages() {
    this.productId = parseInt(this.data.id);
    this.stageService.getByProductId(this.productId).subscribe((res: any) => {
      this.dataSource = new MatTableDataSource<StageResponse[]>(res);
    });
  }

  confirm() {
    this.dialogRef.close()
  }

  makeColoreForInValidStage(completionAmount: number) {
    const amount = this.data.amount;
    if (completionAmount > amount) {
      return 'red';
    }
    return "blue";
  }

  tranferToCurrent(money:number){
    return this.dollarUSLocale.format(money);
  }
}
