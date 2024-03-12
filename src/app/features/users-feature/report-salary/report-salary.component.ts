import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as moment from 'moment';
import { EmployeeReportSalary } from 'src/app/core/models/response/emp-report/emp-report-salary-response.model';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ReportDailyService } from 'src/app/core/services/report-daily.service';

@Component({
  selector: 'app-report-salary',
  templateUrl: './report-salary.component.html',
  styleUrls: ['./report-salary.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'vi' },
  ]
})
export class ReportSalaryComponent implements OnInit {
  timeForm: FormGroup;
  employeeReportSalary: EmployeeReportSalary = new EmployeeReportSalary(0, "", "", "");
  employeeName: String = "";
  phoneNumber: String = "";
  amount: String = "";
  constructor(private reportDetailService: ReportDailyService,
    private notificationService: NotificationService, private fb: FormBuilder) {
    this.timeForm = fb.group({
      dateStart: (moment([2024, 0, 1])),
      dateEnd: (moment([2024, 0, 1]))
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
    let employeeId = localStorage.getItem("employeeId");
    this.reportDetailService.getEmployeeSalary(employeeId != null ? employeeId : "1", dateStart, dateEnd).subscribe({
      next: data => {
        this.employeeReportSalary = data;
        this.employeeName = data.employeeName,
        this.phoneNumber = data.phoneNumber,
        this.amount = data.amount
      },
      error: error => {
        this.notificationService.openSnackBar("Xảy ra lỗi trong khi lấy thông tin.");
      }
    })
  }
}
