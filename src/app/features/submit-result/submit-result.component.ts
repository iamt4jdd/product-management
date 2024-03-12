import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { Product } from 'src/app/core/models/product.model';
import { ReportDetail } from 'src/app/core/models/request/report-detail.model';
import { StageResponse } from 'src/app/core/models/response/stage-response.model';
export interface ResultData{
  products: Product[];
  money:number;
  reports: ReportDetail[];
  stagesCollection:Array<StageResponse[]>;
}

export interface ResultResponse{
  money:number;
  reports: ReportStage[];
}

export interface ReportStage{
  productUuid: string;
  stageId: number;
  stageName:string;
  amount: number;
  costToltal: String;
}
@Component({
  selector: 'app-submit-result',
  templateUrl: './submit-result.component.html',
  styleUrls: ['./submit-result.component.css'],
  standalone:true,
  imports: [MatTableModule,MatButtonModule]
})

export class SubmitResultComponent implements OnInit {
  displayedColumns: string[] = ['productUuidCol','stageNameCol', 'amountCol','costTotalCol'];
  reportStages: Array<ReportStage> =[];
  products: Product[] =[];
  moneyFormat: String ="";
  dollarUSLocale = Intl.NumberFormat('vi');
  constructor(
    public dialogRef: MatDialogRef<SubmitResultComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ResultData,
  ) {}

  ngOnInit(): void {
  this.onHandleData();
  this.moneyFormat = this.dollarUSLocale.format(this.data.money);
  }

  onHandleData(){
    for(let i=0;i<this.data.reports.length;i++){
      this.products = this.data.products;
      this.data.reports[i].stageReports.forEach(element => {
        let stage = this.onGetStage(element.stageId);
        let costTotal = stage.cost*element.amount;
        let costTotalFormat = this.dollarUSLocale.format(costTotal);;
        let productUuid = this.getProductUuid(this.data.reports[i].productId,this.products)
        let reStage: ReportStage = {productUuid,stageId:element.stageId,stageName:stage.stageName,amount:element.amount,costToltal:costTotalFormat};
        this.reportStages.push(reStage);
      });
    }

  }
  getProductUuid(productId:number, products:Product[]){
    for(let i =0;i<products.length;i++){
      if(products[i].id === productId){
        return products[i].uuid;
      }
    }
    return "";
  }

  onNoClick(): void {
    this.dialogRef.close(true);
  }

  onGetStage(stageId:number){
    for(let x=0;x<this.data.stagesCollection.length;x++){
      let stagesArray = this.data.stagesCollection[x];
      for(let y =0; y<stagesArray.length;y++){
        if(stagesArray[y].id===stageId){
          return stagesArray[y];
        }
          
      }
    }
    return new StageResponse(0,"",0,0,0);
  }

}
