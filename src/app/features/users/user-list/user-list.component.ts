import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatTableDataSource } from '@angular/material/table';

import { NGXLogger } from 'ngx-logger';
import { NotificationService } from 'src/app/core/services/notification.service';
import { UserData } from 'src/app/core/models/response/user-data.model';
import { UserService } from 'src/app/core/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  employeelist: Array<UserData> = [];
  isHasData: Boolean = false;
  displayedColumns: string[] = ['id', 'employeeName', 'roleName','phoneNumber' , 'warehouseName', 'activeFlag', 'handle'];
  dataSource: MatTableDataSource<UserData> = new MatTableDataSource();
  loading!: boolean;

  constructor(
    private logger: NGXLogger,
    private notificationService: NotificationService,
    private titleService: Title,
    private userService: UserService,
    public dialog: MatDialog,
    public router:Router
  ) { }

  ngOnInit() {
    this.titleService.setTitle('product-management - Users');
    this.getAllUser();
  }

  getAllUser() {
    this.loading = true;
    this.userService.getAllUser().subscribe({
      next: (data) => {
        this.employeelist = data.results;
        this.dataSource = new MatTableDataSource(this.employeelist);
        this.isHasData = this.employeelist.length !== 0;
      },
      error: (error) => {
        console.log(error.error);
        this.notificationService.openSnackBar("Xảy ra lỗi trong khi lấy thông tin nhân viên.");
        this.loading = false;
      }
    })
  }

  changeStatus(id: Number) {
    this.userService.changeStatus(id).subscribe({
      next: data => {
        this.notificationService.openSnackBar("Cập nhập nhân viên thành công.");
        if (data.message === "Success") {
          this.getAllUser();
        }
      },
      error: error => {
        this.notificationService.openSnackBar("Cập nhập nhân viên thất bại.");
      }
    }
    )
  }

  onEmpReportDetail(employeeId: number, employeeName: string) {
    let navigationExtras: NavigationExtras = {
      state: { 'employeeId': employeeId, 'employeeName':employeeName}
    };
    this.router.navigate(['users/report-detail'], navigationExtras);
  }

  onEmpDetail(employeeId: number, employeeName: string) {
    let navigationExtras: NavigationExtras = {
      state: { 'employeeId': employeeId, 'employeeName':employeeName}
    };
    this.router.navigate(['users/detail'], navigationExtras);
  }

  isAdmin(roleName: string) {
    if (roleName === 'ADMIN') {
      return true;
    }
    return false;
  }
  openAddUserForm() {
    const dialogRef = this.dialog.open(AddUserComponent, {
      height: '70%',
      width: '500px'
    })
      .afterClosed()
      .subscribe((shouldReload: boolean) => {
        if (shouldReload) window.location.reload()
      })
  }

}
