import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { EmployeeReportSalary } from 'src/app/core/models/response/emp-report/emp-report-salary-response.model';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ReportDailyService } from 'src/app/core/services/report-daily.service';

@Component({
  selector: 'app-user-report-salary',
  templateUrl: './user-report-salary.component.html',
  styleUrls: ['./user-report-salary.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'vi' },
  ]
})
export class UserReportSalaryComponent implements OnInit {
  isHasData: Boolean = false;
  displayedColumns: string[] = ['id', 'employeeName', 'phoneNumber', 'amount'];
  timeForm: FormGroup;
  dataSource: MatTableDataSource<EmployeeReportSalary> = new MatTableDataSource();
  employeeReportSalary: Array<EmployeeReportSalary>=[];

  constructor(private reportDetailService: ReportDailyService,
    private notificationService: NotificationService, private fb: FormBuilder) {
      const dateCurrent = new Date();
      let date = dateCurrent.getDate();
      let month = dateCurrent.getMonth();
      let year = dateCurrent.getFullYear();
      this.timeForm = fb.group({
        dateStart: (moment([year, month, date])),
        dateEnd: (moment([year, month, date]))
      });
     }

  ngOnInit(): void {
    this.filterReport();
  }

  filterReport() {
    let startDate = this.timeForm.value.dateStart.format("DD/MM/YYYY").toString();
    let endDate = this.timeForm.value.dateEnd.format("DD/MM/YYYY").toString();
    this.onGetSalaryReport(startDate, endDate);
  }

  onGetSalaryReport(dateStart: string, dateEnd: string) {
    this.reportDetailService.getEmployeeSalaryReport(dateStart,dateEnd).subscribe({
      next: data => {
        this.employeeReportSalary = data;
        this.dataSource = new MatTableDataSource(this.employeeReportSalary);
        this.isHasData = this.employeeReportSalary.length !== 0;
      },
      error: error => {
        this.notificationService.openSnackBar("Xảy ra lỗi trong khi lấy thông tin.");
      }
    })
  }

}
