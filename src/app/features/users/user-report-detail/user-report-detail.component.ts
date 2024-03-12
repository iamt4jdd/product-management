import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EmployeeReportDetailRequest } from 'src/app/core/models/request/emp-report-detail.request.model';
import { EmployeeReportDetailData } from 'src/app/core/models/response/emp-report/emp-report-detail-data.model';
import { EmployeeReportDetailResponse } from 'src/app/core/models/response/emp-report/emp-report-detail-response.model';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ReportDailyService } from 'src/app/core/services/report-daily.service';
import * as moment from 'moment';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import 'moment/locale/vi';
import { ReportUpdateAmountRequest } from 'src/app/core/models/request/report-update-amount.model';
@Component({
  selector: 'app-user-report-detail',
  templateUrl: './user-report-detail.component.html',
  styleUrls: ['./user-report-detail.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'vi' },
  ]
})
export class UserReportDetailComponent implements OnInit {
  empReportDetail: EmployeeReportDetailResponse = new EmployeeReportDetailResponse("0", []);
  dataSource: MatTableDataSource<EmployeeReportDetailData> = new MatTableDataSource();
  isHasData: Boolean = false;
  displayedColumns: string[] = ['id', 'productName', 'stageName', 'amount', 'money', 'dateSubmit', 'action'];
  employeeName: String = "";
  employeeId: number = 0;
  timeForm: FormGroup;


  constructor(private reportDetailService: ReportDailyService,
    private notificationService: NotificationService, private router: Router, private fb: FormBuilder) {
    const dateCurrent = new Date();
    let date = dateCurrent.getDate();
    let month = dateCurrent.getMonth();
    let year = dateCurrent.getFullYear();
    this.timeForm = fb.group({
      dateStart: (moment([year, month, date])),
      dateEnd: (moment([year, month, date]))
    });
    this.onGetStateData(router);
  }

  ngOnInit(): void {
    this.filterReport();
  }

  onGetInfor(dateStart: string, dateEnd: string) {
    var request = new EmployeeReportDetailRequest(this.employeeId, dateStart, dateEnd);
    this.reportDetailService.getEmployeeReport(request).subscribe({
      next: data => {
        this.empReportDetail = data;
        this.dataSource = new MatTableDataSource(this.empReportDetail.employeeReportDetails);
        this.isHasData = this.empReportDetail.employeeReportDetails.length !== 0;
      },
      error: error => {
        this.notificationService.openSnackBar("Xảy ra lỗi trong khi lấy thông tin.");
      }
    })
  }

  onGetStateData(router: Router) {
    let currentNavigation = router.getCurrentNavigation();
    if (currentNavigation != null) {
      let extras = currentNavigation.extras;
      if (extras != null) {
        let states = extras.state;
        if (states != null) {
          this.employeeName = states['employeeName'];
          this.employeeId = states['employeeId'];
        }
      }
    }
  }

  getFullOfCurrentYear(isBegin: Boolean) {
    let date = new Date();
    if (isBegin) {
      return "01/01/" + this.onGetYear(date);
    } else {
      return "31/12/" + this.onGetYear(date);
    }

  }

  onGetMonth(date: Date) {
    let month = date.getMonth() + 1;
    if (month < 10) {
      return "0" + month.toString();
    } else {
      return month.toString();
    }
  }

  onGetYear(date: Date) {
    return date.getFullYear().toString();
  }

  filterReport() {
    let startDate = this.timeForm.value.dateStart.format("DD/MM/YYYY").toString();
    let endDate = this.timeForm.value.dateEnd.format("DD/MM/YYYY").toString();
    this.onGetInfor(startDate, endDate);
  }

  updateAmount(id: number) {
    let amount = (<HTMLInputElement>document.getElementById(id.toString())).value;
    let amountInt = Number.parseInt(amount);
    var request = new ReportUpdateAmountRequest(id, amountInt);
    if(!Number.isNaN(amountInt)){
      this.reportDetailService.updateAmount(request).subscribe({
        next: data => {
          if (data) {
            this.router.navigate(['users']);
          } else {
            this.notificationService.openSnackBar("Xảy ra lỗi trong khi cập nhập số lượng.");
          }
        },
        error: error => {
          this.notificationService.openSnackBar("Xảy ra lỗi trong khi cập nhập số lượng.");
        }
      })
    }else{
      this.notificationService.openSnackBar("Vui lòng nhập số lượng cần thay đổi!!!")
    }
    
  }

  deleteReport(id:number){
    this.reportDetailService.deleteReport(id).subscribe({
      next: data=>{
        if(data){
          this.router.navigate(['users']);
        }else {
          this.notificationService.openSnackBar("Đã xảy ra lỗi trong lúc xóa báo cáo.");
        }
      },
      error: err =>{
        this.notificationService.openSnackBar("Đã xảy ra lỗi trong lúc xóa báo cáo.")
      }
    })
  }
}
