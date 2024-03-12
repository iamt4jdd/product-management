import { ReporStageDetail } from "./report-stage-detail.model";

export class ReportDetail{
    orderId:number;
    productId:number;
    stageReports: ReporStageDetail[];
    constructor(orderId:number,productId:number,reportStageDetail:ReporStageDetail[]){
        this.productId = productId;
        this.orderId = orderId;
        this.stageReports = reportStageDetail;
    } 
}