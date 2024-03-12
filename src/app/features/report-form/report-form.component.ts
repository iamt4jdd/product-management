import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Product } from 'src/app/core/models/product.model';
import { ReportRequest } from 'src/app/core/models/request/report-request.model';
import { StageResponse } from 'src/app/core/models/response/stage-response.model';
import { UserData } from 'src/app/core/models/response/user-data.model';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ProductService } from 'src/app/core/services/product.service';
import { ReportDailyService } from 'src/app/core/services/report-daily.service';
import { StageService } from 'src/app/core/services/stage.service';
import { UserService } from 'src/app/core/services/user.service';
import { SubmitResultComponent } from '../submit-result/submit-result.component';
import { ReportDetail } from 'src/app/core/models/request/report-detail.model';
import { Order } from 'src/app/core/models/order.model';
import { OrderService } from 'src/app/core/services/order.service';
import { CheckUserRequest } from 'src/app/core/models/request/check-user-request.model';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ReportFormComponent implements OnInit {
  employeelist: Array<UserData> = [];
  products: Array<Product> = [];
  stages: Array<StageResponse> = [];
  stagesCollection: Array<StageResponse[]> = [];
  orderCollection: Array<Order[]> = [];
  reportForm: FormGroup;
  moneyTotal: number = 0;
  checkAccount: Boolean = false;
  constructor(private userService: UserService,
    private reportService: ReportDailyService,
    private productService: ProductService,
    private notificationService: NotificationService,
    private stageService: StageService,
    private orderService: OrderService,
    private fb: FormBuilder,
    public dialog: MatDialog) {

    this.reportForm = fb.group({
      checked: [false, [Validators.required]],
      password: ['', [Validators.required]],
      employeeId: ['', [Validators.required]],
      reportsFull: this.fb.array([])
    });

    this.getActiveUser();
    this.getActiveProduct();
  }
  ngOnInit(): void {
  }

  //=======================

  getReportsList(): FormArray {
    return this.reportForm.get("reportsFull") as FormArray
  }

  getStageList(i: number): FormArray {
    return this.getReportsList().at(i).get("stageReports") as FormArray;
  }

  //=======================
  // add report
  addReport() {
    this.getReportsList().push(this.newProductOrderReport());
  }
  // add stage
  addStageReportElement(index: number) {
    this.getStageList(index).push(this.newStageReport());
  }

  //=======================
  // init formGroup for report
  newProductOrderReport(): FormGroup {
    return this.fb.group({
      productId: ['', [Validators.required]],
      orderId: ['', [Validators.required]],
      stageReports: this.fb.array([])
    })
  }
  // init formGroup for stage
  newStageReport(): FormGroup {
    return this.fb.group({
      stageId: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    })
  }
  //=======================


  getValueOfEvent(event: MatSelectChange) {
    return event.value.toString();
  }
  removeReport(i: number) {
    this.stagesCollection.splice(i, 1);
    this.orderCollection.splice(i, 1);
    this.getReportsList().removeAt(i);
  }
  removeStageReport(i: number, y: number) {
    this.getStageList(i).removeAt(y);
  }

  getActiveUser() {
    this.userService.getActiveUser().subscribe({
      next: (data) => {
        this.employeelist = data.results;
      },
      error: (error) => {
        this.notificationService.openSnackBar("Xảy ra lỗi trong khi lấy thông tin nhân viên.");
      }
    })
  }

  getActiveProduct() {
    this.productService.getProductsByStatus(0, 10000,true).subscribe({
      next: (data) => {
        this.products = data.get("productsArray");
      },
      error: (error) => {
        this.notificationService.openSnackBar("Xảy ra lỗi trong khi lấy danh sách sản phẩm.");
      }
    })
  }
  
  async verifyAccount() {
    const result$ = this.userService.checkExistsAccount(new CheckUserRequest(this.reportForm.value.employeeId, this.reportForm.value.password));
    await lastValueFrom(result$).then(data=>this.checkAccount=data);
  }

  updateState(event: MatSelectChange, index: number) {
    let productId = event.value;
    this.stageService.getByProductId(productId).subscribe({
      next: (data) => {
        this.stages = data;
        this.stagesCollection[index] = data;
      },
      error: (error) => {
        this.notificationService.openSnackBar("Xảy ra lỗi trong khi lấy thông tin danh sách chi tiết.");
      }
    })

    this.orderService.getOrdersByProductId(productId).subscribe({
      next: (data) => {
        console.log(data);
        this.orderCollection[index] = data;
      },
      error: (error) => {
        this.notificationService.openSnackBar("Xảy ra lỗi trong khi lấy thông tin danh sách chi tiết.");
      }
    })
  }

  async onReportSubmit() {
    await this.verifyAccount();
    let reports = this.reportForm.value.reportsFull;
    if (reports === null || reports.length === 0) {
      this.notificationService.openSnackBar("Đơn sản phẩm không được để trống, vui lòng thêm công đoạn.");
    } else if (reports[0].stageReports === null || reports[0].stageReports.length === 0) {
      this.notificationService.openSnackBar("Công đoạn không được để trống, vui lòng thêm công đoạn.");
    } else if (!this.reportForm.value.checked) {
      this.notificationService.openSnackBar("Vui lòng đánh dấu vào ô trống kiểm tra.");
    } else {
      if (this.checkAccount === false) {
        this.notificationService.openSnackBar("Tài khoản hoặc mật khẩu không đúng, vui lòng nhập lại mật khẩu.");
      } else {
        let reportRequest = new ReportRequest(this.reportForm.value.employeeId, reports);
        this.reportService.submitReport(reportRequest).subscribe({
          next: (data) => {
            if (data === -1) {
              this.checkAccount = false;
              this.notificationService.openSnackBar("Bạn đã gửi báo cáo hôm nay rồi, vui lòng liên hệ chủ xưởng.");
            } else {
              this.checkAccount = false;
              this.moneyTotal = data;
              this.openSubmitResultForm(reports);
            }
          },
          error: (error) => {
            this.notificationService.openSnackBar("Báo cáo bị lỗi, vui lòng thử lại.");
          }
        })
      }
    }
  }

  openSubmitResultForm(reports: ReportDetail[]) {
    const dialogRef = this.dialog.open(SubmitResultComponent, {
      data: {
        products: this.products,
        money: this.moneyTotal,
        reports: reports,
        stagesCollection: this.stagesCollection
      },
      height: '50%',
      width: '98%',
      position: {
        top: '10%'
      }
    })
      .afterClosed()
      .subscribe((shouldReload: boolean) => {
        if (shouldReload) window.location.reload()
      })
  }

}
